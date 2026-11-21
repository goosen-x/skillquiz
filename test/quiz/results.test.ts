import { describe, expect, it } from 'vitest'
import { QUIZZES } from '@/content/quizzes'
import { blockSchema } from '@/lib/quiz/schema'
import { buildResult, computeMetrics } from '@/lib/quiz/engine'
import { decodeAnswers, encodeAnswers } from '@/lib/quiz/codec'
import type { Answers, AnyQuiz } from '@/lib/quiz/types'

function rng(seed: number) {
	let a = seed
	return () => {
		a = (a * 1103515245 + 12345) % 2147483648
		return a / 2147483648
	}
}

function answerSets(quiz: AnyQuiz): Array<[string, Answers]> {
	const sets: Array<[string, Answers]> = [
		['все первые', quiz.questions.map(() => 0)],
		['все последние', quiz.questions.map(q => q.options.length - 1)],
		['все средние', quiz.questions.map(q => Math.floor((q.options.length - 1) / 2))]
	]
	const rnd = rng(quiz.slug.length * 7919)
	for (let i = 0; i < 30; i++) {
		sets.push([`случайные #${i + 1}`, quiz.questions.map(q => Math.floor(rnd() * q.options.length))])
	}
	return sets
}

const BAD = /undefined|NaN|\[object Object\]|\bnull\b/

function walkStrings(value: unknown, path: string, out: Array<[string, string]>) {
	if (typeof value === 'string') out.push([path, value])
	else if (Array.isArray(value)) value.forEach((v, i) => walkStrings(v, `${path}[${i}]`, out))
	else if (value && typeof value === 'object') {
		for (const [k, v] of Object.entries(value)) walkStrings(v, `${path}.${k}`, out)
	}
}

function walkNumbers(value: unknown, path: string, out: Array<[string, number]>) {
	if (typeof value === 'number') out.push([path, value])
	else if (Array.isArray(value)) value.forEach((v, i) => walkNumbers(v, `${path}[${i}]`, out))
	else if (value && typeof value === 'object') {
		for (const [k, v] of Object.entries(value)) walkNumbers(v, `${path}.${k}`, out)
	}
}

describe('результаты всех тестов', () => {
	for (const quiz of QUIZZES) {
		describe(quiz.slug, () => {
			for (const [label, answers] of answerSets(quiz)) {
				it(label, () => {
					const result = buildResult(quiz, answers)
					expect(result.blocks.length).toBeGreaterThan(3)
					expect(result.blocks[0].type).toBe('hero')

					for (const block of result.blocks) {
						const parsed = blockSchema.safeParse(block)
						expect(parsed.success, `${block.type}: ${JSON.stringify(parsed.error?.issues)}`).toBe(true)
					}

					const strings: Array<[string, string]> = []
					walkStrings(result, 'result', strings)
					for (const [path, s] of strings) {
						expect(s.trim().length, `пустая строка в ${path}`).toBeGreaterThan(0)
						expect(BAD.test(s), `${path}: «${s}»`).toBe(false)
					}

					const numbers: Array<[string, number]> = []
					walkNumbers(result.blocks, 'blocks', numbers)
					for (const [path, n] of numbers) {
						expect(Number.isFinite(n), `${path} = ${n}`).toBe(true)
						if (/percent|percentile|from|to|baselineTypeShare/.test(path)) {
							expect(n, path).toBeGreaterThanOrEqual(0)
							expect(n, path).toBeLessThanOrEqual(100)
						}
					}

					// Метрики в пределах шкал
					const m = computeMetrics(quiz, answers)
					for (const v of Object.values(m.scales)) {
						expect(v).toBeGreaterThanOrEqual(0)
						expect(v).toBeLessThanOrEqual(100)
					}
					if (m.main !== null && quiz.kind !== 'calculator') {
						expect(m.main).toBeGreaterThanOrEqual(0)
						expect(m.main).toBeLessThanOrEqual(100)
					}
					if (quiz.kind === 'calculator' && m.main !== null) {
						expect(m.main).toBeGreaterThanOrEqual(quiz.metric.min)
						expect(m.main).toBeLessThanOrEqual(quiz.metric.max)
					}

					// Ссылка на результат восстанавливает те же ответы
					expect(decodeAnswers(quiz, encodeAnswers(answers))).toEqual(answers)
				})
			}
		})
	}
})

describe('кодек', () => {
	it('отвергает битые коды', () => {
		const quiz = QUIZZES[0]
		expect(decodeAnswers(quiz, 'zzz')).toBeNull()
		expect(decodeAnswers(quiz, 'a' + '9'.repeat(quiz.questions.length))).toBeNull()
		expect(decodeAnswers(quiz, 'a' + '0'.repeat(quiz.questions.length + 1))).toBeNull()
	})
})
