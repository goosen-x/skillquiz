'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import type { QuizCard as Card } from '@/lib/quiz/catalog'
import { QuizCard } from './QuizCard'
import { cn } from '@/lib/utils'

interface Props {
	cards: Card[]
	categories: Array<{ id: string; title: string; emoji: string; count: number }>
}

const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е')

export function Catalog({ cards, categories }: Props) {
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState<string | null>(null)

	const filtered = useMemo(() => {
		const q = norm(query.trim())
		return cards.filter(
			c =>
				(!category || c.category === category) &&
				(!q || norm(`${c.title} ${c.summary} ${c.question} ${c.categoryTitle}`).includes(q))
		)
	}, [cards, category, query])

	return (
		<div>
			<div className='relative'>
				<Search className='pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground' aria-hidden='true' />
				<input
					type='search'
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder='Найти тест: стресс, темперамент, деньги…'
					aria-label='Поиск по тестам'
					className='h-13 w-full rounded-2xl border border-input bg-card pr-12 pl-12 text-base outline-none'
				/>
				{query && (
					<button
						type='button'
						onClick={() => setQuery('')}
						aria-label='Очистить поиск'
						className='absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground hover:bg-muted'
					>
						<X className='h-4 w-4' />
					</button>
				)}
			</div>

			<div className='-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:flex-wrap sm:px-0'>
				<button
					type='button'
					onClick={() => setCategory(null)}
					aria-pressed={category === null}
					className={cn(
						'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
						category === null ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/40'
					)}
				>
					Все · {cards.length}
				</button>
				{categories.map(c => (
					<button
						key={c.id}
						type='button'
						onClick={() => setCategory(category === c.id ? null : c.id)}
						aria-pressed={category === c.id}
						className={cn(
							'shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
							category === c.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/40'
						)}
					>
						<span aria-hidden='true'>{c.emoji}</span> {c.title} · {c.count}
					</button>
				))}
			</div>

			{filtered.length === 0 ? (
				<p className='mt-10 text-center text-muted-foreground'>Ничего не нашлось. Попробуйте другое слово.</p>
			) : (
				<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{filtered.map(c => (
						<QuizCard key={c.slug} quiz={c} />
					))}
				</div>
			)}
		</div>
	)
}
