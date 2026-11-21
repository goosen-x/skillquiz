import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { QuizCard } from '@/components/quiz/QuizCard'
import { getCardsByCategory, getCategoriesWithCounts } from '@/lib/quiz/catalog'
import { CATEGORIES, isCategoryId } from '@/lib/quiz/categories'
import { SITE } from '@/lib/site'
import { testsLabel } from '@/lib/utils/pluralize'

type Props = { params: Promise<{ category: string }> }

export const dynamicParams = false

export function generateStaticParams() {
	return getCategoriesWithCounts().map(c => ({ category: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category } = await params
	if (!isCategoryId(category)) return {}
	const c = CATEGORIES[category]
	return {
		title: c.seoTitle,
		description: c.seoDescription,
		alternates: { canonical: `/tests/category/${category}` },
		openGraph: { url: `${SITE.url}/tests/category/${category}`, title: c.seoTitle, description: c.seoDescription }
	}
}

export default async function CategoryPage({ params }: Props) {
	const { category } = await params
	if (!isCategoryId(category)) notFound()
	const c = CATEGORIES[category]
	const cards = getCardsByCategory(category)
	const others = getCategoriesWithCounts().filter(x => x.id !== category)
	const url = `${SITE.url}/tests/category/${category}`
	return (
		<main>
			<JsonLd
				data={{
					'@context': 'https://schema.org',
					'@type': 'CollectionPage',
					name: c.title,
					description: c.seoDescription,
					url,
					isPartOf: { '@id': `${SITE.url}#website` },
					mainEntity: {
						'@type': 'ItemList',
						numberOfItems: cards.length,
						itemListElement: cards.map((q, i) => ({
							'@type': 'ListItem',
							position: i + 1,
							url: `${SITE.url}/tests/${q.slug}`,
							name: q.title
						}))
					}
				}}
			/>
			<Breadcrumbs
				items={[
					{ name: 'Главная', url: '/' },
					{ name: 'Тесты', url: '/tests' },
					{ name: c.title, url: `/tests/category/${category}` }
				]}
			/>
			<div className='container pb-12'>
				<p className='text-4xl' aria-hidden='true'>
					{c.emoji}
				</p>
				<h1 className='mt-2 text-4xl sm:text-5xl'>{c.title}: тесты онлайн</h1>
				<p className='mt-3 max-w-2xl text-lg text-muted-foreground'>{c.description}</p>
				<p className='mt-2 text-sm text-muted-foreground'>{testsLabel(cards.length)} в разделе</p>
				<div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{cards.map(q => (
						<QuizCard key={q.slug} quiz={q} />
					))}
				</div>
				<nav className='mt-14' aria-labelledby='other-cats'>
					<h2 id='other-cats' className='text-2xl'>
						Другие разделы
					</h2>
					<ul className='mt-4 flex flex-wrap gap-2'>
						{others.map(o => (
							<li key={o.id}>
								<Link
									href={`/tests/category/${o.id}`}
									className='inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40'
								>
									<span aria-hidden='true'>{o.emoji}</span>&nbsp;{o.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</main>
	)
}
