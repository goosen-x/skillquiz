/**
 * Конструкторы описаний тестов. Ничего не делают во время выполнения, нужны
 * для вывода типов: идентификаторы шкал, типов и уровней выводятся из
 * литерала, и TypeScript проверяет, что баллы начислены существующим шкалам,
 * а у каждой шкалы, типа и уровня есть описание.
 *
 *   export default defineTypologyQuiz({ kind: 'typology', ... })
 */

import type {
	CalculatorQuiz,
	IndexQuiz,
	KnowledgeQuiz,
	LevelQuestion,
	LevelQuiz,
	PointsQuestion,
	ProfileQuiz,
	TypologyQuiz
} from './types'

export function defineLevelQuiz<const B extends string>(quiz: LevelQuiz<B>): LevelQuiz<B> {
	return quiz
}

export function defineIndexQuiz<const S extends string, const B extends string>(
	quiz: IndexQuiz<S, B>
): IndexQuiz<S, B> {
	return quiz
}

export function defineProfileQuiz<const S extends string>(
	quiz: ProfileQuiz<S>
): ProfileQuiz<S> {
	return quiz
}

export function defineTypologyQuiz<const T extends string>(
	quiz: TypologyQuiz<T>
): TypologyQuiz<T> {
	return quiz
}

export function defineKnowledgeQuiz<const Tp extends string, const B extends string>(
	quiz: KnowledgeQuiz<Tp, B>
): KnowledgeQuiz<Tp, B> {
	return quiz
}

export function defineCalculatorQuiz<const V extends string, const B extends string>(
	quiz: CalculatorQuiz<V, B>
): CalculatorQuiz<V, B> {
	return quiz
}

/* ------------------------------------------------------------------ */
/* Шкалы Лайкерта                                                      */
/* ------------------------------------------------------------------ */

/** Согласие с утверждением, от «совсем не про меня» до «точно про меня» */
export const AGREE_5 = [
	'Совсем не согласен',
	'Скорее не согласен',
	'Отчасти',
	'Скорее согласен',
	'Полностью согласен'
] as const

/** Частота */
export const FREQUENCY_5 = ['Никогда', 'Редко', 'Иногда', 'Часто', 'Почти всегда'] as const

export const FREQUENCY_4 = ['Никогда', 'Иногда', 'Часто', 'Почти всегда'] as const

/**
 * Вопрос-утверждение для многошкальных тестов: варианты дают шкале
 * 0…n−1 баллов, при reverse — наоборот.
 */
export function likert<S extends string>(
	scale: S,
	text: string,
	options: { reverse?: boolean; labels?: readonly string[] } = {}
): PointsQuestion<S> {
	const labels = options.labels ?? AGREE_5
	const last = labels.length - 1
	return {
		text,
		options: labels.map((label, i) => ({
			text: label,
			points: { [scale]: options.reverse ? last - i : i } as Partial<Record<S, number>>
		}))
	}
}

/** То же для одношкальных тестов (level) */
export function likertLevel(
	text: string,
	options: { reverse?: boolean; labels?: readonly string[] } = {}
): LevelQuestion {
	const labels = options.labels ?? AGREE_5
	const last = labels.length - 1
	return {
		text,
		options: labels.map((label, i) => ({
			text: label,
			score: options.reverse ? last - i : i
		}))
	}
}
