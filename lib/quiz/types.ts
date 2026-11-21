/**
 * Модель данных тестов SkillQuiz.
 *
 * Каждый тест описывается одним объектом с дискриминантом `kind`. У каждого
 * вида своя форма вопросов, правил подсчёта и содержания результата, поэтому
 * тест одного вида не может описать поля другого: TypeScript не пропустит
 * лишний ключ в литерале, а zod-схема (lib/quiz/schema.ts) отбросит его при
 * проверке в юнит-тестах и перед сборкой.
 *
 * Идентификаторы шкал, типов и диапазонов — дженерики. Отсюда главное
 * свойство: `Record<S, ...>` требует описания для каждой шкалы, а баллы в
 * вариантах ответа можно начислить только существующей шкале.
 *
 * Подробности и таблица видов: docs/quiz-architecture.md.
 */

import type { CategoryId } from './categories'

/* ------------------------------------------------------------------ */
/* Общие части                                                         */
/* ------------------------------------------------------------------ */

export type QuizKind =
	| 'level'
	| 'index'
	| 'profile'
	| 'typology'
	| 'knowledge'
	| 'calculator'

/** Тон диапазона: определяет цвет итога и шкалы, а не текст */
export type Tone = 'good' | 'neutral' | 'warn' | 'alert'

/** Какую оговорку показать под результатом. У тестов на знания её нет */
export type DisclaimerKind = 'psychology' | 'finance'

export interface FaqItem {
	q: string
	a: string
}

/** Поля, общие для всех видов: витрина, SEO и стартовый экран */
export interface QuizMeta {
	/** Адрес страницы /tests/<slug>, латиница и дефисы */
	slug: string
	/** Название теста, оно же H1: «Тест на уровень стресса» */
	title: string
	/** Заголовок-вопрос на стартовом экране: «Сколько стресса вы сейчас несёте?» */
	question: string
	/** Короткое описание для карточки в каталоге (1–2 предложения) */
	summary: string
	seo: {
		/** title страницы, до 70 знаков */
		title: string
		/** meta description, 120–170 знаков */
		description: string
	}
	category: CategoryId
	/** Ориентировочное время прохождения, минут */
	minutes: number
	/** «После прохождения вы узнаете»: 3–5 пунктов */
	learn: string[]
	/** Вводный текст на странице теста, абзацы */
	intro: string[]
	/** На чём основан тест и как считается результат */
	method: string
	faq: FaqItem[]
	/** Слаги похожих тестов для перелинковки */
	related: string[]
	/** Дата публикации, YYYY-MM-DD */
	published: string
}

/* ------------------------------------------------------------------ */
/* Шкалы и диапазоны                                                   */
/* ------------------------------------------------------------------ */

/**
 * Отрезок шкалы. Все отрезки полуоткрытые [from, to), последний включает
 * правый край. Отрезки идут подряд без дыр и перекрытий: первый начинается
 * с минимума шкалы, последний заканчивается максимумом, следующий начинается
 * ровно там, где закончился предыдущий. Шкалы, уровни level/index/knowledge —
 * в процентах 0–100, у calculator — в единицах показателя.
 */
export interface Range {
	from: number
	to: number
}

/** Интерпретация отрезка шкалы в процентах (0–100) */
export interface PercentBand extends Range {
	/** Короткое имя уровня: «Высокий», «Средний» */
	label: string
	/** Что значит такой уровень именно по этой шкале, 1–3 предложения */
	text: string
}

/** Шкала многошкальных тестов (index, profile, knowledge-темы) */
export interface ScaleDef {
	/** Название в именительном падеже: «Самоконтроль» */
	label: string
	/** Что измеряет шкала, одно предложение */
	description: string
	/** Подписи краёв шкалы для диаграммы */
	lowLabel: string
	highLabel: string
	/** Интерпретация по уровням, покрывает 0–100 без дыр */
	bands: PercentBand[]
	/** Как звучит шкала, если она среди самых сильных */
	strength: string
	/** Как звучит шкала, если она среди самых слабых */
	growth: string
	/** Советы, если шкала проседает: 2–4 пункта */
	tips: string[]
	/**
	 * Направление шкалы. По умолчанию «выше — лучше». Для шкал-симптомов
	 * (тревога, страх ошибок) укажите 'higher-worse': тогда в сильные стороны
	 * попадут шкалы с низким значением, а в зоны роста и советы — с высоким.
	 */
	direction?: 'higher-worse'
}

/** Итоговый уровень с полным содержанием (level, index, knowledge, calculator) */
export interface OutcomeBand extends Range {
	title: string
	/** Одна фраза под итогом */
	summary: string
	/** Подробное описание, абзацы */
	description: string[]
	recommendations: string[]
	tone: Tone
	/** Показать под результатом совет обратиться к специалисту */
	seekHelp?: true
}

