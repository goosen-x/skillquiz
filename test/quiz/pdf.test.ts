import { describe, expect, it } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
// pdf-parse/index.js при импорте читает тестовый файл из своей папки
// @ts-ignore нет типов для внутреннего модуля
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import { QUIZZES } from '@/content/quizzes'
import { buildResult } from '@/lib/quiz/engine'
import { buildResultPdf } from '@/lib/quiz/pdf'

const font = (name: string) => readFileSync(join(process.cwd(), 'public/fonts/pdf', name)).toString('base64')
const fonts = { regular: font('Inter-Regular.ttf'), semibold: font('Inter-SemiBold.ttf'), bold: font('Inter-Bold.ttf') }

describe('PDF результата', () => {
	for (const quiz of QUIZZES) {
		it(`${quiz.slug}: файл больше 10 КБ, в тексте кириллица и итог`, async () => {
			const answers = quiz.questions.map(q => q.options.length - 1)
			const result = buildResult(quiz, answers)
			const doc = buildResultPdf(result, {
				quizTitle: quiz.title,
				url: `https://skillquiz.ru/tests/${quiz.slug}`,
				date: new Date('2026-11-21'),
				fonts
			})
			const buf = Buffer.from(doc.output('arraybuffer'))
			expect(buf.length).toBeGreaterThan(10 * 1024)
			const { text } = await pdfParse(buf)
			expect(text).toMatch(/[а-яё]{4,}/i)
			const hero = result.blocks[0]
			if (hero.type !== 'hero') throw new Error('нет итога')
			// Первое слово итога должно найтись в тексте PDF
			const firstWord = hero.data.title.split(/\s+/)[0]
			expect(text.replace(/\s+/g, ' ')).toContain(firstWord)
		})
	}
})
