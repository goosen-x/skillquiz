import { OG_SIZE, renderOg } from '@/lib/og/render'
import { getQuiz } from '@/lib/quiz/catalog'
import { decodeAnswers } from '@/lib/quiz/codec'
import { buildResult, resultHeadline } from '@/lib/quiz/engine'

export const alt = 'Результат теста на SkillQuiz'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string; code: string }> }) {
	const { slug, code } = await params
	const quiz = getQuiz(slug)
	const answers = quiz ? decodeAnswers(quiz, code) : null
	if (!quiz || !answers) return renderOg({ eyebrow: 'Результат теста', title: 'SkillQuiz' })
	const h = resultHeadline(buildResult(quiz, answers))
	return renderOg({
		eyebrow: h.eyebrow,
		title: h.title,
		subtitle: `Мой результат в тесте «${quiz.title}»`,
		badge: h.value,
		footer: 'А какой результат будет у вас?'
	})
}
