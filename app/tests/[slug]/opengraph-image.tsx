import { OG_SIZE, renderOg } from '@/lib/og/render'
import { getAllQuizzes, getQuiz } from '@/lib/quiz/catalog'
import { questionsLabel, minutesLabel } from '@/lib/utils/pluralize'

export const alt = 'Тест на SkillQuiz'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
	return getAllQuizzes().map(q => ({ slug: q.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const quiz = getQuiz(slug)
	if (!quiz) return renderOg({ eyebrow: 'Тест', title: 'SkillQuiz' })
	return renderOg({
		eyebrow: `Тест · ${minutesLabel(quiz.minutes)} · ${questionsLabel(quiz.questions.length)}`,
		title: quiz.title,
		subtitle: quiz.question
	})
}