/** Полное содержание уровня для одношкальных тестов */
export interface LevelBand extends OutcomeBand {
	strengths: string[]
	growth: string[]
}

/* ------------------------------------------------------------------ */
/* Переопределение шаблона                                              */
/* ------------------------------------------------------------------ */

/**
 * Дополнительный блок-список, который тест может добавить к шаблону своего
 * вида. Данные лежат прямо в записи и заданы для каждого ключа (типа,
 * уровня, шкалы), поэтому блок не может оказаться пустым ни при каком исходе.
 */
export interface ExtraList<K extends string, Slot extends string> {
	/** Заголовок блока: «Подходящие профессии» */
	title: string
	/** Вставить после слота шаблона */
	after: Slot
	items: Record<K, string[]>
}

/**
 * Явное переопределение шаблона у конкретного теста: убрать блоки и
 * добавить списки. Убрать можно только блоки без собственного текста
 * (сравнение, шкала, диаграмма): блок с содержанием убрать нельзя, иначе
 * его тексты в описании теста станут лишними данными.
 */
export interface TemplateOverride<
	Omittable extends string,
	K extends string,
	Slot extends string
> {
	omit?: Omittable[]
	add?: ExtraList<K, Slot>[]
}

/* Слоты шаблонов по видам. Порядок и состав — в lib/quiz/templates.ts */
export type LevelSlot =
	| 'hero'
	| 'gauge'
	| 'comparison'
	| 'description'
	| 'strengths'
	| 'recommendations'
	| 'disclaimer'
export type IndexSlot =
	| 'hero'
	| 'gauge'
	| 'scaleChart'
	| 'scaleDetails'
	| 'comparison'
	| 'description'
	| 'strengths'
	| 'recommendations'
	| 'disclaimer'
export type ProfileSlot =
	| 'hero'
	| 'scaleChart'
	| 'scaleDetails'
	| 'strengths'
	| 'recommendations'
	| 'comparison'
	| 'disclaimer'
export type TypologySlot =
	| 'hero'
	| 'typeChart'
	| 'description'
	| 'traits'
	| 'strengths'
	| 'secondary'
	| 'recommendations'
	| 'comparison'
	| 'disclaimer'
export type KnowledgeSlot =
	| 'hero'
	| 'gauge'
	| 'description'
	| 'comparison'
	| 'topics'
	| 'strengths'
	| 'answerReview'
	| 'recommendations'
export type CalculatorSlot =
	| 'hero'
	| 'breakdown'
	| 'gauge'
	| 'description'
	| 'recommendations'
	| 'comparison'
	| 'disclaimer'

/* ------------------------------------------------------------------ */
/* level: одна шкала, сумма баллов → уровень                            */
/* ------------------------------------------------------------------ */

export interface ScoredOption {
	text: string
	/** Баллы за вариант, целое число ≥ 0 */
	score: number
}

export interface LevelQuestion {
	text: string
	options: ScoredOption[]
}

export type LevelOmittable = 'comparison' | 'gauge'

export interface LevelQuiz<B extends string = string> extends QuizMeta {
	kind: 'level'
	disclaimer: DisclaimerKind
	/** Что измеряем: «Уровень стресса» */
	scale: { label: string; lowLabel: string; highLabel: string }
	questions: LevelQuestion[]
	/** Уровни по проценту от максимума суммы (0–100). Ключ — id уровня */
	bands: Record<B, LevelBand>
	template?: TemplateOverride<LevelOmittable, B, LevelSlot>
}

/* ------------------------------------------------------------------ */
/* Варианты с баллами по шкалам (index, profile, typology)              */
/* ------------------------------------------------------------------ */

export interface PointsOption<S extends string> {
	text: string
	/** Баллы шкалам/типам. Хотя бы одна запись; значения — целые ≥ 0 */
	points: Partial<Record<S, number>>
}

export interface PointsQuestion<S extends string> {
	text: string
	options: PointsOption<S>[]
}

/* ------------------------------------------------------------------ */
/* index: несколько шкал-компонентов + общий индекс                     */
/* ------------------------------------------------------------------ */

export type IndexOmittable = 'comparison' | 'gauge' | 'scaleChart'

export interface IndexQuiz<S extends string = string, B extends string = string>
	extends QuizMeta {
	kind: 'index'
	disclaimer: DisclaimerKind
	/** Название общего показателя: «Эмоциональный интеллект» */
	indexLabel: string
	scales: Record<S, ScaleDef>
	questions: PointsQuestion<S>[]
	/** Уровни общего индекса в процентах 0–100 */
	bands: Record<B, OutcomeBand>
	template?: TemplateOverride<IndexOmittable, B, IndexSlot>
}

