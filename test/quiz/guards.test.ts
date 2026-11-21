import { describe, expect, it } from 'vitest'
import stress from '@/content/quizzes/stress-level'
import temperament from '@/content/quizzes/temperament'
import { auditQuiz } from '@/lib/quiz/audit'
import type { AnyQuiz } from '@/lib/quiz/types'

/** Глубокая копия с правкой: проверяем, что аудит ловит типичные ошибки */
function broken<T extends AnyQuiz>(quiz: T, patch: (q: T) => void): AnyQuiz {
	const copy = structuredClone(quiz) as T
	patch(copy)
	return copy
}

const issues = (q: AnyQuiz) => auditQuiz(q).issues.join('\n')

describe('аудит ловит ошибки в описании теста', () => {
	it('эталон чистый', () => {
		expect(auditQuiz(stress).issues).toEqual([])
		expect(auditQuiz(temperament).issues).toEqual([])
	})

	it('дыра между уровнями', () => {
		const q = broken(stress, s => {
			s.bands.moderate.from = 30
		})
		expect(issues(q)).toMatch(/дыра или перекрытие/)
	})

	it('поле чужого вида', () => {
		const q = broken(stress, s => {
			;(s as unknown as Record<string, unknown>).types = {}
		})
		expect(issues(q)).toMatch(/схема/)
	})

	it('пустая строка и undefined в тексте', () => {
		expect(issues(broken(stress, s => (s.bands.low.summary = '')))).toMatch(/схема: bands.low.summary/)
		expect(issues(broken(stress, s => (s.bands.low.summary = 'Итог: undefined')))).toMatch(/undefined/)
	})

	it('недостижимый уровень', () => {
		// Сумма баллов идёт шагом 1/75 ≈ 1,33%: в отрезок 27–27,5% не попасть
		const q = broken(stress, s => {
			s.bands.moderate.to = 27.5
			s.bands.high.from = 27.5
		})
		expect(issues(q)).toMatch(/недостижимо: уровень «moderate»/)
	})

	it('тип, за который не голосует ни один вариант', () => {
		const q = broken(temperament, t => {
			for (const question of t.questions) {
				for (const o of question.options) {
					if ('phlegmatic' in o.points) o.points = { sanguine: 1 }
				}
			}
		})
		expect(issues(q)).toMatch(/phlegmatic/)
	})

	it('лишние данные: текст, который не попадает ни в один блок', () => {
		// Дополнительный список с ключом, которого нет у теста
		const q = broken(stress, s => {
			s.template = { add: [{ title: 'Лишнее', after: 'gauge', items: { low: ['а-а', 'б-б'], moderate: ['в-в', 'г-г'], high: ['д-д', 'е-е'], critical: ['ж-ж', 'з-з'], ghost: ['и-и', 'к-к'] } as never }] }
		})
		expect(issues(q)).toMatch(/лишние ключи ghost/)
	})

	it('баллы несуществующей шкале', () => {
		const q = broken(temperament, t => {
			;(t.questions[0].options[0].points as Record<string, number>).ghost = 2
		})
		expect(issues(q)).toMatch(/шкалы «ghost» нет/)
	})
})
