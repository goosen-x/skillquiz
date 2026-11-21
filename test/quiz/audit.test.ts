import { describe, expect, it } from 'vitest'
import { QUIZZES } from '@/content/quizzes'
import { auditQuiz } from '@/lib/quiz/audit'

const slugs = QUIZZES.map(q => q.slug)

describe('аудит описаний тестов', () => {
	it('слаги уникальны', () => {
		expect(new Set(slugs).size).toBe(slugs.length)
	})

	for (const quiz of QUIZZES) {
		it(`${quiz.slug} (${quiz.kind})`, () => {
			const { issues } = auditQuiz(quiz, { allSlugs: slugs })
			expect(issues).toEqual([])
		})
	}
})
