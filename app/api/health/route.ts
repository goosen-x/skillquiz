import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { getAllQuizzes } from '@/lib/quiz/catalog'

export const dynamic = 'force-dynamic'

/** Проверка здоровья для деплоя: приложение отвечает, тесты загружены, БД доступна */
export async function GET() {
	let db = 'ok'
	try {
		const pool = await getDb()
		await pool.query('SELECT 1')
	} catch {
		db = 'unavailable'
	}
	const quizzes = getAllQuizzes().length
	const ok = quizzes > 0 && db === 'ok'
	return NextResponse.json({ ok, quizzes, db, release: process.env.RELEASE_TAG ?? null }, { status: ok ? 200 : 503 })
}