/* ------------------------------------------------------------------ */
/* profile: независимые шкалы без общего балла (Большая пятёрка)        */
/* ------------------------------------------------------------------ */

export type ProfileOmittable = 'comparison'

export interface ProfileQuiz<S extends string = string> extends QuizMeta {
	kind: 'profile'
	disclaimer: DisclaimerKind
	/** Как называть результат: «Ваш профиль личности» */
	profileLabel: string
	/** Вступление к итогу, одна фраза без привязки к шкалам */
	profileSummary: string
	scales: Record<S, ScaleDef>
	questions: PointsQuestion<S>[]
	template?: TemplateOverride<ProfileOmittable, S, ProfileSlot>
}

/* ------------------------------------------------------------------ */
/* typology: тип по максимальной шкале                                   */
/* ------------------------------------------------------------------ */

export interface TypeDef {
	/** Название типа: «Сангвиник» */
	title: string
	/** Подзаголовок: «Энергичный и общительный» */
	tagline: string
	description: string[]
	traits: string[]
	strengths: string[]
	growth: string[]
	recommendations: string[]
	/** Короткое описание для блока «второй тип», 1–2 предложения */
	secondary: string
	/** Показать под результатом совет обратиться к специалисту */
	seekHelp?: true
}

export type TypologyOmittable = 'comparison' | 'typeChart'

export interface TypologyQuiz<T extends string = string> extends QuizMeta {
	kind: 'typology'
	disclaimer: DisclaimerKind
	/** Как называть итог: «Ваш темперамент» */
	typeLabel: string
	types: Record<T, TypeDef>
	questions: PointsQuestion<T>[]
	/**
	 * Порядок при равенстве баллов: побеждает тип, который стоит раньше.
	 * Должен перечислять все типы.
	 */
	tieOrder: T[]
	template?: TemplateOverride<TypologyOmittable, T, TypologySlot>
}

/* ------------------------------------------------------------------ */
/* knowledge: правильные ответы, процент верных                         */
/* ------------------------------------------------------------------ */

export interface KnowledgeQuestion<Tp extends string> {
	text: string
	options: string[]
	/** Индекс правильного варианта */
	correct: number
	/** Разбор: почему верен именно этот ответ */
	explanation: string
	topic: Tp
}

export type KnowledgeOmittable = 'comparison' | 'topics'

export interface KnowledgeTopic {
	label: string
	strength: string
	growth: string
}

export interface KnowledgeQuiz<Tp extends string = string, B extends string = string>
	extends QuizMeta {
	kind: 'knowledge'
	topics: Record<Tp, KnowledgeTopic>
	questions: KnowledgeQuestion<Tp>[]
	/** Уровни по проценту верных ответов */
	bands: Record<B, OutcomeBand>
	template?: TemplateOverride<KnowledgeOmittable, B, KnowledgeSlot>
}

/* ------------------------------------------------------------------ */
/* calculator: ответы задают переменные, формула считает показатель     */
/* ------------------------------------------------------------------ */

export interface ValueOption {
	text: string
	/** Значение переменной при выборе варианта */
	value: number
}

export interface CalculatorQuestion<V extends string> {
	text: string
	variable: V
	options: ValueOption[]
}

export interface CalculatorPart<V extends string> {
	label: string
	unit: string
	compute: (v: Record<V, number>) => number
}

export type CalculatorOmittable = 'comparison' | 'gauge'

export interface CalculatorQuiz<V extends string = string, B extends string = string>
	extends QuizMeta {
	kind: 'calculator'
	disclaimer: DisclaimerKind
	metric: {
		label: string
		unit: string
		/** Минимум и максимум, которые формула может выдать при любых ответах */
		min: number
		max: number
		/** Знаков после запятой при выводе */
		digits: number
		compute: (v: Record<V, number>) => number
	}
	questions: CalculatorQuestion<V>[]
	/** Составные части расчёта для блока «Из чего складывается» */
	breakdown: CalculatorPart<V>[]
	/** Уровни по значению показателя, покрывают [metric.min, metric.max] */
	bands: Record<B, OutcomeBand>
	template?: TemplateOverride<CalculatorOmittable, B, CalculatorSlot>
}

/* ------------------------------------------------------------------ */

export type AnyQuiz =
	| LevelQuiz
	| IndexQuiz
	| ProfileQuiz
	| TypologyQuiz
	| KnowledgeQuiz
	| CalculatorQuiz

/** Ответы: индекс выбранного варианта по каждому вопросу */
export type Answers = number[]
