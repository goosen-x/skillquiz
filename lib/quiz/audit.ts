/**
 * Аудит описания теста: всё, что не выражается схемой.
 *
 *  1. Структура (zod, строгие объекты).
 *  2. Смысл: отрезки покрывают шкалу без дыр, баллы начислены существующим
 *     шкалам, правильный ответ существует, похожие тесты существуют…
 *  3. Достижимость: каждый уровень, тип и отрезок каждой шкалы реально
 *     получается при каких-то ответах. Недостижимое описание — мёртвые данные.
 *  4. Результаты на «свидетелях» (ответах, найденных в п. 3, плюс крайние и
 *     случайные): все блоки проходят blockSchema.
 *  5. Лишние данные: каждая строка содержания теста (описания уровней,
 *     типов, шкал, советы, разборы) хоть раз попадает в какой-то блок.
 *
 * Возвращает список проблем; пустой список — тест готов к публикации.
 */

import { blockSchema, quizSchema } from './schema'
import { buildResult, scoreIndex, scoreKnowledge, scoreLevel, scoreProfile, scoreTypology, scoreCalculator, sortedRanges } from './engine'
import type { Answers, AnyQuiz, PercentBand, PointsQuestion, Range } from './types'

export interface AuditOptions {
	/** Все слаги каталога, чтобы проверить related */
	allSlugs?: string[]
}

/* ------------------------------------------------------------------ */

function checkRanges(label: string, ranges: Range[], min: number, max: number, issues: string[]) {
	const sorted = [...ranges].sort((a, b) => a.from - b.from)
	if (sorted.length < 2) issues.push(`${label}: нужно минимум два отрезка`)
	if (sorted[0] && sorted[0].from !== min) issues.push(`${label}: первый отрезок начинается с ${sorted[0].from}, а не с ${min}`)
	const last = sorted[sorted.length - 1]
	if (last && last.to !== max) issues.push(`${label}: последний отрезок кончается на ${last.to}, а не на ${max}`)
	for (let i = 0; i < sorted.length; i++) {
		if (sorted[i].to <= sorted[i].from) issues.push(`${label}: отрезок ${sorted[i].from}–${sorted[i].to} пустой`)
		if (i > 0 && sorted[i].from !== sorted[i - 1].to) {
			issues.push(`${label}: дыра или перекрытие между ${sorted[i - 1].to} и ${sorted[i].from}`)
		}
	}
}

