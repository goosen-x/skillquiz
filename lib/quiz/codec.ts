/**
 * Ответы ↔ короткий код для ссылки на результат: /tests/<slug>/result/<код>.
 * Код — версия формата и по одному символу base36 на вопрос. Результат
 * целиком восстанавливается из кода, поэтому ссылкой можно делиться без
 * базы данных, а страница и OG-картинка считаются на сервере.
 */

import type { AnyQuiz, Answers } from './types'

const VERSION = 'a'

export function encodeAnswers(answers: Answers): string {
	return VERSION + answers.map(a => a.toString(36)).join('')
}

/** null, если код битый или не подходит к тесту */
export function decodeAnswers(quiz: AnyQuiz, code: string): Answers | null {
	if (!code.startsWith(VERSION)) return null
	const body = code.slice(VERSION.length)
	if (body.length !== quiz.questions.length) return null
	const answers: Answers = []
	for (let i = 0; i < body.length; i++) {
		const n = parseInt(body[i], 36)
		if (Number.isNaN(n) || n >= quiz.questions[i].options.length) return null
		answers.push(n)
	}
	return answers
}
