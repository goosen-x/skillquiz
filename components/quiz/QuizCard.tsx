import Link from 'next/link'
import { ArrowRight, Clock, ListChecks } from 'lucide-react'
import type { QuizCard as Card } from '@/lib/quiz/catalog'
import { CATEGORIES } from '@/lib/quiz/categories'
import { questionsLabel } from '@/lib/utils/pluralize'
import { cn } from '@/lib/utils'

/** Цвет полоски категории: мягкие тона, чтобы каталог не рябил */
export const CATEGORY_TINT: Record<string, string> = {
	personality: 'from-violet-500/15 to-violet-500/0 text-violet-700 dark:text-violet-300',
	emotions: 'from-sky-500/15 to-sky-500/0 text-sky-700 dark:text-sky-300',
	relationships: 'from-rose-500/15 to-rose-500/0 text-rose-700 dark:text-rose-300',
	career: 'from-amber-500/15 to-amber-500/0 text-amber-700 dark:text-amber-300',
	thinking: 'from-emerald-500/15 to-emerald-500/0 text-emerald-700 dark:text-emerald-300',
	productivity: 'from-orange-500/15 to-orange-500/0 text-orange-700 dark:text-orange-300',
	finance: 'from-teal-500/15 to-teal-500/0 text-teal-700 dark:text-teal-300'
}

export function QuizCard({ quiz, className }: { quiz: Card; className?: string }) {
	const cat = CATEGORIES[quiz.category]
	return (
		<Link
			href={`/tests/${quiz.slug}`}
			className={cn(
				'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-5 transition-all [corner-shape:squircle] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
				className
			)}
		>
			<div
				aria-hidden='true'
				className={cn('pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b', CATEGORY_TINT[quiz.category])}
			/>
			<div className='relative flex items-center gap-2 text-xs font-semibold'>
				<span className={cn('inline-flex items-center gap-1.5', CATEGORY_TINT[quiz.category])}>
					<span aria-hidden='true'>{cat.emoji}</span>
					{cat.short}
				</span>
			</div>
			<h3 className='relative mt-3 text-lg leading-snug font-bold text-foreground'>{quiz.title}</h3>
			<p className='relative mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground'>{quiz.summary}</p>
			<div className='relative mt-auto flex items-center justify-between gap-2 pt-5 text-xs text-muted-foreground'>
				<span className='flex flex-wrap items-center gap-x-3 gap-y-1'>
					<span className='inline-flex items-center gap-1'>
						<Clock className='h-3.5 w-3.5' aria-hidden='true' />
						{quiz.minutes} мин
					</span>
					<span className='inline-flex items-center gap-1'>
						<ListChecks className='h-3.5 w-3.5' aria-hidden='true' />
						{questionsLabel(quiz.questions)}
					</span>
				</span>
				<ArrowRight
					className='h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5'
					aria-hidden='true'
				/>
			</div>
		</Link>
	)
}
