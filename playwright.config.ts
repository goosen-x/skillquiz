import { defineConfig } from '@playwright/test'

/**
 * e2e на системном Chrome. Базовый адрес: E2E_BASE_URL (по умолчанию
 * локальная прод-сборка на :3200, её поднимает webServer).
 *   pnpm build && pnpm test:e2e
 *   E2E_BASE_URL=https://skillquiz.ru pnpm test:e2e   — проверка прода
 */
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:3200'

export default defineConfig({
	testDir: './e2e',
	timeout: 180_000,
	expect: { timeout: 15_000 },
	fullyParallel: true,
	workers: process.env.E2E_WORKERS ? Number(process.env.E2E_WORKERS) : 4,
	retries: 1,
	reporter: [['list'], ['json', { outputFile: 'test-results/e2e.json' }]],
	use: {
		baseURL: BASE,
		locale: 'ru-RU',
		launchOptions: { executablePath: CHROME },
		trace: 'retain-on-failure'
	},
	projects: [
		{
			name: 'iphone15',
			use: { viewport: { width: 393, height: 852 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }
		},
		{
			name: 'iphoneSE',
			use: { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
		},
		{
			name: 'desktop',
			use: { viewport: { width: 1366, height: 900 } },
			testMatch: /pages\.spec\.ts/
		}
	],
	webServer: process.env.E2E_BASE_URL
		? undefined
		: {
				command: 'pnpm start -p 3200',
				url: 'http://localhost:3200/api/health',
				reuseExistingServer: true,
				timeout: 60_000
			}
})
