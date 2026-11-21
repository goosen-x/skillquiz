import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
// @ts-ignore внутренний модуль без типов
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import { QUIZZES } from '../content/quizzes'
import { expectNoBadText, expectNoHorizontalScroll, prepare, press, shot } from './helpers'

/**
 * Каждый тест проходится целиком на iPhone 15 и iPhone SE пальцем:
 * старт → все вопросы → экран результата → PDF → ссылка для шаринга.
 */
for (const quiz of QUIZZES) {
	test(`тест ${quiz.slug} проходится целиком`, async ({ page }, info) => {
		const errors = await prepare(page)
		await page.goto(`/tests/${quiz.slug}`)
		await expect(page.getByTestId('quiz-start')).toBeVisible()
		await expect(page.locator('h1')).toHaveText(quiz.title)
		await expectNoHorizontalScroll(page)
		if (quiz.slug === 'stress-level') await page.screenshot({ path: shot(info, 'quiz-start') })

		await press(info, page.getByTestId('quiz-begin'))
		const total = quiz.questions.length
		const rnd = (i: number) => (i * 7 + quiz.slug.length) % quiz.questions[i].options.length

		for (let i = 0; i < total; i++) {
			await expect(page.getByTestId('quiz-counter')).toHaveText(`${i + 1} из ${total}`)
			await expect(page.getByTestId('quiz-question-text')).toHaveText(quiz.questions[i].text)
			const options = page.getByTestId('quiz-option')
			await expect(options).toHaveCount(quiz.questions[i].options.length)
			if (i === 2) {
				await expectNoHorizontalScroll(page)
				if (['stress-level', 'attachment-style', 'financial-literacy'].includes(quiz.slug)) {
					await page.waitForTimeout(400)
					await page.screenshot({ path: shot(info, `question-${quiz.slug}`) })
				}
			}
			// На третьем вопросе проверяем «Назад»: вернуться и ответить снова
			if (i === 3) {
				await press(info, page.getByTestId('quiz-back'))
				await expect(page.getByTestId('quiz-counter')).toHaveText(`3 из ${total}`)
				await press(info, page.getByTestId('quiz-forward'))
				await expect(page.getByTestId('quiz-counter')).toHaveText(`4 из ${total}`)
			}
			// На пятом проверяем сохранение прогресса: перезагрузка → тот же вопрос
			if (i === 5) {
				await page.reload()
				await expect(page.getByTestId('quiz-counter')).toHaveText(`6 из ${total}`)
			}
			await press(info, options.nth(rnd(i)))
		}

		await page.waitForURL(new RegExp(`/tests/${quiz.slug}/result/a[0-9a-z]+$`), { timeout: 30_000 })
		const hero = page.getByTestId('result-hero')
		await expect(hero).toBeVisible()
		await expect(page.getByTestId('result-blocks').locator('[data-block]')).not.toHaveCount(0)
		if (quiz.kind !== 'knowledge') await expect(page.getByTestId('result-disclaimer')).toBeVisible()
		if (!quiz.template?.omit?.includes('comparison')) {
			await expect(page.getByTestId('result-comparison')).not.toContainText('Загружаем')
		}
		await expectNoBadText(page)
		await expectNoHorizontalScroll(page)
		if (['stress-level', 'personality-type', 'attachment-style', 'financial-literacy', 'financial-cushion'].includes(quiz.slug)) {
			await page.screenshot({ path: shot(info, `result-${quiz.slug}`) })
		}

		// PDF: настоящий файл, больше 10 КБ, в тексте кириллица и итог
		const [download] = await Promise.all([page.waitForEvent('download'), press(info, page.getByTestId('download-pdf'))])
		const file = await download.path()
		const buf = readFileSync(file!)
		expect(buf.length).toBeGreaterThan(10 * 1024)
		const { text } = await pdfParse(buf)
		expect(text).toMatch(/[а-яё]{4,}/i)
		const heroTitle = (await hero.locator('p').nth(1).innerText()).split(/\s+/)[0]
		expect(text.replace(/\s+/g, ' ')).toContain(heroTitle)

		// Шаринг: ссылки на соцсети ведут на адрес результата, копирование работает
		const url = page.url()
		const shareUrl = encodeURIComponent(`https://skillquiz.ru${new URL(url).pathname}`)
		expect(await page.getByTestId('share-telegram').getAttribute('href')).toContain(shareUrl)
		await expect(page.getByTestId('share-vk')).toHaveAttribute('href', /vk\.com\/share\.php/)
		await expect(page.getByTestId('share-whatsapp')).toHaveAttribute('href', /wa\.me/)
		await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
		await press(info, page.getByTestId('share-copy'))
		await expect(page.getByText('Ссылка на результат скопирована')).toBeVisible()

		// Ссылка открывается заново (как у получателя) и показывает тот же итог
		const heroText = (await hero.textContent()) ?? ''
		const fresh = await page.context().newPage()
		await prepare(fresh)
		await fresh.goto(url)
		await expect(fresh.getByTestId('result-hero')).toHaveText(heroText)
		await fresh.close()

		const goals = await page.evaluate(() => (window as unknown as { __goals?: Array<{ goal: string }> }).__goals?.map(g => g.goal) ?? [])
		expect(goals).toEqual(expect.arrayContaining(['test_complete', 'pdf_download', 'share']))

		expect(errors, errors.join('\n')).toEqual([])
	})
}