/** Детерминированный генератор для поиска */
function rng(seed: number) {
	let a = seed >>> 0
	return () => {
		a = (a + 0x6d2b79f5) >>> 0
		let t = a
		t = Math.imul(t ^ (t >>> 15), t | 1)
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

/**
 * Поиск ответов, на которых цель (чем меньше, тем лучше; 0 — достигнута)
 * минимальна: случайные старты + покоординатный спуск.
 */
export function searchAnswers(
	quiz: AnyQuiz,
	cost: (a: Answers) => number,
	seed = 1,
	restarts = 12
): Answers | null {
	const rnd = rng(seed)
	const sizes = quiz.questions.map(q => q.options.length)
	for (let r = 0; r < restarts; r++) {
		let cur = sizes.map(n => Math.floor(rnd() * n))
		let best = cost(cur)
		if (best <= 0) return cur
		for (let sweep = 0; sweep < 12; sweep++) {
			let improved = false
			const order = sizes.map((_, i) => i).sort(() => rnd() - 0.5)
			for (const i of order) {
				for (let o = 0; o < sizes[i]; o++) {
					if (o === cur[i]) continue
					const next = cur.slice()
					next[i] = o
					const c = cost(next)
					if (c < best) {
						best = c
						cur = next
						improved = true
						if (best <= 0) return cur
					}
				}
			}
			if (!improved) break
		}
	}
	return null
}

/** Расстояние от точки до отрезка [from, to) (последний — включительно) */
function distToRange(v: number, r: Range, isLast: boolean): number {
	if (v < r.from) return r.from - v
	if (isLast ? v > r.to : v >= r.to) return v - r.to + 1e-6
	return 0
}

/* ------------------------------------------------------------------ */

function collectContent(quiz: AnyQuiz): Map<string, string> {
	// строка → где она лежит (для сообщения)
	const out = new Map<string, string>()
	const add = (where: string, s: string) => out.set(s, where)
	const addAll = (where: string, list: string[]) => list.forEach(s => add(where, s))
	const addScales = (scales: Record<string, { bands: PercentBand[]; strength: string; growth: string; tips: string[] }>) => {
		for (const [id, s] of Object.entries(scales)) {
			s.bands.forEach(b => add(`scales.${id}.bands`, b.text))
			add(`scales.${id}.strength`, s.strength)
			add(`scales.${id}.growth`, s.growth)
			addAll(`scales.${id}.tips`, s.tips)
		}
	}
	switch (quiz.kind) {
		case 'level':
			for (const [id, b] of Object.entries(quiz.bands)) {
				add(`bands.${id}.title`, b.title)
				add(`bands.${id}.summary`, b.summary)
				addAll(`bands.${id}.description`, b.description)
				addAll(`bands.${id}.recommendations`, b.recommendations)
				addAll(`bands.${id}.strengths`, b.strengths)
				addAll(`bands.${id}.growth`, b.growth)
			}
			break
		case 'index':
			for (const [id, b] of Object.entries(quiz.bands)) {
				add(`bands.${id}.title`, b.title)
				add(`bands.${id}.summary`, b.summary)
				addAll(`bands.${id}.description`, b.description)
				addAll(`bands.${id}.recommendations`, b.recommendations)
			}
			addScales(quiz.scales)
			break
		case 'profile':
			addScales(quiz.scales)
			break
		case 'typology':
			for (const [id, t] of Object.entries(quiz.types)) {
				add(`types.${id}.title`, t.title)
				add(`types.${id}.tagline`, t.tagline)
				addAll(`types.${id}.description`, t.description)
				addAll(`types.${id}.traits`, t.traits)
				addAll(`types.${id}.strengths`, t.strengths)
				addAll(`types.${id}.growth`, t.growth)
				addAll(`types.${id}.recommendations`, t.recommendations)
				add(`types.${id}.secondary`, t.secondary)
			}
			break
		case 'knowledge':
			for (const [id, b] of Object.entries(quiz.bands)) {
				add(`bands.${id}.title`, b.title)
				add(`bands.${id}.summary`, b.summary)
				addAll(`bands.${id}.recommendations`, b.recommendations)
				addAll(`bands.${id}.description`, b.description)
			}
			for (const [id, t] of Object.entries(quiz.topics)) {
				add(`topics.${id}.strength`, t.strength)
				add(`topics.${id}.growth`, t.growth)
			}
			quiz.questions.forEach((q, i) => add(`questions[${i}].explanation`, q.explanation))
			break
		case 'calculator':
			for (const [id, b] of Object.entries(quiz.bands)) {
				add(`bands.${id}.title`, b.title)
				add(`bands.${id}.summary`, b.summary)
				addAll(`bands.${id}.description`, b.description)
				addAll(`bands.${id}.recommendations`, b.recommendations)
			}
			break
	}
	for (const extra of quiz.template?.add ?? []) {
		for (const [k, items] of Object.entries(extra.items as Record<string, string[]>)) {
			addAll(`template.add «${extra.title}».${k}`, items)
		}
	}
	return out
}

function collectStrings(value: unknown, into: Set<string>) {
	if (typeof value === 'string') into.add(value)
	else if (Array.isArray(value)) value.forEach(v => collectStrings(v, into))
	else if (value && typeof value === 'object') Object.values(value).forEach(v => collectStrings(v, into))
}

/* ------------------------------------------------------------------ */

export interface AuditReport {
	issues: string[]
	/** Ответы, на которых проверялись результаты */
	witnesses: Answers[]
}

export function auditQuiz(quiz: AnyQuiz, options: AuditOptions = {}): AuditReport {
	const issues: string[] = []
	const parsed = quizSchema.safeParse(quiz)
	if (!parsed.success) {
		for (const e of parsed.error.issues) issues.push(`схема: ${e.path.join('.')}: ${e.message}`)
		return { issues, witnesses: [] }
	}

	// Вопросы: варианты внутри вопроса не повторяются, тексты вопросов уникальны
	const seenQ = new Set<string>()
	quiz.questions.forEach((q, i) => {
		if (seenQ.has(q.text)) issues.push(`вопрос ${i + 1} повторяет текст другого вопроса`)
		seenQ.add(q.text)
		const opts = q.options.map(o => (typeof o === 'string' ? o : o.text))
		if (new Set(opts).size !== opts.length) issues.push(`вопрос ${i + 1}: варианты повторяются`)
	})

	if (options.allSlugs) {
		for (const r of quiz.related) {
			if (r === quiz.slug) issues.push(`related ссылается на себя`)
			else if (!options.allSlugs.includes(r)) issues.push(`related: нет теста ${r}`)
		}
	}

	const scaleIds =
		quiz.kind === 'index' || quiz.kind === 'profile'
			? Object.keys(quiz.scales)
			: quiz.kind === 'typology'
				? Object.keys(quiz.types)
				: []

	// Баллы начислены только существующим шкалам, у каждой шкалы есть вопросы
	if (scaleIds.length) {
		if (scaleIds.length < 2) issues.push('нужно минимум две шкалы или два типа')
		const used = new Map<string, number>()
		;(quiz.questions as PointsQuestion<string>[]).forEach((q, i) => {
			const touched = new Set<string>()
			q.options.forEach((o, j) => {
				const keys = Object.keys(o.points)
				if (keys.length === 0) issues.push(`вопрос ${i + 1}, вариант ${j + 1}: нет баллов`)
				for (const k of keys) {
					if (!scaleIds.includes(k)) issues.push(`вопрос ${i + 1}, вариант ${j + 1}: шкалы «${k}» нет`)
					touched.add(k)
				}
			})
			touched.forEach(k => used.set(k, (used.get(k) ?? 0) + 1))
		})
		for (const id of scaleIds) {
			if ((used.get(id) ?? 0) < 2) issues.push(`шкала/тип «${id}»: баллы даёт меньше двух вопросов`)
		}
	}

	// Отрезки
	switch (quiz.kind) {
		case 'level':
		case 'index':
		case 'knowledge':
			checkRanges('bands', Object.values(quiz.bands), 0, 100, issues)
			break
		case 'calculator':
			checkRanges('bands', Object.values(quiz.bands), quiz.metric.min, quiz.metric.max, issues)
			break
	}
	if (quiz.kind === 'index' || quiz.kind === 'profile') {
		for (const [id, s] of Object.entries(quiz.scales)) checkRanges(`scales.${id}.bands`, s.bands, 0, 100, issues)
	}
	if (quiz.kind === 'typology') {
		const types = Object.keys(quiz.types)
		if (quiz.tieOrder.length !== types.length || !types.every(t => quiz.tieOrder.includes(t))) {
			issues.push('tieOrder должен перечислять все типы ровно по разу')
		}
	}
	if (quiz.kind === 'knowledge') {
		const topics = Object.keys(quiz.topics)
		quiz.questions.forEach((q, i) => {
			if (q.correct >= q.options.length) issues.push(`вопрос ${i + 1}: правильного варианта ${q.correct} нет`)
			if (!topics.includes(q.topic)) issues.push(`вопрос ${i + 1}: темы «${q.topic}» нет`)
		})
		for (const t of topics) {
			if (!quiz.questions.some(q => q.topic === t)) issues.push(`тема «${t}» без вопросов`)
		}
		if (topics.length < 2) issues.push('нужно минимум две темы')
	}

	// Дополнительные списки: ключи ровно те, что у вида
	const keySet =
		quiz.kind === 'typology'
			? Object.keys(quiz.types)
			: quiz.kind === 'profile'
				? Object.keys(quiz.scales)
				: Object.keys((quiz as { bands: object }).bands)
	for (const extra of quiz.template?.add ?? []) {
		const keys = Object.keys(extra.items)
		const missing = keySet.filter(k => !keys.includes(k))
		const extraKeys = keys.filter(k => !keySet.includes(k))
		if (missing.length) issues.push(`template.add «${extra.title}»: нет списков для ${missing.join(', ')}`)
		if (extraKeys.length) issues.push(`template.add «${extra.title}»: лишние ключи ${extraKeys.join(', ')}`)
	}

	if (issues.length) return { issues, witnesses: [] }

	// Достижимость и свидетели
	const witnesses: Answers[] = [
		quiz.questions.map(() => 0),
		quiz.questions.map(q => q.options.length - 1)
	]
	const need = (label: string, cost: (a: Answers) => number, seed: number) => {
		const found = searchAnswers(quiz, cost, seed)
		if (found) witnesses.push(found)
		else issues.push(`недостижимо: ${label}`)
	}

	let seed = 1
	switch (quiz.kind) {
		case 'level': {
			const list = sortedRanges(quiz.bands)
			list.forEach(([id, r], i) =>
				need(`уровень «${id}»`, a => distToRange(scoreLevel(quiz, a).percent, r, i === list.length - 1), seed++)
			)
			break
		}
		case 'index': {
			const list = sortedRanges(quiz.bands)
			list.forEach(([id, r], i) =>
				need(`уровень «${id}»`, a => distToRange(scoreIndex(quiz, a).overall, r, i === list.length - 1), seed++)
			)
			break
		}
		case 'knowledge': {
			const list = sortedRanges(quiz.bands)
			list.forEach(([id, r], i) =>
				need(`уровень «${id}»`, a => distToRange(scoreKnowledge(quiz, a).percent, r, i === list.length - 1), seed++)
			)
			// Каждая тема бывает и сильной, и слабой
			for (const t of Object.keys(quiz.topics)) {
				need(`тема «${t}» сильнейшая`, a => {
					const s = scoreKnowledge(quiz, a)
					const me = s.topics.find(x => x.id === t)!.percent
					const others = Math.max(...s.topics.filter(x => x.id !== t).map(x => x.percent))
					return me > others ? 0 : others - me + 1
				}, seed++)
				need(`тема «${t}» слабейшая`, a => {
					const s = scoreKnowledge(quiz, a)
					const me = s.topics.find(x => x.id === t)!.percent
					const others = Math.min(...s.topics.filter(x => x.id !== t).map(x => x.percent))
					return me < others ? 0 : me - others + 1
				}, seed++)
			}
			break
		}
		case 'calculator': {
			const list = sortedRanges(quiz.bands)
			list.forEach(([id, r], i) =>
				need(`уровень «${id}»`, a => distToRange(scoreCalculator(quiz, a).value, r, i === list.length - 1), seed++)
			)
			break
		}
		case 'typology': {
			for (const t of quiz.tieOrder) {
				need(`тип «${t}» основной`, a => (scoreTypology(quiz, a).primary.id === t ? 0 : 1 + rankGap(quiz, a, t, 0)), seed++)
				need(`тип «${t}» второй`, a => (scoreTypology(quiz, a).secondary.id === t ? 0 : 1 + rankGap(quiz, a, t, 1)), seed++)
			}
			break
		}
	}

	if (quiz.kind === 'index' || quiz.kind === 'profile') {
		const score = (a: Answers) => (quiz.kind === 'index' ? scoreIndex(quiz, a).scales : scoreProfile(quiz, a).scales)
		for (const [id, def] of Object.entries(quiz.scales)) {
			const sorted = [...def.bands].sort((a, b) => a.from - b.from)
			sorted.forEach((b, i) =>
				need(`шкала «${id}», отрезок «${b.label}»`, a => {
					const p = score(a).find(x => x.id === id)!.percent
					return distToRange(p, b, i === sorted.length - 1)
				}, seed++)
			)
			// «Сила» шкалы с учётом направления, как в engine.strongWeak
			const good = (x: { id: string; percent: number }) =>
				quiz.scales[x.id]?.direction === 'higher-worse' ? 100 - x.percent : x.percent
			need(`шкала «${id}» среди сильнейших`, a => {
				const s = score(a)
				const me = good(s.find(x => x.id === id)!)
				const others = Math.max(...s.filter(x => x.id !== id).map(good))
				return me > others ? 0 : others - me + 1
			}, seed++)
			need(`шкала «${id}» среди слабейших`, a => {
				const s = score(a)
				const me = good(s.find(x => x.id === id)!)
				const others = Math.min(...s.filter(x => x.id !== id).map(good))
				return me < others ? 0 : me - others + 1
			}, seed++)
		}
	}

	// Случайные ответы
	const rnd = rng(99)
	for (let i = 0; i < 10; i++) witnesses.push(quiz.questions.map(q => Math.floor(rnd() * q.options.length)))

	// Результаты на свидетелях
	const rendered = new Set<string>()
	for (const w of witnesses) {
		let result
		try {
			result = buildResult(quiz, w)
		} catch (e) {
			issues.push(`подсчёт упал: ${(e as Error).message}`)
			continue
		}
		for (const block of result.blocks) {
			const check = blockSchema.safeParse(block)
			if (!check.success) {
				for (const e of check.error.issues) issues.push(`блок ${block.type}: ${e.path.join('.')}: ${e.message}`)
			}
		}
		collectStrings(result.blocks, rendered)
	}

	// Лишние данные
	for (const [s, where] of collectContent(quiz)) {
		if (!rendered.has(s)) issues.push(`не попадает ни в один блок: ${where}: «${s.slice(0, 60)}»`)
	}

	return { issues: [...new Set(issues)], witnesses }
}

/** Насколько тип t отстаёт от нужного места в рейтинге */
function rankGap(quiz: Extract<AnyQuiz, { kind: 'typology' }>, a: Answers, t: string, place: number): number {
	const s = scoreTypology(quiz, a)
	const me = s.ranked.find(r => r.id === t)!
	const target = s.ranked[place]
	return Math.max(0, target.score - me.score) + Math.abs(s.ranked.indexOf(me) - place)
}
