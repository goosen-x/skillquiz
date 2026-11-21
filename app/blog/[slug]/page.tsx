import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/helpers/markdownToHtml'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { QuizCard } from '@/components/quiz/QuizCard'
import { AdSection } from '@/components/ads'
import { getQuiz, toCard } from '@/lib/quiz/catalog'
import { SITE } from '@/lib/site'
import { formatDate } from '@/lib/utils'
import { readingMinutes } from '@/lib/utils/reading'
import styles from '@/components/blog/markdown.module.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
	return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) return {}
	const url = `${SITE.url}/blog/${post.slug}`
	return {
		title: post.title,
		description: post.excerpt,
		alternates: { canonical: `/blog/${post.slug}` },
		authors: [{ name: post.author.name }],
		openGraph: {
			type: 'article',
			url,
			title: post.title,
			description: post.excerpt,
			publishedTime: post.date,
			modifiedTime: post.updated ?? post.date,
			images: [{ url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.title }]
		},
		twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt }
	}
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params
	const post = getPostBySlug(slug)
	if (!post) notFound()

	const html = await markdownToHtml(post.content)
	const url = `${SITE.url}/blog/${post.slug}`
	const tests = post.tests.map(getQuiz).filter(q => q !== undefined).map(toCard)
	const others = getAllPosts().filter(p => p.slug !== post.slug).slice(0, 3)

	return (
		<main>
			<JsonLd
				data={{
					'@context': 'https://schema.org',
					'@type': 'BlogPosting',
					headline: post.title,
					description: post.excerpt,
					image: `${url}/opengraph-image`,
					datePublished: post.date,
					dateModified: post.updated ?? post.date,
					author: { '@type': 'Organization', name: post.author.name, url: SITE.url },
					publisher: { '@id': `${SITE.url}#organization` },
					mainEntityOfPage: { '@type': 'WebPage', '@id': url },
					inLanguage: 'ru'
				}}
			/>
			<Breadcrumbs
				items={[
					{ name: 'Главная', url: '/' },
					{ name: 'Блог', url: '/blog' },
					{ name: post.title, url: `/blog/${post.slug}` }
				]}
			/>
			<article className='container max-w-3xl pb-10'>
				<header>
					<h1 className='text-3xl leading-tight sm:text-4xl lg:text-5xl'>{post.title}</h1>
					<div className='mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground'>
						<span>{post.author.name}</span>
						<span aria-hidden='true'>·</span>
						<time dateTime={post.date}>{formatDate(post.date, 'ru-RU')}</time>
						<span aria-hidden='true'>·</span>
						<span>{readingMinutes(post.content)} мин чтения</span>
					</div>
					<p className='mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl'>{post.excerpt}</p>
				</header>
				<div className={`${styles.markdown} mt-8`} dangerouslySetInnerHTML={{ __html: html }} />
				<AdSection />
			</article>

			{tests.length > 0 && (
				<section className='container pb-10' aria-labelledby='post-tests'>
					<h2 id='post-tests' className='text-2xl'>
						Тесты из статьи
					</h2>
					<div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						{tests.map(t => (
							<QuizCard key={t.slug} quiz={t} />
						))}
					</div>
				</section>
			)}

			{others.length > 0 && (
				<section className='container pb-10' aria-labelledby='post-more'>
					<h2 id='post-more' className='text-2xl'>
						Ещё статьи
					</h2>
					<ul className='mt-4 space-y-3'>
						{others.map(p => (
							<li key={p.slug}>
								<Link href={`/blog/${p.slug}`} className='font-semibold text-primary hover:underline'>
									{p.title}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}
		</main>
	)
}
