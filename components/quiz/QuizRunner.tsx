'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Clock, ListChecks, Loader2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { RunnerQuiz } from '@/lib/quiz/catalog'
import { encodeAnswers } from '@/lib/quiz/codec'
import { reachGoal } from '@/lib/analytics/goals'
import { questionsLabel, minutesLabel } from '@/lib/utils/pluralize'
import { cn } from '@/lib/utils'

type Phase = 'start' | 'question' | 'finishing'

interface Progress {
	v: 1
	answers: Array<number | null>
	index: number
	startedAt: number
}

const progressKey = (slug: string) => `sq:progress:${slug}`
export const lastResultKey = (slug: string) => `sq:last:${slug}`

/** Пауза перед автопереходом: успеть увидеть, что ответ выбран */
const ADVANCE_DELAY = 260

function readProgress(slug: string, total: number): Progress | null {
	try {
		const raw = localStorage.getItem(progressKey(slug))
		if (!raw) return null
		const p = JSON.parse(raw) as Progress
		if (p.v !== 1 || !Array.isArray(p.answers) || p.answers.length !== total) return null
		if (!p.answers.some(a => a !== null)) return null
		return { ...p, index: Math.min(Math.max(0, p.index), total - 1) }
	} catch {
		return null
	}
}

export function QuizRunner({ quiz }: { quiz: RunnerQuiz }) {
	const router = useRouter()
	const total = quiz.questions.length
	const [phase, setPhase] = useState<Phase>('start')
	const [answers, setAnswers] = useState<Array<number | null>>(() => Array(total).fill(null))
	const [index, setIndex] = useState(0)
	const [direction, setDirection] = useState<'fwd' | 'back'>('fwd')
	const [resumed, setResumed] = useState(false)
	const [lastCode, setLastCode] = useState<string | null>(null)
	const [pending, setPending] = useState<number | null>(null)
	const startedAt = useRef<number>(Date.now())
	const rootRef = useRef<HTMLDivElement>(null)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	// Восстановление: обновили страницу посреди теста — продолжаем с того же вопроса
	useEffect(() => {
		const restart = new URLSearchParams(window.location.search).get('restart') === '1'
		if (restart) {
			localStorage.removeItem(progressKey(quiz.slug))
			window.history.replaceState(null, '', window.location.pathname)
		}
		const saved = restart ? null : readProgress(quiz.slug, total)
		// Состояние из localStorage доступно только после монтирования
		if (saved) {
			setAnswers(saved.answers)
			setIndex(saved.index)
			startedAt.current = saved.startedAt
			setPhase('question')
			setResumed(true)
		}
		setLastCode(localStorage.getItem(lastResultKey(quiz.slug)))
	}, [quiz.slug, total])

	// Пока идёт тест, справочный текст под ним прячем (см. globals.css)
	useEffect(() => {
		if (phase === 'question') document.body.dataset.quizActive = '1'
		else delete document.body.dataset.quizActive
		return () => {
			delete document.body.dataset.quizActive
		}
	}, [phase])

	useEffect(() => () => {
		if (timer.current) clearTimeout(timer.current)
	}, [])

	const save = useCallback(
		(nextAnswers: Array<number | null>, nextIndex: number) => {
			try {
				const p: Progress = { v: 1, answers: nextAnswers, index: nextIndex, startedAt: startedAt.current }
				localStorage.setItem(progressKey(quiz.slug), JSON.stringify(p))
			} catch {
				// приватный режим Safari: работаем без сохранения
			}
		},
		[quiz.slug]
	)

	const scrollToTop = () => {
		const el = rootRef.current
		if (!el) return
		const top = el.getBoundingClientRect().top + window.scrollY - 72
		if (Math.abs(window.scrollY - top) > 8) window.scrollTo({ top, behavior: 'smooth' })
	}

	const start = () => {
		startedAt.current = Date.now()
		const empty = Array(total).fill(null)
		setAnswers(empty)
		setIndex(0)
		setDirection('fwd')
		setResumed(false)
		setPhase('question')
		save(empty, 0)
		reachGoal('test_start', { quiz: quiz.slug })
		requestAnimationFrame(scrollToTop)
	}

	const finish = useCallback(
		(final: number[]) => {
			setPhase('finishing')
			const code = encodeAnswers(final)
			const durationSec = Math.round((Date.now() - startedAt.current) / 1000)
			// Анонимная статистика для сравнения. Автотесты (webdriver) не пишем
			if (!navigator.webdriver) {
				fetch('/api/results', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ quiz: quiz.slug, code, durationSec }),
					keepalive: true
				}).catch(() => undefined)
			}
			reachGoal('test_complete', { quiz: quiz.slug })
			try {
				localStorage.removeItem(progressKey(quiz.slug))
				localStorage.setItem(lastResultKey(quiz.slug), code)
			} catch {
				// без сохранения
			}
			router.push(`/tests/${quiz.slug}/result/${code}`)
		},
		[quiz.slug, router]
	)

	const choose = useCallback(
		(option: number) => {
			if (pending !== null || phase !== 'question') return
			const next = answers.slice()
			next[index] = option
			setAnswers(next)
			setPending(option)
			const isLast = index === total - 1
			const nextIndex = isLast ? index : index + 1
			save(next, nextIndex)
			timer.current = setTimeout(() => {
				setPending(null)
				if (isLast) {
					const firstEmpty = next.findIndex(a => a === null)
					if (firstEmpty >= 0) {
						setDirection('back')
						setIndex(firstEmpty)
						return
					}
					finish(next as number[])
				} else {
					setDirection('fwd')
					setIndex(nextIndex)
				}
			}, ADVANCE_DELAY)
		},
		[answers, finish, index, pending, phase, save, total]
	)

	const back = useCallback(() => {
		if (pending !== null) return
		if (index === 0) {
			setPhase('start')
			return
		}
		setDirection('back')
		setIndex(index - 1)
		save(answers, index - 1)
	}, [answers, index, pending, save])

	const forward = () => {
		if (answers[index] === null) return
		if (index === total - 1) {
			if (answers.every(a => a !== null)) finish(answers as number[])
			return
		}
		setDirection('fwd')
		setIndex(index + 1)
		save(answers, index + 1)
	}

	// Клавиатура: цифры выбирают вариант, стрелка влево — назад
	useEffect(() => {
		if (phase !== 'question') return
		const onKey = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return
			const n = Number(e.key)
			if (n >= 1 && n <= quiz.questions[index].options.length) choose(n - 1)
			if (e.key === 'ArrowLeft') back()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [back, choose, index, phase, quiz.questions])

	const answeredCount = answers.filter(a => a !== null).length

	if (phase === 'start') {
		return (
			<div ref={rootRef} className='rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-10' data-testid='quiz-start'>
				<p className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold tracking-wide text-primary uppercase'>
					<span>Тест</span>
					<span aria-hidden='true'>·</span>
					<span className='inline-flex items-center gap-1 normal-case'>
						<Clock className='h-4 w-4' aria-hidden='true' />
						{minutesLabel(quiz.minutes)}
					</span>
					<span aria-hidden='true'>·</span>
					<span className='inline-flex items-center gap-1 normal-case'>
						<ListChecks className='h-4 w-4' aria-hidden='true' />
						{questionsLabel(total)}
					</span>
				</p>
				<h1 className='mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl'>{quiz.title}</h1>
				<p className='mt-3 font-heading text-xl leading-snug text-muted-foreground sm:text-2xl'>{quiz.question}</p>
				<div className='mt-7'>
					<p className='font-semibold'>После прохождения вы узнаете:</p>
					<ul className='mt-3 space-y-2.5'>
						{quiz.learn.map(item => (
							<li key={item} className='flex gap-3 leading-relaxed'>
								<Check className='mt-1 h-4 w-4 shrink-0 text-primary' aria-hidden='true' />
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
				<div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
					<Button size='lg' className='h-14 w-full text-base sm:w-auto sm:px-10' onClick={start} data-testid='quiz-begin'>
						Начать тест
						<ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
					</Button>
					{lastCode && (
						<Button asChild size='lg' variant='outline' className='h-14 w-full text-base sm:w-auto'>
							<Link href={`/tests/${quiz.slug}/result/${lastCode}`}>Мой прошлый результат</Link>
						</Button>
					)}
				</div>
				<p className='mt-4 text-xs text-muted-foreground'>Бесплатно и без регистрации. Прогресс сохраняется, тест можно продолжить позже.</p>
			</div>
		)
	}

	if (phase === 'finishing') {
		return (
			<div
				ref={rootRef}
				className='flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-border/70 bg-card p-10 text-center'
				role='status'
				data-testid='quiz-finishing'
			>
				<Loader2 className='h-10 w-10 animate-spin text-primary' aria-hidden='true' />
				<p className='mt-4 font-heading text-xl font-bold'>Считаем результат</p>
				<p className='mt-2 text-sm text-muted-foreground'>Пара секунд, и откроется подробный разбор.</p>
			</div>
		)
	}

	const q = quiz.questions[index]
	const selected = pending ?? answers[index]
	const progress = Math.round((answeredCount / total) * 100)

	return (
		<div ref={rootRef} className='rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-8' data-testid='quiz-question'>
			<div className='flex items-center justify-between gap-3 text-sm'>
				<span className='truncate font-semibold text-muted-foreground'>{quiz.title}</span>
				<span className='shrink-0 font-semibold tabular-nums' data-testid='quiz-counter'>
					{index + 1} из {total}
				</span>
			</div>
			<div
				className='mt-3 h-2 overflow-hidden rounded-full bg-muted'
				role='progressbar'
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={progress}
				aria-label='Прогресс теста'
			>
				<div className='h-full rounded-full bg-primary transition-[width] duration-300' style={{ width: `${progress}%` }} />
			</div>

			{resumed && index > 0 && (
				<p className='mt-4 rounded-xl bg-primary/5 px-3 py-2 text-sm text-primary'>
					Продолжаем с того места, где вы остановились.{' '}
					<button type='button' className='font-semibold underline underline-offset-2' onClick={start}>
						Начать заново
					</button>
				</p>
			)}

			<div key={index} className={direction === 'fwd' ? 'q-in-right' : 'q-in-left'}>
				<h2 className='mt-6 text-xl leading-snug sm:text-2xl' data-testid='quiz-question-text'>
					{q.text}
				</h2>
				<div className='mt-6 flex flex-col gap-3' role='radiogroup' aria-label='Варианты ответа'>
					{q.options.map((option, i) => {
						const isSelected = selected === i
						return (
							<button
								key={option}
								type='button'
								role='radio'
								aria-checked={isSelected}
								onClick={() => choose(i)}
								data-testid='quiz-option'
								className={cn(
									'group flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-base leading-snug transition-all [corner-shape:squircle] active:scale-[0.99] sm:px-5',
									isSelected
										? 'border-primary bg-primary/8 font-medium'
										: 'border-border hover:border-primary/50 hover:bg-muted/60'
								)}
							>
								<span
									aria-hidden='true'
									className={cn(
										'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
										isSelected
											? 'border-primary bg-primary text-primary-foreground'
											: 'border-border text-muted-foreground group-hover:border-primary/50'
									)}
								>
									{isSelected ? <Check className='h-4 w-4' /> : i + 1}
								</span>
								<span className='min-w-0 flex-1 break-words'>{option}</span>
							</button>
						)
					})}
				</div>
			</div>

			<div className='mt-6 flex items-center justify-between gap-3'>
				<Button variant='ghost' onClick={back} className='h-11 px-3' data-testid='quiz-back'>
					<ArrowLeft className='mr-1.5 h-4 w-4' aria-hidden='true' />
					Назад
				</Button>
				{answers[index] !== null && pending === null ? (
					<Button variant='outline' onClick={forward} className='h-11' data-testid='quiz-forward'>
						{index === total - 1 ? 'К результату' : 'Дальше'}
						<ArrowRight className='ml-1.5 h-4 w-4' aria-hidden='true' />
					</Button>
				) : (
					<button
						type='button'
						onClick={start}
						className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground'
					>
						<RotateCcw className='h-3.5 w-3.5' aria-hidden='true' />
						Сначала
					</button>
				)}
			</div>
		</div>
	)
}
