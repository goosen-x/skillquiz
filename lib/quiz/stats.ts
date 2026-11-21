/**
 * Сравнение с другими прошедшими: чтение и запись анонимных результатов.
 * Пока прохождений меньше MIN_SAMPLE, отдаём только их число, а экран
 * показывает ориентировочное распределение с честной подписью.
 */

import { getDb, isDbUnavailableError } from '@/lib/db'
import { percentileOf, type Metrics } from './engine'
import type { QuizKind } from './types'

import { MIN_SAMPLE, type StatsResponse } from './stats-types'

/** Сколько последних прохождений учитывать в сравнении */
const WINDOW = 5000

export async function saveResult(input: {
	quiz: string
	kind: QuizKind
	metrics: Metrics
	code: string
	durationSec: number | null
}): Promise<void> {
	const db = await getDb()
	await db.query(
		`INSERT INTO quiz_results (quiz, kind, main, scales, type, answers, duration_sec)
		 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
		[
			input.quiz,
			input.kind,
			input.metrics.main,
			JSON.stringify(input.metrics.scales),
			input.metrics.type,
			input.code,
			input.durationSec
		]
	)
}

export async function getStats(quiz: string, metrics: Metrics): Promise<StatsResponse> {
	const db = await getDb()
	const { rows } = await db.query<{ main: number | null; scales: Record<string, number>; type: string | null }>(
		`SELECT main, scales, type FROM quiz_results WHERE quiz = $1 ORDER BY created_at DESC LIMIT ${WINDOW}`,
		[quiz]
	)
	const count = rows.length
	if (count < MIN_SAMPLE) return { count, reliable: false, percentiles: {}, typeShare: null }

	const percentiles: Record<string, number> = {}
	if (metrics.main !== null) {
		const values = rows.map(r => r.main).filter((v): v is number => v !== null).sort((a, b) => a - b)
		percentiles.main = percentileOf(values, metrics.main)
	}
	for (const [key, value] of Object.entries(metrics.scales)) {
		const values = rows
			.map(r => r.scales?.[key])
			.filter((v): v is number => typeof v === 'number')
			.sort((a, b) => a - b)
		if (values.length >= MIN_SAMPLE) percentiles[key] = percentileOf(values, value)
	}
	const typeShare = metrics.type
		? Math.round((rows.filter(r => r.type === metrics.type).length / count) * 100)
		: null
	return { count, reliable: true, percentiles, typeShare }
}

export { isDbUnavailableError }
