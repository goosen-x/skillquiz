import { NextRequest, NextResponse } from 'next/server'
import { getQuiz } from '@/lib/quiz/catalog'
import { decodeAnswers } from '@/lib/quiz/codec'
import { computeMetrics } from '@/lib/quiz/engine'
import { getStats, isDbUnavailableError } from '@/lib/quiz/stats'

/** Сравнение результата (по коду ответов) с другими прошедшими */
export async function GET(request: NextRequest) {
	const slug = request.nextUrl.searchParams.get('quiz') ?? ''
	const code = request.nextUrl.searchParams.get('code') ?? ''
	const quiz = getQuiz(slug)
	const answers = quiz ? decodeAnswers(quiz, code) : null
	if (!quiz || !answers) return NextResponse.json({ error: 'Неизвестный тест или код' }, { status: 400 })
	try {
		const stats = await getStats(quiz.slug, computeMetrics(quiz, answers))
		return NextResponse.json(stats, { headers: { 'Cache-Control': 'private, max-age=60' } })
	} catch (error) {
		if (!isDbUnavailableError(error)) console.error('stats: ошибка чтения', error)
		return NextResponse.json({ count: 0, reliable: false, percentiles: {}, typeShare: null, offline: true })
	}
}
