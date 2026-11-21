import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { QuizRunner } from '@/components/quiz/QuizRunner'
import { QuizCard } from '@/components/quiz/QuizCard'
import { AdSection } from '@/components/ads'
import { getAllQuizzes, getQuiz, getRelatedCards, toRunner } from '@/lib/quiz/catalog'
import { CATEGORIES } from '@/lib/quiz/categories'
import { getAllPosts } from '@/lib/api'
import { SITE } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
	return getAllQuizzes().map(q => ({ slug: q.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const quiz = getQuiz(slug)
	if (!quiz) return {}
	return {
		title: { absolute: `${quiz.seo.title} | SkillQuiz` },
		description: quiz.seo.description,
		alternates: { canonical: `/tests/${quiz.slug}` },
		openGraph: {
			type: 'website',
			url: `${SITE.url}/tests/${quiz.slug}`,
			title: quiz.seo.title,
			description: quiz.seo.description
		},
		twitter: { card: 'summary_large_image', title: quiz.seo.title, description: quiz.seo.description }
	}
}

export default async function QuizPage({ params }: Props) {
	const { slug } = await params
	const quiz = getQuiz(slug)
	if (!quiz) notFound()

	const category = CATEGORIES[quiz.category]
	const related = getRelatedCards(quiz)
	const posts = getAllPosts().filter(p => p.tests.includes(quiz.slug))
	const url = `${SITE.url}/tests/${quiz.slug}`

	return (
		<main>
			<JsonLd
				data={[
					{
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						'@id': url,
						url,
						name: quiz.seo.title,
						headline: quiz.title,
						description: quiz.seo.description,
						inLanguage: 'ru',
						datePublished: quiz.published,
						isPartOf: { '@id': `${SITE.url}#website` },
						publisher: { '@id': `${SITE.url}#organization` },
						about: { '@type': 'Thing', name: category.title },
						primaryImageOfPage: { '@type': 'ImageObject', url: `${url}/opengraph-image` },
						timeRequired: `PT${quiz.minutes}M`
					},
					{
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: quiz.faq.map(f => ({
							'@type': 'Question',
							name: f.q,
							acceptedAnswer: { '@type': 'Answer', text: f.a }
						}))
					}
				]}
			/>
			<Breadcrumbs
				items={[
					{ name: 'Главная', url: '/' },
					{ name: 'Тесты', url: '/tests' },
					{ name: category.title, url: `/tests/category/${quiz.category}` },
					{ name: quiz.title, url: `/tests/${quiz.slug}` }
				]}
			/>

			<div className='container max-w-3xl'>
				<QuizRunner quiz={toRunner(quiz)} />
			</div>

			<div className='container max-w-3xl pb-6' data-quiz-extra>
				<section className='mt-12' aria-labelledby='about-test'>
					<h2 id='about-test' className='text-2xl sm:text-3xl'>
						О тесте
					</h2>
					<div className='mt-4 space-y-4 text-[1.0625rem] leading-relaxed'>
						{quiz.intro.map(p => (
							<p key={p}>{p}</p>
						))}
					</div>
				</section>

				<section className='mt-10 rounded-2xl border border-border/70 bg-muted/40 p-5 sm:p-6' aria-labelledby='method'>
					<h2 id='method' className='text-xl'>
						Как считается результат
					</h2>
					<p className='mt-3 leading-relaxed text-muted-foreground'>{quiz.method}</p>
				</section>

				<AdSection />

				<section className='mt-10' aria-labelledby='faq'>
					<h2 id='faq' className='text-2xl sm:text-3xl'>
						Вопросы о тесте
					</h2>
					<div className='mt-5 divide-y divide-border rounded-2xl border border-border/70 bg-card'>
						{quiz.faq.map(f => (
							<details key={f.q} className='group px-5 py-4 [&_summary::-webkit-details-marker]:hidden'>
								<summary className='flex cursor-pointer items-center justify-between gap-4 font-semibold'>
									<h3 className='font-sans text-base font-semibold tracking-normal'>{f.q}</h3>
									<span aria-hidden='true' className='text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45'>
										+
									</span>
								</summary>
								<p className='mt-3 leading-relaxed text-muted-foreground'>{f.a}</p>
							</details>
						))}
					</div>
				</section>

				{posts.length > 0 && (
					<section className='mt-10' aria-labelledby='articles'>
						<h2 id='articles' className='text-2xl'>
							Почитать по теме
						</h2>
						<ul className='mt-4 space-y-3'>
							{posts.map(p => (
								<li key={p.slug}>
									<Link href={`/blog/${p.slug}`} className='font-semibold text-primary hover:underline'>
										{p.title}
									</Link>
									<p className='text-sm text-muted-foreground'>{p.excerpt}</p>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>

			{related.length > 0 && (
				<section className='container pt-6 pb-6' aria-labelledby='related' data-quiz-extra>
					<h2 id='related' className='text-2xl sm:text-3xl'>
						Похожие тесты
					</h2>
					<div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						{related.map(r => (
							<QuizCard key={r.slug} quiz={r} />
						))}
					</div>
					<p className='mt-6'>
						<Link href={`/tests/category/${quiz.category}`} className='font-semibold text-primary hover:underline'>
							Все тесты раздела «{category.title}»
						</Link>
					</p>
				</section>
			)}
		</main>
	)
}
