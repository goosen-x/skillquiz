'use client'

import type { StatsResponse } from './stats-types'

/**
 * Последний ответ /api/stats на странице результата. Его читает PDF, чтобы
 * в файле были те же цифры сравнения, что и на экране.
 */
let current: StatsResponse | null = null

export function setClientStats(stats: StatsResponse | null) {
	current = stats
}

export function getClientStats(): StatsResponse | null {
	return current
}
