'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import type { ComparisonData } from '@/lib/quiz/blocks'
import { MIN_SAMPLE, type StatsResponse } from '@/lib/quiz/stats-types'
import { setClientStats } from '@/lib/quiz/client-stats'
import { peopleLabel } from '@/lib/utils/pluralize'

/** Полоса «где вы среди прошедших»: маркер на позиции перцентиля */
function PercentileBar({ value }: { value: number }) {
	return (
		<div className='relative mt-2 h-2.5 rounded-full bg-gradient-to-r from-muted via-primary/30 to-primary/70'>
			<div
				className='absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-card bg-primary shadow'
				style={{ left: `${value}%` }}
				aria-hidden='true'
			/>
		</div>
	)
}

export function Comparison({ data, code }: { data: ComparisonData; code: string }) {
	const [stats, setStats] = useState<StatsResponse | null>(null)

	useEffect(() => {
		let alive = true
		fetch(`/api/stats?quiz=${encodeURIComponent(data.quiz)}&code=${encodeURIComponent(code)}`)
			.then(r => (r.ok ? r.json() : null))
			.then((s: StatsResponse | null) => {
				if (!alive) return
				setStats(s)
				setClientStats(s)
			})
			.catch(() => alive && setStats(null))
		return () => {
			alive = false
		}
	}, [data.quiz, code])

	const reliable = stats?.reliable === true
	const count = stats?.count ?? 0

	const note = reliable ? (
		<>По данным {peopleLabel(count)}, прошедших этот тест на SkillQuiz.</>
	) : (
		<>
			Пока тест прошли {count > 0 ? peopleLabel(count) : 'совсем немного человек'}, а для честного сравнения нужно хотя бы{' '}
			{MIN_SAMPLE}. Поэтому сейчас цифры ориентировочные: это распределение, которое получилось бы при случайных
			ответах. По данным первых прохождений сравнение пересчитается автоматически.
		</>
	)

	return (
		<section className='rounded-3xl border border-border/70 bg-card p-5 sm:p-7' data-testid='result-comparison'>
			<h2 className='mb-4 flex items-center gap-2 text-xl sm:text-2xl'>
				<Users className='h-5 w-5 text-primary' aria-hidden='true' />
				Сравнение с другими
			</h2>

			{data.type && (
				<div>
					<p className='text-lg leading-relaxed'>
						Тип «{data.type.title}»{' '}
						{reliable && stats?.typeShare !== null && stats?.typeShare !== undefined ? (
							<>
								у <span className='font-bold text-primary'>{stats.typeShare}%</span> прошедших.
							</>
						) : (
							<>
								выпадает примерно в <span className='font-bold text-primary'>{data.baselineTypeShare}%</span> случаев
								(ориентир).
							</>
						)}
					</p>
				</div>
			)}

			{data.metrics.length > 0 && (
				<ul className='space-y-5'>
					{data.metrics.map(m => {
						const real = reliable ? stats?.percentiles[m.key] : undefined
						const base = data.baseline.find(b => b.key === m.key)?.percentile ?? 50
						const value = real ?? base
						return (
							<li key={m.key}>
								<p className='leading-snug'>
									<span className='font-medium'>{m.label}</span>: выше, чем у{' '}
									<span className='font-bold text-primary' data-testid='comparison-percent'>
										{real === undefined ? '~' : ''}
										{value}%
									</span>{' '}
									прошедших
								</p>
								<PercentileBar value={value} />
							</li>
						)
					})}
				</ul>
			)}

			<p className='mt-5 text-sm leading-relaxed text-muted-foreground'>{stats === null ? 'Загружаем статистику…' : note}</p>
		</section>
	)
}
