import { expect, type Locator, type Page, type TestInfo } from '@playwright/test'
import { mkdirSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

export const SHOTS = process.env.SHOTS_DIR ?? join(homedir(), 'work/skillquiz-shots')
mkdirSync(SHOTS, { recursive: true })

/** Метрику и рекламу в автотестах не грузим: чужие скрипты шумят в консоли */
export async function prepare(page: Page): Promise<string[]> {
	const errors: string[] = []
	await page.route(/mc\.yandex\.ru|yandex\.ru\/ads/, route => route.fulfill({ status: 200, body: '' }))
	await page.addInitScript(() => {
		try {
			localStorage.setItem('cookieConsent', 'accepted')
		} catch {}
	})
	page.on('console', msg => {
		if (msg.type() === 'error') errors.push(msg.text())
	})
	page.on('pageerror', err => errors.push(String(err)))
	return errors
}

export async function expectNoHorizontalScroll(page: Page) {
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
	expect(overflow, 'горизонтальная прокрутка').toBeLessThanOrEqual(0)
}

export async function expectNoBadText(page: Page) {
	const text = await page.locator('main').innerText()
	expect(text).not.toMatch(/undefined|NaN|\[object Object\]/)
}

/** На телефонных проектах нажимаем пальцем (tap), на десктопе мышью */
export async function press(info: TestInfo, locator: Locator) {
	if (info.project.use.hasTouch) await locator.tap()
	else await locator.click()
}

export function shot(info: TestInfo, name: string) {
	return join(SHOTS, `${info.project.name}-${name}.png`)
}
