/**
 * Шаблоны результата по видам: упорядоченный список слотов. Слот — место в
 * результате; какой блок и с какими данными в нём окажется, решает строитель
 * слота в lib/quiz/engine.ts. Тест может убрать слот из списка разрешённых
 * (template.omit) или добавить блок-список (template.add), см. types.ts.
 */

import type {
	CalculatorSlot,
	IndexSlot,
	KnowledgeSlot,
	LevelSlot,
	ProfileSlot,
	QuizKind,
	TypologySlot
} from './types'

/** Проверка на этапе компиляции: в шаблоне перечислены все слоты вида */
type Exhaustive<All extends string, Listed extends readonly string[]> =
	Exclude<All, Listed[number]> extends never ? Listed : never

const level = [
	'hero',
	'gauge',
	'comparison',
	'description',
	'strengths',
	'recommendations',
	'disclaimer'
] as const
const index = [
	'hero',
	'gauge',
	'scaleChart',
	'comparison',
	'description',
	'scaleDetails',
	'strengths',
	'recommendations',
	'disclaimer'
] as const
const profile = [
	'hero',
	'scaleChart',
	'comparison',
	'scaleDetails',
	'strengths',
	'recommendations',
	'disclaimer'
] as const
const typology = [
	'hero',
	'typeChart',
	'comparison',
	'description',
	'traits',
	'strengths',
	'secondary',
	'recommendations',
	'disclaimer'
] as const
const knowledge = [
	'hero',
	'gauge',
	'description',
	'comparison',
	'topics',
	'strengths',
	'recommendations',
	'answerReview'
] as const
const calculator = [
	'hero',
	'breakdown',
	'gauge',
	'comparison',
	'description',
	'recommendations',
	'disclaimer'
] as const

export const TEMPLATES: {
	level: Exhaustive<LevelSlot, typeof level>
	index: Exhaustive<IndexSlot, typeof index>
	profile: Exhaustive<ProfileSlot, typeof profile>
	typology: Exhaustive<TypologySlot, typeof typology>
	knowledge: Exhaustive<KnowledgeSlot, typeof knowledge>
	calculator: Exhaustive<CalculatorSlot, typeof calculator>
} = { level, index, profile, typology, knowledge, calculator }

/** Человекочитаемые названия слотов для документации и ошибок проверки */
export const SLOT_TITLES: Record<string, string> = {
	hero: 'Итог',
	gauge: 'Шкала с отметкой',
	scaleChart: 'Диаграмма шкал',
	typeChart: 'Диаграмма типов',
	topics: 'Результат по темам',
	comparison: 'Сравнение с другими',
	description: 'Описание',
	scaleDetails: 'Разбор по шкалам',
	traits: 'Характерные черты',
	strengths: 'Сильные стороны и зоны роста',
	secondary: 'Второй тип',
	recommendations: 'Рекомендации',
	answerReview: 'Разбор ответов',
	breakdown: 'Из чего складывается',
	disclaimer: 'Оговорка'
}

export type AnyTemplate = (typeof TEMPLATES)[QuizKind]
