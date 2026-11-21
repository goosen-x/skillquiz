/**
 * Блоки экрана результата. Блок — это тип + данные, ровно те, что нужны его
 * компоненту (components/quiz/result/blocks) и PDF-рендеру (lib/quiz/pdf.ts).
 * Оба рендера делают исчерпывающий switch по `type`: новый блок без
 * отрисовки на экране или в PDF не соберётся.
 *
 * Данные блоков строит движок (lib/quiz/engine.ts) из ответов и описания
 * теста. Блок попадает в результат только с полными данными: шаблон вида
 * перечисляет блоки, а строитель каждого блока возвращает данные, не null.
 */

import type { Tone, QuizKind } from './types'

export interface HeroData {
	/** Надпись над итогом: «Ваш темперамент», «Уровень стресса» */
	eyebrow: string
	/** Главное: тип, уровень, «18 из 20» */
	title: string
	/** Крупная цифра рядом с итогом, если она есть у вида: «72%», «4,5 мес.» */
	value: string | null
	/** Одна фраза-вывод */
	summary: string
	tone: Tone
}

export interface GaugeData {
	label: string
	/** Положение маркера, 0–100 */
	percent: number
	/** Подпись значения: «42 из 75 баллов», «72%» */
	valueLabel: string
	segments: Array<{ label: string; from: number; to: number; tone: Tone; active: boolean }>
	lowLabel: string
	highLabel: string
}

export interface ScaleChartData {
	title: string
	/** Радар для 5 и более шкал, иначе столбцы */
	chart: 'bars' | 'radar'
	items: Array<{
		id: string
		label: string
		/** 0–100 */
		percent: number
		/** Подпись уровня по шкале: «Высокий» */
		level: string
	}>
}

export interface ScaleDetailsData {
	title: string
	items: Array<{ id: string; label: string; percent: number; level: string; text: string }>
}

export interface TextData {
	title: string
	paragraphs: string[]
}

export interface ListData {
	title: string
	items: string[]
}

export interface StrengthsData {
	strengths: string[]
	growth: string[]
}

export interface SecondaryData {
	title: string
	typeTitle: string
	text: string
	percent: number
}

/**
 * Сравнение с другими. Сами проценты приходят с сервера (/api/stats) уже на
 * странице: в данных блока только то, что нужно для запроса и для честного
 * запасного ответа, пока прохождений мало.
 */
export interface ComparisonData {
	quiz: string
	kind: QuizKind
	/** Что сравниваем: для числовых метрик — ключ и значение, для типологий — тип */
	metrics: Array<{ key: string; label: string; value: number }>
	type: { id: string; title: string } | null
	/** Ориентировочное распределение (при случайных ответах), до 30 прохождений */
	baseline: Array<{ key: string; percentile: number }>
	/** Для типологий: доля типа при случайных ответах */
	baselineTypeShare: number | null
}

export interface AnswerReviewData {
	correctCount: number
	total: number
	items: Array<{
		n: number
		question: string
		yourAnswer: string
		correctAnswer: string
		correct: boolean
		explanation: string
	}>
}

export interface BreakdownData {
	title: string
	items: Array<{ label: string; value: string }>
}

export interface DisclaimerData {
	kind: 'psychology' | 'finance'
	/** Уровень требует совета обратиться к специалисту */
	seekHelp: boolean
}

export type ResultBlock =
	| { type: 'hero'; data: HeroData }
	| { type: 'gauge'; data: GaugeData }
	| { type: 'scaleChart'; data: ScaleChartData }
	| { type: 'scaleDetails'; data: ScaleDetailsData }
	| { type: 'text'; data: TextData }
	| { type: 'list'; data: ListData }
	| { type: 'strengths'; data: StrengthsData }
	| { type: 'recommendations'; data: ListData }
	| { type: 'secondary'; data: SecondaryData }
	| { type: 'comparison'; data: ComparisonData }
	| { type: 'answerReview'; data: AnswerReviewData }
	| { type: 'breakdown'; data: BreakdownData }
	| { type: 'disclaimer'; data: DisclaimerData }

export type BlockType = ResultBlock['type']

export type BlockOf<T extends BlockType> = Extract<ResultBlock, { type: T }>

/** Результат прохождения: всё, что нужно экрану, PDF и статистике */
export interface QuizResult {
	quiz: string
	kind: QuizKind
	title: string
	/** Блоки в порядке шаблона */
	blocks: ResultBlock[]
	/** Что сохраняем анонимно для сравнения: только числа и id типа */
	metrics: {
		main: number | null
		scales: Record<string, number>
		type: string | null
	}
}
