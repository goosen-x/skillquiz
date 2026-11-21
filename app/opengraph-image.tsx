import { OG_SIZE, renderOg } from '@/lib/og/render'
import { getAllQuizzes } from '@/lib/quiz/catalog'
import { testsLabel } from '@/lib/utils/pluralize'

export const alt = 'SkillQuiz: психологические тесты онлайн с разбором результата'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
	return renderOg({
		eyebrow: `${testsLabel(getAllQuizzes().length)} · бесплатно`,
		title: 'Психологические тесты с подробным разбором',
		subtitle: 'Личность, эмоции, отношения, карьера, мышление и деньги'
	})
}
