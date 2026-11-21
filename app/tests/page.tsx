import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { Catalog } from '@/components/quiz/Catalog'
import { getCards, getCategoriesWithCounts } from '@/lib/quiz/catalog'
import { SITE } from '@/lib/site'
import { testsLabel } from '@/lib/utils/pluralize'

const TITLE = 'Все психологические тесты онлайн: каталог'
const DESCRIPTION =
	'Каталог бесплатных тестов: личность и темперамент, стресс и эмоции, отношения, карьера, мышление, привычки и финансы. Подробный разбор, PDF, без регистрации.'

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: { canonical: '/tests' },
	openGraph: { url: `${SITE.url}/tests`, title: TITLE, description: DESCRIPTION }
}

export default function TestsPage() {
	const cards = getCards()
	const categories = getCategoriesWithCounts()
	return (
		<main>
			<JsonLd
				data={{
					'@context': 'https://schema.org',
					'@type': 'CollectionPage',
					name: TITLE,
					description: DESCRIPTION,
					url: `${SITE.url}/tests`,
					isPartOf: { '@id': `${SITE.url}#website` },
					mainEntity: {
						'@type': 'ItemList',
						numberOfItems: cards.length,
						itemListElement: cards.map((c, i) => ({
							'@type': 'ListItem',
							position: i + 1,
							url: `${SITE.url}/tests/${c.slug}`,
							name: c.title
						}))
					}
				}}
			/>
			<Breadcrumbs
				items={[
					{ name: 'Главная', url: '/' },
					{ name: 'Тесты', url: '/tests' }
				]}
			/>
			<div className='container pb-12'>
				<h1 className='text-4xl sm:text-5xl'>Все тесты</h1>
				<p className='mt-3 max-w-2xl text-lg text-muted-foreground'>
					{testsLabel(cards.length)} о личности, эмоциях, отношениях, работе и деньгах. Каждый заканчивается разбором с
					диаграммой, сильными сторонами и советами.
				</p>
				<div className='mt-8'>
					<Catalog
						cards={cards}
						categories={categories.map(c => ({ id: c.id, title: c.short, emoji: c.emoji, count: c.count }))}
					/>
				</div>

				<section className='mt-16' aria-labelledby='cats-title'>
					<h2 id='cats-title' className='text-2xl'>
						Разделы
					</h2>
					<ul className='mt-4 grid gap-3 sm:grid-cols-2'>
						{categories.map(c => (
							<li key={c.id}>
								<Link
									href={`/tests/category/${c.id}`}
									className='block rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-primary/40'
								>
									<span className='font-heading text-lg font-bold'>
										<span aria-hidden='true'>{c.emoji}</span> {c.title}
									</span>
									<span className='mt-1 block text-sm text-muted-foreground'>{c.description}</span>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</div>
		</main>
	)
}
