import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	test: {
		environment: 'node',
		include: ['test/**/*.test.ts'],
		testTimeout: 60000
	},
	resolve: {
		alias: { '@': resolve(__dirname, './') }
	}
})
