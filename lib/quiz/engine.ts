/**
 * Движок подсчёта. Чистые функции без React и браузера: одинаково работают
 * на сервере (страница результата, OG-картинка), в браузере (экран теста,
 * PDF) и в юнит-тестах.
 *
 *   score*  — ответы → числа (баллы, проценты, уровень/тип)
 *   build*  — числа + описание теста → блоки по шаблону вида
 */

import type {
	AnswerReviewData,
	ComparisonData,
	QuizResult,
	ResultBlock
} from './blocks'
import { TEMPLATES } from './templates'
import type {
	Answers,
	AnyQuiz,
	CalculatorQuiz,
	ExtraList,
	IndexQuiz,
	KnowledgeQuiz,
	LevelQuiz,
	OutcomeBand,
	PercentBand,
	PointsQuestion,
	ProfileQuiz,
	Range,
	ScaleDef,
	TypologyQuiz
} from './types'

/* ------------------------------------------------------------------ */
/* Общие помощники                                                      */
/* ------------------------------------------------------------------ */

export function formatNumber(value: number, digits = 0): string {
	return new Intl.NumberFormat('ru-RU', {
		minimumFractionDigits: 0,
		maximumFractionDigits: digits
	})
		.format(value)
		.replace(/ /g, ' ')
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

function toPercent(value: number, min: number, max: number): number {
	if (max <= min) return 0
	return clamp(((value - min) / (max - min)) * 100, 0, 100)
}

/** Отрезки по возрастанию; [from, to), последний включает правый край */
export function sortedRanges<K extends string, R extends Range>(
	bands: Record<K, R>
): Array<[K, R]> {
	return (Object.entries(bands) as Array<[K, R]>).sort((a, b) => a[1].from - b[1].from)
}

export function pickRange<K extends string, R extends Range>(
	bands: Record<K, R>,
	value: number
): [K, R] {
	const list = sortedRanges(bands)
	const last = list[list.length - 1]
	for (const entry of list) {
		const [, r] = entry
		if (value >= r.from && (value < r.to || (entry === last && value <= r.to))) {
			return entry
		}
	}
	// Значение вне покрытия возможно только при ошибке в описании теста;
	// проверка в юнит-тестах это ловит. Здесь прижимаем к краю.
	return value < list[0][1].from ? list[0] : last
}

function pickPercentBand(bands: PercentBand[], percent: number): PercentBand {
	const sorted = [...bands].sort((a, b) => a.from - b.from)
	const last = sorted[sorted.length - 1]
	for (const b of sorted) {
		if (percent >= b.from && (percent < b.to || (b === last && percent <= b.to))) return b
	}
	return percent < sorted[0].from ? sorted[0] : last
}

function assertAnswers(quiz: AnyQuiz, answers: Answers): void {
	if (answers.length !== quiz.questions.length) {
		throw new Error(
			`${quiz.slug}: ответов ${answers.length}, вопросов ${quiz.questions.length}`
		)
	}
	answers.forEach((a, i) => {
		const count = quiz.questions[i].options.length
		if (!Number.isInteger(a) || a < 0 || a >= count) {
			throw new Error(`${quiz.slug}: ответ ${a} на вопрос ${i + 1} вне 0…${count - 1}`)
		}
	})
}

const round = Math.round

/* ------------------------------------------------------------------ */
/* Подсчёт                                                              */
/* ------------------------------------------------------------------ */

export interface ScaleScore {
	id: string
	raw: number
	min: number
	max: number
	percent: number
}

/** Минимум и максимум, которые шкала может набрать за весь тест */
export function scaleBounds<S extends string>(
	questions: PointsQuestion<S>[],
	scale: S
): { min: number; max: number } {
	let min = 0
	let max = 0
	for (const q of questions) {
		const values = q.options.map(o => o.points[scale] ?? 0)
		min += Math.min(...values)
		max += Math.max(...values)
	}
	return { min, max }
}

function scoreScales<S extends string>(
	questions: PointsQuestion<S>[],
	scaleIds: S[],
	answers: Answers
): ScaleScore[] {
	return scaleIds.map(id => {
		let raw = 0
		questions.forEach((q, i) => {
			raw += q.options[answers[i]].points[id] ?? 0
		})
		const { min, max } = scaleBounds(questions, id)
		return { id, raw, min, max, percent: toPercent(raw, min, max) }
	})
}

export function scoreLevel(quiz: LevelQuiz, answers: Answers) {
	let score = 0
	let min = 0
	let max = 0
	quiz.questions.forEach((q, i) => {
		const values = q.options.map(o => o.score)
		score += q.options[answers[i]].score
		min += Math.min(...values)
		max += Math.max(...values)
	})
	const percent = toPercent(score, min, max)
	const [bandId, band] = pickRange(quiz.bands, percent)
	return { score: score - min, max: max - min, percent, bandId, band }
}

export function scoreIndex(quiz: IndexQuiz, answers: Answers) {
	const ids = Object.keys(quiz.scales)
	const scales = scoreScales(quiz.questions, ids, answers)
	const overall = scales.reduce((s, x) => s + x.percent, 0) / scales.length
	const [bandId, band] = pickRange(quiz.bands, overall)
	return { scales, overall, bandId, band }
}

export function scoreProfile(quiz: ProfileQuiz, answers: Answers) {
	const ids = Object.keys(quiz.scales)
	return { scales: scoreScales(quiz.questions, ids, answers) }
}

export function scoreTypology(quiz: TypologyQuiz, answers: Answers) {
	const totals: Record<string, number> = {}
	for (const id of quiz.tieOrder) totals[id] = 0
	quiz.questions.forEach((q, i) => {
		const points = q.options[answers[i]].points as Record<string, number | undefined>
		for (const [id, v] of Object.entries(points)) totals[id] += v ?? 0
	})
	const sum = Object.values(totals).reduce((a, b) => a + b, 0)
	const ranked = [...quiz.tieOrder]
		.map((id, order) => ({
			id,
			score: totals[id],
			percent: sum > 0 ? (totals[id] / sum) * 100 : 100 / quiz.tieOrder.length,
			order
		}))
		.sort((a, b) => b.score - a.score || a.order - b.order)
	return { ranked, primary: ranked[0], secondary: ranked[1] }
}

export function scoreKnowledge(quiz: KnowledgeQuiz, answers: Answers) {
	const perQuestion = quiz.questions.map((q, i) => answers[i] === q.correct)
	const correct = perQuestion.filter(Boolean).length
	const total = quiz.questions.length
	const percent = (correct / total) * 100
	const [bandId, band] = pickRange(quiz.bands, percent)
	const topics = Object.keys(quiz.topics).map(id => {
		const idx = quiz.questions.map((q, i) => (q.topic === id ? i : -1)).filter(i => i >= 0)
		const ok = idx.filter(i => perQuestion[i]).length
		return { id, correct: ok, total: idx.length, percent: idx.length ? (ok / idx.length) * 100 : 0 }
	})
	return { perQuestion, correct, total, percent, bandId, band, topics }
}

export function scoreCalculator(quiz: CalculatorQuiz, answers: Answers) {
	const vars: Record<string, number> = {}
	quiz.questions.forEach((q, i) => {
		vars[q.variable] = q.options[answers[i]].value
	})
	const value = clamp(quiz.metric.compute(vars), quiz.metric.min, quiz.metric.max)
	const [bandId, band] = pickRange(quiz.bands, value)
	return { vars, value, bandId, band }
}

/* ------------------------------------------------------------------ */
/* Метрики для сравнения и ориентировочное распределение                */
/* ------------------------------------------------------------------ */

export type Metrics = QuizResult['metrics']

export function computeMetrics(quiz: AnyQuiz, answers: Answers): Metrics {
	switch (quiz.kind) {
		case 'level': {
			const s = scoreLevel(quiz, answers)
			return { main: round(s.percent), scales: {}, type: null }
		}
		case 'index': {
			const s = scoreIndex(quiz, answers)
			return {
				main: round(s.overall),
				scales: Object.fromEntries(s.scales.map(x => [x.id, round(x.percent)])),
				type: null
			}
		}
		case 'profile': {
			const s = scoreProfile(quiz, answers)
			return {
				main: null,
				scales: Object.fromEntries(s.scales.map(x => [x.id, round(x.percent)])),
				type: null
			}
		}
		case 'typology': {
			const s = scoreTypology(quiz, answers)
			return {
				main: null,
				scales: Object.fromEntries(s.ranked.map(x => [x.id, round(x.percent)])),
				type: s.primary.id
			}
		}
		case 'knowledge': {
			const s = scoreKnowledge(quiz, answers)
			return {
				main: round(s.percent),
				scales: Object.fromEntries(s.topics.map(x => [x.id, round(x.percent)])),
				type: null
			}
		}
		case 'calculator': {
			const s = scoreCalculator(quiz, answers)
			return { main: s.value, scales: {}, type: null }
		}
	}
}

/** Детерминированный генератор: распределение одинаково на сервере и в браузере */
function mulberry32(seed: number) {
	let a = seed >>> 0
	return () => {
		a = (a + 0x6d2b79f5) >>> 0
		let t = a
		t = Math.imul(t ^ (t >>> 15), t | 1)
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

interface Baseline {
	values: Record<string, number[]>
	types: Record<string, number>
	samples: number
}

const BASELINE_SAMPLES = 2000
const baselineCache = new Map<string, Baseline>()

/**
 * Ориентировочное распределение: как распределились бы метрики, если бы на
 * каждый вопрос отвечали случайно. Это не статистика людей, и на экране это
 * так и подписано; нужно, чтобы до 30 настоящих прохождений сравнение было
 * хотя бы осмысленным ориентиром, а не выдумкой.
 */
export function getBaseline(quiz: AnyQuiz): Baseline {
	const cached = baselineCache.get(quiz.slug)
	if (cached) return cached
	const rnd = mulberry32(quiz.slug.split('').reduce((h, c) => h * 31 + c.charCodeAt(0), 7))
	const values: Record<string, number[]> = {}
	const types: Record<string, number> = {}
	for (let n = 0; n < BASELINE_SAMPLES; n++) {
		const answers = quiz.questions.map(q => Math.floor(rnd() * q.options.length))
		const m = computeMetrics(quiz, answers)
		if (m.main !== null) (values.main ??= []).push(m.main)
		for (const [k, v] of Object.entries(m.scales)) (values[k] ??= []).push(v)
		if (m.type) types[m.type] = (types[m.type] ?? 0) + 1
	}
	for (const arr of Object.values(values)) arr.sort((a, b) => a - b)
	const result = { values, types, samples: BASELINE_SAMPLES }
	baselineCache.set(quiz.slug, result)
	return result
}

/** Доля значений строго меньше данного (плюс половина равных), 0–100 */
export function percentileOf(sorted: number[], value: number): number {
	if (sorted.length === 0) return 50
	let below = 0
	let equal = 0
	for (const v of sorted) {
		if (v < value) below++
		else if (v === value) equal++
	}
	return clamp(round(((below + equal / 2) / sorted.length) * 100), 1, 99)
}

/* ------------------------------------------------------------------ */
/* Сборка блоков                                                        */
/* ------------------------------------------------------------------ */

type SlotBuilders<Slot extends string> = Record<Slot, () => ResultBlock>

function assemble<Slot extends string, K extends string>(
	template: readonly Slot[],
	builders: SlotBuilders<Slot>,
	override: { omit?: string[]; add?: ExtraList<K, Slot>[] } | undefined,
	key: K
): ResultBlock[] {
	const omit = new Set(override?.omit ?? [])
	const blocks: ResultBlock[] = []
	for (const slot of template) {
		if (omit.has(slot)) continue
		blocks.push(builders[slot]())
		for (const extra of override?.add ?? []) {
			if (extra.after === slot) {
				blocks.push({ type: 'list', data: { title: extra.title, items: extra.items[key] } })
			}
		}
	}
	return blocks
}

function gaugeSegments(
	ranges: Array<[string, OutcomeBand]>,
	activeId: string,
	toPct: (v: number) => number = v => v
) {
	return ranges.map(([id, b]) => ({
		label: b.title,
		from: round(toPct(b.from)),
		to: round(toPct(b.to)),
		tone: b.tone,
		active: id === activeId
	}))
}

/** Сколько шкал показывать в сильных сторонах и зонах роста */
function sideCount(n: number): number {
	return Math.max(1, Math.min(3, Math.floor(n / 2)))
}

/**
 * Самые сильные и самые слабые шкалы. «Сила» учитывает направление шкалы:
 * у шкал-симптомов (direction: 'higher-worse') сильнее низкое значение.
 */
function strongWeak(scales: ScaleScore[], defs?: Record<string, { direction?: 'higher-worse' }>) {
	const goodness = (s: ScaleScore) => (defs?.[s.id]?.direction === 'higher-worse' ? 100 - s.percent : s.percent)
	const sorted = [...scales].sort((a, b) => goodness(b) - goodness(a))
	const k = sideCount(scales.length)
	return { top: sorted.slice(0, k), bottom: sorted.slice(-k).reverse() }
}

function uniq(items: string[]): string[] {
	return [...new Set(items)]
}

function comparisonBlock(
	quiz: AnyQuiz,
	metrics: Array<{ key: string; label: string; value: number }>,
	type: { id: string; title: string } | null
): ResultBlock {
	const base = getBaseline(quiz)
	const data: ComparisonData = {
		quiz: quiz.slug,
		kind: quiz.kind,
		metrics,
		type,
		baseline: metrics.map(m => ({ key: m.key, percentile: percentileOf(base.values[m.key] ?? [], m.value) })),
		baselineTypeShare: type ? round(((base.types[type.id] ?? 0) / base.samples) * 100) : null
	}
	return { type: 'comparison', data }
}

function scaleRows(scales: ScaleScore[], defs: Record<string, ScaleDef>) {
	return scales.map(s => {
		const def = defs[s.id]
		const band = pickPercentBand(def.bands, s.percent)
		return { id: s.id, label: def.label, percent: round(s.percent), level: band.label, text: band.text }
	})
}

function buildLevel(quiz: LevelQuiz, answers: Answers): ResultBlock[] {
	const s = scoreLevel(quiz, answers)
	const band = s.band
	const builders: SlotBuilders<(typeof TEMPLATES.level)[number]> = {
		hero: () => ({
			type: 'hero',
			data: {
				eyebrow: quiz.scale.label,
				title: band.title,
				value: `${s.score} из ${s.max}`,
				summary: band.summary,
				tone: band.tone
			}
		}),
		gauge: () => ({
			type: 'gauge',
			data: {
				label: quiz.scale.label,
				percent: round(s.percent),
				valueLabel: `${s.score} из ${s.max} баллов`,
				segments: gaugeSegments(sortedRanges(quiz.bands), s.bandId),
				lowLabel: quiz.scale.lowLabel,
				highLabel: quiz.scale.highLabel
			}
		}),
		comparison: () =>
			comparisonBlock(quiz, [{ key: 'main', label: quiz.scale.label, value: round(s.percent) }], null),
		description: () => ({ type: 'text', data: { title: 'Что это значит', paragraphs: band.description } }),
		strengths: () => ({ type: 'strengths', data: { strengths: band.strengths, growth: band.growth } }),
		recommendations: () => ({
			type: 'recommendations',
			data: { title: 'Что делать дальше', items: band.recommendations }
		}),
		disclaimer: () => ({
			type: 'disclaimer',
			data: { kind: quiz.disclaimer, seekHelp: band.seekHelp === true }
		})
	}
	return assemble(TEMPLATES.level, builders, quiz.template, s.bandId)
}

function buildIndex(quiz: IndexQuiz, answers: Answers): ResultBlock[] {
	const s = scoreIndex(quiz, answers)
	const band = s.band
	const rows = scaleRows(s.scales, quiz.scales)
	const { top, bottom } = strongWeak(s.scales, quiz.scales)
	const builders: SlotBuilders<(typeof TEMPLATES.index)[number]> = {
		hero: () => ({
			type: 'hero',
			data: {
				eyebrow: quiz.indexLabel,
				title: band.title,
				value: `${round(s.overall)}%`,
				summary: band.summary,
				tone: band.tone
			}
		}),
		gauge: () => ({
			type: 'gauge',
			data: {
				label: quiz.indexLabel,
				percent: round(s.overall),
				valueLabel: `${round(s.overall)} из 100`,
				segments: gaugeSegments(sortedRanges(quiz.bands), s.bandId),
				lowLabel: 'Ниже',
				highLabel: 'Выше'
			}
		}),
		scaleChart: () => ({
			type: 'scaleChart',
			data: {
				title: 'Составляющие',
				chart: rows.length >= 5 ? 'radar' : 'bars',
				items: rows.map(({ id, label, percent, level }) => ({ id, label, percent, level }))
			}
		}),
		comparison: () =>
			comparisonBlock(quiz, [{ key: 'main', label: quiz.indexLabel, value: round(s.overall) }], null),
		description: () => ({ type: 'text', data: { title: 'Что это значит', paragraphs: band.description } }),
		scaleDetails: () => ({ type: 'scaleDetails', data: { title: 'Разбор по шкалам', items: rows } }),
		strengths: () => ({
			type: 'strengths',
			data: {
				strengths: top.map(x => quiz.scales[x.id].strength),
				growth: bottom.map(x => quiz.scales[x.id].growth)
			}
		}),
		recommendations: () => ({
			type: 'recommendations',
			data: {
				title: 'Что делать дальше',
				items: uniq([...band.recommendations, ...bottom.flatMap(x => quiz.scales[x.id].tips)])
			}
		}),
		disclaimer: () => ({
			type: 'disclaimer',
			data: { kind: quiz.disclaimer, seekHelp: band.seekHelp === true }
		})
	}
	return assemble(TEMPLATES.index, builders, quiz.template, s.bandId)
}

function buildProfile(quiz: ProfileQuiz, answers: Answers): ResultBlock[] {
	const s = scoreProfile(quiz, answers)
	const rows = scaleRows(s.scales, quiz.scales)
	const { top, bottom } = strongWeak(s.scales, quiz.scales)
	const leaders = [...rows].sort((a, b) => b.percent - a.percent).slice(0, 2)
	const builders: SlotBuilders<(typeof TEMPLATES.profile)[number]> = {
		hero: () => ({
			type: 'hero',
			data: {
				eyebrow: 'Ваш результат',
				title: quiz.profileLabel,
				value: null,
				summary: `${quiz.profileSummary} Ярче всего выражены: ${leaders
					.map(l => `${l.label.toLowerCase()} (${l.percent}%)`)
					.join(' и ')}.`,
				tone: 'neutral'
			}
		}),
		scaleChart: () => ({
			type: 'scaleChart',
			data: {
				title: 'Профиль по шкалам',
				chart: rows.length >= 5 ? 'radar' : 'bars',
				items: rows.map(({ id, label, percent, level }) => ({ id, label, percent, level }))
			}
		}),
		comparison: () =>
			comparisonBlock(
				quiz,
				rows.map(r => ({ key: r.id, label: r.label, value: r.percent })),
				null
			),
		scaleDetails: () => ({ type: 'scaleDetails', data: { title: 'Разбор по шкалам', items: rows } }),
		strengths: () => ({
			type: 'strengths',
			data: {
				strengths: top.map(x => quiz.scales[x.id].strength),
				growth: bottom.map(x => quiz.scales[x.id].growth)
			}
		}),
		recommendations: () => ({
			type: 'recommendations',
			data: { title: 'Что делать дальше', items: uniq(bottom.flatMap(x => quiz.scales[x.id].tips)) }
		}),
		disclaimer: () => ({ type: 'disclaimer', data: { kind: quiz.disclaimer, seekHelp: false } })
	}
	return assemble(TEMPLATES.profile, builders, quiz.template, top[0].id)
}

function buildTypology(quiz: TypologyQuiz, answers: Answers): ResultBlock[] {
	const s = scoreTypology(quiz, answers)
	const type = quiz.types[s.primary.id]
	const second = quiz.types[s.secondary.id]
	const builders: SlotBuilders<(typeof TEMPLATES.typology)[number]> = {
		hero: () => ({
			type: 'hero',
			data: { eyebrow: quiz.typeLabel, title: type.title, value: null, summary: type.tagline, tone: 'neutral' }
		}),
		typeChart: () => ({
			type: 'scaleChart',
			data: {
				title: 'Как распределились ответы',
				chart: 'bars',
				items: s.ranked.map(r => ({
					id: r.id,
					label: quiz.types[r.id].title,
					percent: round(r.percent),
					level: r.id === s.primary.id ? 'Ваш тип' : `${round(r.percent)}%`
				}))
			}
		}),
		comparison: () => comparisonBlock(quiz, [], { id: s.primary.id, title: type.title }),
		description: () => ({ type: 'text', data: { title: `${type.title}: какой это тип`, paragraphs: type.description } }),
		traits: () => ({ type: 'list', data: { title: 'Характерные черты', items: type.traits } }),
		strengths: () => ({ type: 'strengths', data: { strengths: type.strengths, growth: type.growth } }),
		secondary: () => ({
			type: 'secondary',
			data: {
				title: 'Второй по выраженности тип',
				typeTitle: second.title,
				text: second.secondary,
				percent: round(s.secondary.percent)
			}
		}),
		recommendations: () => ({
			type: 'recommendations',
			data: { title: 'Рекомендации', items: type.recommendations }
		}),
		disclaimer: () => ({ type: 'disclaimer', data: { kind: quiz.disclaimer, seekHelp: type.seekHelp === true } })
	}
	return assemble(TEMPLATES.typology, builders, quiz.template, s.primary.id)
}

function buildKnowledge(quiz: KnowledgeQuiz, answers: Answers): ResultBlock[] {
	const s = scoreKnowledge(quiz, answers)
	const band = s.band
	const topicScales: ScaleScore[] = s.topics.map(t => ({
		id: t.id,
		raw: t.correct,
		min: 0,
		max: t.total,
		percent: t.percent
	}))
	const { top, bottom } = strongWeak(topicScales)
	const review: AnswerReviewData = {
		correctCount: s.correct,
		total: s.total,
		items: quiz.questions.map((q, i) => ({
			n: i + 1,
			question: q.text,
			yourAnswer: q.options[answers[i]],
			correctAnswer: q.options[q.correct],
			correct: s.perQuestion[i],
			explanation: q.explanation
		}))
	}
	const builders: SlotBuilders<(typeof TEMPLATES.knowledge)[number]> = {
		hero: () => ({
			type: 'hero',
			data: {
				eyebrow: 'Правильных ответов',
				title: band.title,
				value: `${s.correct} из ${s.total}`,
				summary: band.summary,
				tone: band.tone
			}
		}),
		gauge: () => ({
			type: 'gauge',
			data: {
				label: 'Доля верных ответов',
				percent: round(s.percent),
				valueLabel: `${round(s.percent)}% верных`,
				segments: gaugeSegments(sortedRanges(quiz.bands), s.bandId),
				lowLabel: '0%',
				highLabel: '100%'
			}
		}),
		description: () => ({ type: 'text', data: { title: 'Что это значит', paragraphs: band.description } }),
		comparison: () => comparisonBlock(quiz, [{ key: 'main', label: 'Верные ответы', value: round(s.percent) }], null),
		topics: () => ({
			type: 'scaleChart',
			data: {
				title: 'Результат по темам',
				chart: 'bars',
				items: s.topics.map(t => ({
					id: t.id,
					label: quiz.topics[t.id].label,
					percent: round(t.percent),
					level: `${t.correct} из ${t.total}`
				}))
			}
		}),
		strengths: () => ({
			type: 'strengths',
			data: {
				strengths: top.map(x => quiz.topics[x.id].strength),
				growth: bottom.map(x => quiz.topics[x.id].growth)
			}
		}),
		recommendations: () => ({
			type: 'recommendations',
			data: { title: 'Что почитать и потренировать', items: band.recommendations }
		}),
		answerReview: () => ({ type: 'answerReview', data: review })
	}
	return assemble(TEMPLATES.knowledge, builders, quiz.template, s.bandId)
}

function buildCalculator(quiz: CalculatorQuiz, answers: Answers): ResultBlock[] {
	const s = scoreCalculator(quiz, answers)
	const band = s.band
	const m = quiz.metric
	const formatted = `${formatNumber(s.value, m.digits)} ${m.unit}`.trim()
	const pct = (v: number) => toPercent(v, m.min, m.max)
	const builders: SlotBuilders<(typeof TEMPLATES.calculator)[number]> = {
		hero: () => ({
			type: 'hero',
			data: { eyebrow: m.label, title: band.title, value: formatted, summary: band.summary, tone: band.tone }
		}),
		breakdown: () => ({
			type: 'breakdown',
			data: {
				title: 'Из чего складывается',
				items: quiz.breakdown.map(p => ({
					label: p.label,
					value: `${formatNumber(p.compute(s.vars as Record<string, number>), 1)} ${p.unit}`.trim()
				}))
			}
		}),
		gauge: () => ({
			type: 'gauge',
			data: {
				label: m.label,
				percent: round(pct(s.value)),
				valueLabel: formatted,
				segments: gaugeSegments(sortedRanges(quiz.bands), s.bandId, pct),
				lowLabel: `${formatNumber(m.min, m.digits)} ${m.unit}`.trim(),
				highLabel: `${formatNumber(m.max, m.digits)} ${m.unit}`.trim()
			}
		}),
		comparison: () => comparisonBlock(quiz, [{ key: 'main', label: m.label, value: s.value }], null),
		description: () => ({ type: 'text', data: { title: 'Что это значит', paragraphs: band.description } }),
		recommendations: () => ({
			type: 'recommendations',
			data: { title: 'Что делать дальше', items: band.recommendations }
		}),
		disclaimer: () => ({
			type: 'disclaimer',
			data: { kind: quiz.disclaimer, seekHelp: band.seekHelp === true }
		})
	}
	return assemble(TEMPLATES.calculator, builders, quiz.template, s.bandId)
}

/* ------------------------------------------------------------------ */

export function buildResult(quiz: AnyQuiz, answers: Answers): QuizResult {
	assertAnswers(quiz, answers)
	let blocks: ResultBlock[]
	switch (quiz.kind) {
		case 'level':
			blocks = buildLevel(quiz, answers)
			break
		case 'index':
			blocks = buildIndex(quiz, answers)
			break
		case 'profile':
			blocks = buildProfile(quiz, answers)
			break
		case 'typology':
			blocks = buildTypology(quiz, answers)
			break
		case 'knowledge':
			blocks = buildKnowledge(quiz, answers)
			break
		case 'calculator':
			blocks = buildCalculator(quiz, answers)
			break
	}
	return { quiz: quiz.slug, kind: quiz.kind, title: quiz.title, blocks, metrics: computeMetrics(quiz, answers) }
}

/** Короткая сводка для OG-картинки и заголовка страницы результата */
export function resultHeadline(result: QuizResult): { eyebrow: string; title: string; value: string | null } {
	const hero = result.blocks.find(b => b.type === 'hero')
	if (!hero || hero.type !== 'hero') throw new Error(`${result.quiz}: в результате нет итога`)
	return { eyebrow: hero.data.eyebrow, title: hero.data.title, value: hero.data.value }
}
