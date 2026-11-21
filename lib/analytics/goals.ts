import { YANDEX_METRIKA_ID } from '@/lib/site'

declare global {
	interface Window {
		ym?: (counterId: number, action: string, ...params: unknown[]) => void
	}
}

/**
 * Цели Метрики. Названия целей заведены в счётчике 114488428 как
 * «JavaScript-событие» с этими идентификаторами.
 */
export type GoalName = 'test_start' | 'test_complete' | 'pdf_download' | 'share'

export function reachGoal(goal: GoalName, params?: Record<string, string | number>): void {
	if (typeof window === 'undefined') return
	// Для e2e и отладки: последние цели видно в window.__goals
	const w = window as Window & { __goals?: Array<{ goal: GoalName; params?: Record<string, string | number> }> }
	w.__goals = [...(w.__goals ?? []), { goal, params }].slice(-50)
	if (process.env.NODE_ENV !== 'production') return
	window.ym?.(YANDEX_METRIKA_ID, 'reachGoal', goal, params)
}
