import { NextRequest, NextResponse } from 'next/server'
import { getQuiz } from '@/lib/quiz/catalog'
import { decodeAnswers } from '@/lib/quiz/codec'
import { computeMetrics } from '@/lib/quiz/engine'
import { isDbUnavailableError, saveResult } from '@/lib/quiz/stats'
import { allow } from '@/lib/rate-limit'

/**
 * Сохраняет анонимный результат. Клиент присылает только слаг, код ответов
 * и длительность; метрики сервер считает сам из кода, подделать их нельзя.
 */
export async function POST(request: NextRequest) {
	const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local'
	if (!allow(`results:${ip}`, 20, 60_000)) {
		return NextResponse.json({ error: 'Слишком много запросов' }, { status: 429 })
	}
	let body: { quiz?: unknown; code?: unknown; durationSec?: unknown }
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
	}
	const quiz = typeof body.quiz === 'string' ? getQuiz(body.quiz) : undefined
	const answers = quiz && typeof body.code === 'string' ? decodeAnswers(quiz, body.code) : null
	if (!quiz || !answers) return NextResponse.json({ error: 'Неизвестный тест или код' }, { status: 400 })

	const duration = typeof body.durationSec === 'number' && body.durationSec > 0 && body.durationSec < 6 * 3600
		? Math.round(body.durationSec)
		: null
	try {
		await saveResult({
			quiz: quiz.slug,
			kind: quiz.kind,
			metrics: computeMetrics(quiz, answers),
			code: body.code as string,
			durationSec: duration
		})
		return NextResponse.json({ ok: true })
	} catch (error) {
		if (!isDbUnavailableError(error)) console.error('results: ошибка записи', error)
		return NextResponse.json({ ok: false }, { status: 503 })
	}
}
