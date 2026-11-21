/**
 * Каталог для серверных страниц. Клиентские компоненты получают только
 * карточки (QuizCard) или вопросы конкретного теста, а не весь реестр
 * с интерпретациями, чтобы не раздувать бандл.
 */

import { QUIZZES } from '@/content/quizzes'
import { CATEGORIES, CATEGORY_IDS, type CategoryId } from './categories'
import type { AnyQuiz, QuizKind } from './types'

export interface QuizCard {
	slug: string
	title: string
	question: string
	summary: string
	category: CategoryId
	categoryTitle: string
	minutes: number
	questions: number
	kind: QuizKind
	published: string
}

export const KIND_LABELS: Record<QuizKind, string> = {
	level: 'Уровень',
	index: 'Индекс',
	profile: 'Профиль',
	typology: 'Тип',
	knowledge: 'Знания',
	calculator: 'Расчёт'
}

export function getAllQuizzes(): AnyQuiz[] {
	return QUIZZES
}

export function getQuiz(slug: string): AnyQuiz | undefined {
	return QUIZZES.find(q => q.slug === slug)
}

export function toCard(q: AnyQuiz): QuizCard {
	return {
		slug: q.slug,
		title: q.title,
		question: q.question,
		summary: q.summary,
		category: q.category,
		categoryTitle: CATEGORIES[q.category].title,
		minutes: q.minutes,
		questions: q.questions.length,
		kind: q.kind,
		published: q.published
	}
}

export function getCards(): QuizCard[] {
	return QUIZZES.map(toCard)
}

export function getCategoriesWithCounts() {
	return CATEGORY_IDS.map(id => ({
		id,
		...CATEGORIES[id],
		count: QUIZZES.filter(q => q.category === id).length
	})).filter(c => c.count > 0)
}

export function getCardsByCategory(category: CategoryId): QuizCard[] {
	return QUIZZES.filter(q => q.category === category).map(toCard)
}

/** Похожие: сначала явные related, потом из той же категории */
export function getRelatedCards(quiz: AnyQuiz, limit = 4): QuizCard[] {
	const picked: AnyQuiz[] = []
	for (const slug of quiz.related) {
		const q = getQuiz(slug)
		if (q && !picked.includes(q)) picked.push(q)
	}
	for (const q of QUIZZES) {
		if (picked.length >= limit) break
		if (q.slug !== quiz.slug && q.category === quiz.category && !picked.includes(q)) picked.push(q)
	}
	return picked.slice(0, limit).map(toCard)
}

/** Популярные для главной: ручной порядок, остальное по дате */
const FEATURED = [
	'personality-type',
	'temperament',
	'stress-level',
	'attachment-style',
	'emotional-intelligence',
	'love-language',
	'introvert-extrovert',
	'financial-literacy'
]

export function getFeaturedCards(limit = 8): QuizCard[] {
	const featured = FEATURED.map(getQuiz).filter((q): q is AnyQuiz => Boolean(q))
	const rest = QUIZZES.filter(q => !featured.includes(q))
	return [...featured, ...rest].slice(0, limit).map(toCard)
}

/** Только то, что нужно экрану вопросов в браузере */
export interface RunnerQuiz {
	slug: string
	title: string
	question: string
	minutes: number
	learn: string[]
	kind: QuizKind
	questions: Array<{ text: string; options: string[] }>
}

export function toRunner(q: AnyQuiz): RunnerQuiz {
	return {
		slug: q.slug,
		title: q.title,
		question: q.question,
		minutes: q.minutes,
		learn: q.learn,
		kind: q.kind,
		questions: q.questions.map(question => ({
			text: question.text,
			options: question.options.map(o => (typeof o === 'string' ? o : o.text))
		}))
	}
}
