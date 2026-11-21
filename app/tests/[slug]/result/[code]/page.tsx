import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { QuizCard } from '@/components/quiz/QuizCard'
import { ResultBlocks } from '@/components/quiz/result/ResultBlocks'
import { ResultActions } from '@/components/quiz/result/ResultActions'
import { AdSection } from '@/components/ads'
import { getQuiz, getRelatedCards } from '@/lib/quiz/catalog'
import { CATEGORIES } from '@/lib/quiz/categories'
import { decodeAnswers } from '@/lib/quiz/codec'
import { buildResult, resultHeadline } from '@/lib/quiz/engine'
import { getAllPosts } from '@/lib/api'
import { NOINDEX } from '@/lib/seo/noindex'
import { SITE } from '@/lib/site'

type Props = { params: Promise<{ slug: string; code: string }> }

function load(slug: string, code: string) {
	const quiz = getQuiz(slug)
	const answers = quiz ? decodeAnswers(quiz, code) : null
	if (!quiz || !answers) return null
	return { quiz, result: buildResult(quiz, answers) }
}

function headlineText(h: { eyebrow: string; title: string; value: string | null }) {
	return h.value ? `${h.title} (${h.value})` : h.title
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug, code } = await params
	const data = load(slug, code)
	if (!data) return { robots: NOINDEX }
	const h = resultHeadline(data.result)
	const title = `Мой результат: ${headlineText(h)}`
	const description = `${data.quiz.title}. ${h.eyebrow}: ${headlineText(h)}. Пройдите тест и сравните результаты на SkillQuiz.`
	return {
		title: { absolute: `${title} | ${data.quiz.title}` },
		description,
		robots: NOINDEX,
		alternates: { canonical: `/tests/${slug}` },
		openGraph: {
			type: 'website',
			url: `${SITE.url}/tests/${slug}/result/${code}`,
			title,
			description
		},
		twitter: { card: 'summary_large_image', title, description }
	}
}

export default async function ResultPage({ params }: Props) {
	const { slug, code } = await params
	const data = load(slug, code)
	if (!data) notFound()
	const { quiz, result } = data
	const h = resultHeadline(result)
	const url = `${SITE.url}/tests/${slug}/result/${code}`
	const related = getRelatedCards(quiz, 4)
	const posts = getAllPosts().filter(p => p.tests.includes(quiz.slug)).slice(0, 3)
	const category = CATEGORIES[quiz.category]

	return (
		<main>
			<Breadcrumbs
				items={[
					{ name: 'Главная', url: '/' },
					{ name: 'Тесты', url: '/tests' },
					{ name: category.title, url: `/tests/category/${quiz.category}` },
					{ name: quiz.title, url: `/tests/${quiz.slug}` },
					{ name: 'Результат', url: `/tests/${quiz.slug}/result/${code}` }
				]}
			/>
			<div className='container max-w-3xl'>
				<Link
					href={`/tests/${quiz.slug}`}
					className='inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground'
				>
					<ArrowLeft className='h-4 w-4' aria-hidden='true' />
					{quiz.title}
				</Link>
				<h1 className='mt-3 text-2xl leading-tight sm:text-3xl'>Результат теста «{quiz.title}»</h1>

				<div className='mt-6'>
					<ResultBlocks blocks={result.blocks} code={code} />
				</div>

				<div className='mt-5'>
					<ResultActions
						result={result}
						quizTitle={quiz.title}
						url={url}
						shareText={`Мой результат в тесте «${quiz.title}»: ${headlineText(h)}`}
					/>
				</div>

				<AdSection />

				{posts.length > 0 && (
					<section className='mt-10' aria-labelledby='res-articles'>
						<h2 id='res-articles' className='text-2xl'>
							Почитать по теме
						</h2>
						<ul className='mt-4 space-y-3'>
							{posts.map(p => (
								<li key={p.slug}>
									<Link href={`/blog/${p.slug}`} className='font-semibold text-primary hover:underline'>
										{p.title}
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>

			{related.length > 0 && (
				<section className='container pt-10 pb-6' aria-labelledby='res-related'>
					<h2 id='res-related' className='text-2xl sm:text-3xl'>
						Что пройти дальше
					</h2>
					<div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						{related.map(r => (
							<QuizCard key={r.slug} quiz={r} />
						))}
					</div>
				</section>
			)}
		</main>
	)
}
