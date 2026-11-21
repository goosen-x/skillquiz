'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Copy, FileDown, Loader2, RotateCcw, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { QuizResult } from '@/lib/quiz/blocks'
import { reachGoal } from '@/lib/analytics/goals'
import { getClientStats } from '@/lib/quiz/client-stats'

interface Props {
	result: QuizResult
	quizTitle: string
	url: string
	shareText: string
}

const iconBtn =
	'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-muted'

export function ResultActions({ result, quizTitle, url, shareText }: Props) {
	const [pdfBusy, setPdfBusy] = useState(false)
	const [copied, setCopied] = useState(false)

	const downloadPdf = async () => {
		setPdfBusy(true)
		try {
			const { downloadResultPdf } = await import('@/lib/quiz/pdf')
			await downloadResultPdf(
				result,
				{ quizTitle, url, date: new Date(), stats: getClientStats() },
				`skillquiz-${result.quiz}.pdf`
			)
			reachGoal('pdf_download', { quiz: result.quiz })
		} catch (e) {
			console.error(e)
			toast.error('Не получилось собрать PDF. Попробуйте ещё раз.')
		} finally {
			setPdfBusy(false)
		}
	}

	const shared = (channel: string) => reachGoal('share', { quiz: result.quiz, channel })

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(url)
		} catch {
			const input = document.createElement('textarea')
			input.value = url
			document.body.appendChild(input)
			input.select()
			document.execCommand('copy')
			input.remove()
		}
		setCopied(true)
		shared('copy')
		toast.success('Ссылка на результат скопирована')
		setTimeout(() => setCopied(false), 2000)
	}

	const nativeShare = async () => {
		if (!navigator.share) return copy()
		try {
			await navigator.share({ title: quizTitle, text: shareText, url })
			shared('native')
		} catch {
			// пользователь закрыл окно
		}
	}

	const enc = encodeURIComponent
	const links = [
		{ id: 'telegram', label: 'Telegram', href: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText)}` },
		{ id: 'vk', label: 'VK', href: `https://vk.com/share.php?url=${enc(url)}&title=${enc(shareText)}` },
		{ id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${shareText} ${url}`)}` }
	]

	return (
		<div className='rounded-3xl border border-border/70 bg-card p-5 sm:p-7' data-testid='result-actions' data-no-print>
			<div className='flex flex-col gap-3 sm:flex-row'>
				<Button size='lg' onClick={downloadPdf} disabled={pdfBusy} className='h-12 text-base' data-testid='download-pdf'>
					{pdfBusy ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : <FileDown className='mr-2 h-5 w-5' />}
					Скачать PDF
				</Button>
				<Button asChild size='lg' variant='outline' className='h-12 text-base'>
					<Link href={`/tests/${result.quiz}?restart=1`} data-testid='restart'>
						<RotateCcw className='mr-2 h-5 w-5' />
						Пройти заново
					</Link>
				</Button>
			</div>
			<p className='mt-6 text-sm font-semibold'>Поделиться результатом</p>
			<div className='mt-3 flex flex-wrap gap-2'>
				{links.map(l => (
					<a
						key={l.id}
						href={l.href}
						target='_blank'
						rel='noopener noreferrer'
						onClick={() => shared(l.id)}
						className={iconBtn}
						data-testid={`share-${l.id}`}
					>
						{l.label}
					</a>
				))}
				<button type='button' onClick={copy} className={iconBtn} data-testid='share-copy'>
					{copied ? <Check className='h-4 w-4 text-success' /> : <Copy className='h-4 w-4' />}
					Копировать ссылку
				</button>
				<button type='button' onClick={nativeShare} className={`${iconBtn} sm:hidden`} aria-label='Другие способы поделиться'>
					<Share2 className='h-4 w-4' />
					Ещё
				</button>
			</div>
		</div>
	)
}
