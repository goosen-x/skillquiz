/**
 * Схемы проверки. Две группы:
 *  - quizSchema — описание теста. Все объекты .strict(): лишний ключ
 *    (например, поле чужого вида) — ошибка, а не молча проигнорированное поле.
 *  - blockSchema — данные каждого блока результата: никаких пустых строк,
 *    NaN, undefined и пустых списков.
 *
 * Гоняются в юнит-тестах (test/quiz/*.test.ts) и перед сборкой
 * (scripts/validate-quizzes.ts).
 */

import { z } from 'zod'
import { CATEGORY_IDS, type CategoryId } from './categories'
import { TEMPLATES } from './templates'

const BAD_TEXT = /undefined|NaN|\[object Object\]|\bnull\b/

export const text = z
	.string()
	.trim()
	.min(2, 'пустая или слишком короткая строка')
	.refine(s => !BAD_TEXT.test(s), 'в тексте undefined/NaN/null/[object Object]')

const texts = (min = 1) => z.array(text).min(min, `нужно минимум ${min}`)

const finite = z.number().finite()
const percent = finite.min(0).max(100)
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'слаг: латиница, цифры, дефисы')
const id = z.string().regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, 'id: латиница без пробелов')

const tone = z.enum(['good', 'neutral', 'warn', 'alert'])
const disclaimer = z.enum(['psychology', 'finance'])

const range = { from: finite, to: finite }

const percentBand = z.object({ ...range, label: text, text }).strict()

const scaleDef = z
	.object({
		label: text,
		description: text,
		lowLabel: text,
		highLabel: text,
		bands: z.array(percentBand).min(2),
		strength: text,
		growth: text,
		tips: texts(2),
		direction: z.literal('higher-worse').optional()
	})
	.strict()

const outcomeShape = {
	...range,
	title: text,
	summary: text,
	description: texts(1),
	recommendations: texts(3),
	tone,
	seekHelp: z.literal(true).optional()
}
const outcomeBand = z.object(outcomeShape).strict()
const levelBand = z.object({ ...outcomeShape, strengths: texts(2), growth: texts(2) }).strict()

const meta = {
	slug,
	title: text,
	question: text,
	summary: text,
	seo: z
		.object({
			title: text.pipe(z.string().max(75, 'title длиннее 75 знаков')),
			description: z.string().min(90, 'description короче 90 знаков').max(180, 'description длиннее 180 знаков')
		})
		.strict(),
	category: z.enum(CATEGORY_IDS as [CategoryId, ...CategoryId[]]),
	minutes: z.number().int().min(1).max(30),
	learn: texts(3).max(6),
	intro: texts(1),
	method: text,
	faq: z.array(z.object({ q: text, a: text }).strict()).min(3),
	related: z.array(slug).min(2),
	published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
}

function templateSchema(omittable: [string, ...string[]], slots: readonly string[]) {
	return z
		.object({
			omit: z.array(z.enum(omittable)).optional(),
			add: z
				.array(
					z
						.object({
							title: text,
							after: z.enum(slots as [string, ...string[]]),
							items: z.record(id, texts(2))
						})
						.strict()
				)
				.optional()
		})
		.strict()
		.optional()
}

const pointsQuestion = z
	.object({
		text,
		options: z
			.array(
				z
					.object({
						text,
						points: z.record(id, z.number().int().min(0).max(10))
					})
					.strict()
			)
			.min(2)
			.max(7)
	})
	.strict()

const levelQuiz = z
	.object({
		...meta,
		kind: z.literal('level'),
		disclaimer,
		scale: z.object({ label: text, lowLabel: text, highLabel: text }).strict(),
		questions: z
			.array(
				z
					.object({
						text,
						options: z
							.array(z.object({ text, score: z.number().int().min(0).max(10) }).strict())
							.min(2)
							.max(7)
					})
					.strict()
			)
			.min(5),
		bands: z.record(id, levelBand),
		template: templateSchema(['comparison', 'gauge'], TEMPLATES.level)
	})
	.strict()

const indexQuiz = z
	.object({
		...meta,
		kind: z.literal('index'),
		disclaimer,
		indexLabel: text,
		scales: z.record(id, scaleDef),
		questions: z.array(pointsQuestion).min(5),
		bands: z.record(id, outcomeBand),
		template: templateSchema(['comparison', 'gauge', 'scaleChart'], TEMPLATES.index)
	})
	.strict()

const profileQuiz = z
	.object({
		...meta,
		kind: z.literal('profile'),
		disclaimer,
		profileLabel: text,
		profileSummary: text,
		scales: z.record(id, scaleDef),
		questions: z.array(pointsQuestion).min(5),
		template: templateSchema(['comparison'], TEMPLATES.profile)
	})
	.strict()

const typeDef = z
	.object({
		title: text,
		tagline: text,
		description: texts(1),
		traits: texts(3),
		strengths: texts(2),
		growth: texts(2),
		recommendations: texts(3),
		secondary: text,
		seekHelp: z.literal(true).optional()
	})
	.strict()

const typologyQuiz = z
	.object({
		...meta,
		kind: z.literal('typology'),
		disclaimer,
		typeLabel: text,
		types: z.record(id, typeDef),
		questions: z.array(pointsQuestion).min(5),
		tieOrder: z.array(id).min(2),
		template: templateSchema(['comparison', 'typeChart'], TEMPLATES.typology)
	})
	.strict()

