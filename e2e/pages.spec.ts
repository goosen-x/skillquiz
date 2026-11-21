import { test, expect } from '@playwright/test'
import { readdirSync } from 'fs'
import { CATEGORY_IDS } from '../lib/quiz/categories'
import { expectNoBadText, expectNoHorizontalScroll, prepare, press, shot } from './helpers'

const posts = readdirSync('_posts').filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))

const PAGES: Array<[string, string]> = [
	['home', '/'],
	['catalog', '/tests'],
	...CATEGORY_IDS.map(c => [`category-${c}`, `/tests/category/${c}`] as [string, string]),
	['blog', '/blog'],
	...posts.map(p => [`post-${p}`, `/blog/${p}`] as [string, string]),
	['about', '/about'],
	['contact', '/contact'],
	['privacy', '/privacy'],
	['terms', '/terms']
]

for (const [name, path] of PAGES) {
	test(`страница ${path}`, async ({ page }, info) => {
		const errors = await prepare(page)
		const res = await page.goto(path)
		expect(res?.status()).toBe(200)
		await expect(page.locator('h1')).toHaveCount(1)
		await expect(page.locator('header[data-site-header]')).toBeVisible()
		await expect(page.locator('footer')).toBeVisible()
		const title = await page.title()
		expect(title.length).toBeGreaterThan(10)
		expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toContain('https://skillquiz.ru')
		await expectNoBadText(page)
		await expectNoHorizontalScroll(page)
		await page.screenshot({ path: shot(info, name) })
		expect(errors, errors.join('\n')).toEqual([])
	})
}

test('404 для несуществующей страницы', async ({ page }, info) => {
	const errors = await prepare(page)
	const res = await page.goto('/net-takoy-stranicy')
	expect(res?.status()).toBe(404)
	await expect(page.locator('h1')).toHaveText('Такой страницы нет')
	await expectNoHorizontalScroll(page)
	await page.screenshot({ path: shot(info, '404') })
	expect((await page.goto('/tests/net-takogo-testa'))?.status()).toBe(404)
	expect((await page.goto('/tests/stress-level/result/zzz'))?.status()).toBe(404)
	expect(errors.filter(e => !e.includes('404'))).toEqual([])
})

test('меню и поиск по каталогу', async ({ page }, info) => {
	await prepare(page)
	await page.goto('/tests')
	await page.getByLabel('Поиск по тестам').fill('стресс')
	await expect(page.locator('a[href="/tests/stress-level"]').first()).toBeVisible()
	if (info.project.use.isMobile) {
		await press(info, page.getByLabel('Открыть меню'))
		await expect(page.getByRole('navigation', { name: 'Мобильная навигация' })).toBeVisible()
		await page.screenshot({ path: shot(info, 'menu') })
		await press(info, page.getByRole('link', { name: 'Блог' }).last())
		await expect(page).toHaveURL(/\/blog$/)
	}
})

test('служебные файлы SEO', async ({ request }) => {
	const sitemap = await request.get('/sitemap.xml')
	expect(sitemap.status()).toBe(200)
	const xml = await sitemap.text()
	expect(xml).toContain('https://skillquiz.ru/tests/stress-level')
	expect(xml).toContain('https://skillquiz.ru/blog/')
	const robots = await (await request.get('/robots.txt')).text()
	expect(robots).toContain('Sitemap: https://skillquiz.ru/sitemap.xml')
	expect((await request.get('/rss.xml')).headers()['content-type']).toContain('rss')
	expect(await (await request.get('/llms.txt')).text()).toContain('# SkillQuiz')
	const og = await request.get('/tests/stress-level/opengraph-image')
	expect(og.status()).toBe(200)
	expect(og.headers()['content-type']).toContain('image/png')
	const res = await request.get('/tests/stress-level/result/a' + '2'.repeat(25) + '/opengraph-image')
	expect(res.status()).toBe(200)
})
