import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getFeaturedCards } from '@/lib/quiz/catalog'

export const metadata: Metadata = {
	title: 'Страница не найдена',
	description: 'Такой страницы на SkillQuiz нет. Вернитесь на главную или выберите тест в каталоге.',
	robots: { index: false, follow: true }
}

export default function NotFound() {
	const popular = getFeaturedCards(4)
	return (
		<main className='container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center'>
			<p className='font-heading text-8xl font-bold text-primary/80'>404</p>
			<h1 className='mt-4 text-3xl sm:text-4xl'>Такой страницы нет</h1>
			<p className='mt-3 max-w-md text-muted-foreground'>
				Возможно, ссылка устарела или в адресе опечатка. Зато тесты на месте.
			</p>
			<div className='mt-8 flex flex-col gap-3 sm:flex-row'>
				<Button asChild size='lg'>
					<Link href='/tests'>Все тесты</Link>
				</Button>
				<Button asChild size='lg' variant='outline'>
					<Link href='/'>На главную</Link>
				</Button>
			</div>
			<div className='mt-12 w-full max-w-xl text-left'>
				<p className='text-sm font-semibold text-muted-foreground'>Популярные тесты</p>
				<ul className='mt-3 divide-y divide-border rounded-2xl border border-border/70 bg-card'>
					{popular.map(q => (
						<li key={q.slug}>
							<Link href={`/tests/${q.slug}`} className='block px-5 py-3.5 font-medium hover:text-primary'>
								{q.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</main>
	)
}