const knowledgeQuiz = z
	.object({
		...meta,
		kind: z.literal('knowledge'),
		topics: z.record(id, z.object({ label: text, strength: text, growth: text }).strict()),
		questions: z
			.array(
				z
					.object({
						text,
						options: z.array(text).min(2).max(6),
						correct: z.number().int().min(0),
						explanation: text,
						topic: id
					})
					.strict()
			)
			.min(5),
		bands: z.record(id, outcomeBand),
		template: templateSchema(['comparison', 'topics'], TEMPLATES.knowledge)
	})
	.strict()

const fn = z.custom<(...args: never[]) => unknown>(v => typeof v === 'function', 'нужна функция')

const calculatorQuiz = z
	.object({
		...meta,
		kind: z.literal('calculator'),
		disclaimer,
		metric: z
			.object({
				label: text,
				unit: z.string(),
				min: finite,
				max: finite,
				digits: z.number().int().min(0).max(2),
				compute: fn
			})
			.strict(),
		questions: z
			.array(
				z
					.object({
						text,
						variable: id,
						options: z.array(z.object({ text, value: finite }).strict()).min(2).max(7)
					})
					.strict()
			)
			.min(3),
		breakdown: z.array(z.object({ label: text, unit: z.string(), compute: fn }).strict()).min(1),
		bands: z.record(id, outcomeBand),
		template: templateSchema(['comparison', 'gauge'], TEMPLATES.calculator)
	})
	.strict()

export const quizSchema = z.discriminatedUnion('kind', [
	levelQuiz,
	indexQuiz,
	profileQuiz,
	typologyQuiz,
	knowledgeQuiz,
	calculatorQuiz
])

/* ------------------------------------------------------------------ */
/* Блоки результата                                                     */
/* ------------------------------------------------------------------ */

const heroData = z
	.object({ eyebrow: text, title: text, value: text.nullable(), summary: text, tone })
	.strict()

const gaugeData = z
	.object({
		label: text,
		percent,
		valueLabel: text,
		segments: z
			.array(z.object({ label: text, from: percent, to: percent, tone, active: z.boolean() }).strict())
			.min(2)
			.refine(s => s.filter(x => x.active).length === 1, 'активен ровно один отрезок'),
		lowLabel: text,
		highLabel: text
	})
	.strict()

const scaleItem = { id, label: text, percent, level: text }

const scaleChartData = z
	.object({
		title: text,
		chart: z.enum(['bars', 'radar']),
		items: z.array(z.object(scaleItem).strict()).min(2)
	})
	.strict()

const scaleDetailsData = z
	.object({ title: text, items: z.array(z.object({ ...scaleItem, text }).strict()).min(2) })
	.strict()

const textData = z.object({ title: text, paragraphs: texts(1) }).strict()
const listData = z.object({ title: text, items: texts(1) }).strict()
const strengthsData = z.object({ strengths: texts(1), growth: texts(1) }).strict()
const secondaryData = z.object({ title: text, typeTitle: text, text, percent }).strict()

const comparisonData = z
	.object({
		quiz: slug,
		kind: z.enum(['level', 'index', 'profile', 'typology', 'knowledge', 'calculator']),
		metrics: z.array(z.object({ key: id, label: text, value: finite }).strict()),
		type: z.object({ id, title: text }).strict().nullable(),
		baseline: z.array(z.object({ key: id, percentile: percent }).strict()),
		baselineTypeShare: percent.nullable()
	})
	.strict()
	.refine(d => d.metrics.length > 0 || d.type !== null, 'сравнивать нечего')
	.refine(d => d.baseline.length === d.metrics.length, 'нет ориентира для метрики')
	.refine(d => (d.type === null) === (d.baselineTypeShare === null), 'тип без ориентира')

const answerReviewData = z
	.object({
		correctCount: z.number().int().min(0),
		total: z.number().int().min(1),
		items: z
			.array(
				z
					.object({
						n: z.number().int().min(1),
						question: text,
						yourAnswer: text,
						correctAnswer: text,
						correct: z.boolean(),
						explanation: text
					})
					.strict()
			)
			.min(1)
	})
	.strict()

const breakdownData = z
	.object({ title: text, items: z.array(z.object({ label: text, value: text }).strict()).min(1) })
	.strict()

const disclaimerData = z.object({ kind: disclaimer, seekHelp: z.boolean() }).strict()

export const blockSchema = z.discriminatedUnion('type', [
	z.object({ type: z.literal('hero'), data: heroData }).strict(),
	z.object({ type: z.literal('gauge'), data: gaugeData }).strict(),
	z.object({ type: z.literal('scaleChart'), data: scaleChartData }).strict(),
	z.object({ type: z.literal('scaleDetails'), data: scaleDetailsData }).strict(),
	z.object({ type: z.literal('text'), data: textData }).strict(),
	z.object({ type: z.literal('list'), data: listData }).strict(),
	z.object({ type: z.literal('strengths'), data: strengthsData }).strict(),
	z.object({ type: z.literal('recommendations'), data: listData }).strict(),
	z.object({ type: z.literal('secondary'), data: secondaryData }).strict(),
	z.object({ type: z.literal('comparison'), data: comparisonData }).strict(),
	z.object({ type: z.literal('answerReview'), data: answerReviewData }).strict(),
	z.object({ type: z.literal('breakdown'), data: breakdownData }).strict(),
	z.object({ type: z.literal('disclaimer'), data: disclaimerData }).strict()
])
