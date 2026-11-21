import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/api'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE } from '@/lib/site'
import { formatDate } from '@/lib/utils'
import { readingMinutes } from '@/lib/utils/reading'

const TITLE = 'Блог о психологии, привычках и самопознании'
const DESCRIPTION =
	'Статьи о том, как устроены психологические тесты, что такое темперамент и стиль привязанности, как справляться со стрессом. Без воды, со ссылками на тесты.'

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: { canonical: '/blog' },
	openGraph: { url: `${SITE.url}/blog`, title: TITLE, description: DESCRIPTION }
}

export default function BlogPage() {
	const posts = getAllPosts()
	return (
		<main>
			<JsonLd
				data={{
					'@context': 'https://schema.org',
					'@type': 'Blog',
					name: `Блог ${SITE.name}`,
					url: `${SITE.url}/blog`,
					description: DESCRIPTION,
					publisher: { '@id': `${SITE.url}#organization` },
					inLanguage: 'ru',
					blogPost: posts.map(p => ({
						'@type': 'BlogPosting',
						headline: p.title,
						description: p.excerpt,
						url: `${SITE.url}/blog/${p.slug}`,
						datePublished: p.date
					}))
				}}
			/>
			<Breadcrumbs
				items={[
					{ name: 'Главная', url: '/' },
					{ name: 'Блог', url: '/blog' }
				]}
			/>
			<div className='container pb-16'>
				<h1 className='text-4xl sm:text-5xl'>Блог</h1>
				<p className='mt-3 max-w-2xl text-lg text-muted-foreground'>
					Разбираемся, что стоит за тестами: откуда берутся типы и шкалы, что с ними делать и где их пределы.
				</p>
				{posts.length === 0 ? (
					<p className='mt-10 text-muted-foreground'>Статей пока нет.</p>
				) : (
					<div className='mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
						{posts.map(p => (
							<Link
								key={p.slug}
								href={`/blog/${p.slug}`}
								className='group flex flex-col rounded-2xl border border-border/70 bg-card p-6 transition-all [corner-shape:squircle] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg'
							>
								<div className='flex items-center gap-2 text-xs text-muted-foreground'>
									<time dateTime={p.date}>{formatDate(p.date, 'ru-RU')}</time>
									<span aria-hidden='true'>·</span>
									<span>{readingMinutes(p.content)} мин чтения</span>
								</div>
								<h2 className='mt-3 text-xl leading-snug group-hover:text-primary'>{p.title}</h2>
								<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>{p.excerpt}</p>
								<span className='mt-auto pt-5 text-sm font-semibold text-primary'>Читать</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</main>
	)
}
