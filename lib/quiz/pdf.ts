/**
 * PDF результата. Строится из тех же блоков (result.blocks), что и экран:
 * исчерпывающий switch по типу блока, поэтому новый блок без отрисовки в PDF
 * не соберётся. Работает и в браузере (кнопка «Скачать PDF»), и в Node
 * (юнит-тест проверяет размер и кириллицу в тексте файла).
 *
 * Шрифт Inter встроен (подмножество латиница + кириллица, public/fonts/pdf),
 * иначе jsPDF рисует русские буквы квадратиками.
 */

import { jsPDF } from 'jspdf'
import type { QuizResult, ResultBlock } from './blocks'
import type { StatsResponse } from './stats-types'
import type { Tone } from './types'

export interface PdfFonts {
	/** TTF в base64 */
	regular: string
	semibold: string
	bold: string
}

export interface PdfOptions {
	quizTitle: string
	url: string
	date: Date
	fonts: PdfFonts
	stats?: StatsResponse | null
}

type RGB = [number, number, number]

const C = {
	text: [20, 17, 31] as RGB,
	muted: [100, 96, 120] as RGB,
	line: [228, 225, 240] as RGB,
	soft: [244, 242, 252] as RGB,
	primary: [109, 74, 255] as RGB,
	accent: [255, 122, 61] as RGB
}

const TONE: Record<Tone, RGB> = {
	good: [22, 150, 90],
	neutral: C.primary,
	warn: [217, 140, 10],
	alert: [220, 50, 50]
}

const PAGE_W = 210
const PAGE_H = 297
const M = 16
const W = PAGE_W - M * 2

/** Убираем символы, которых нет в подмножестве шрифта (эмодзи и т.п.) */
function clean(s: string): string {
	return s
		.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}️]/gu, '')
		.replace(/[^ -~ -ÿЀ-џ‐-›₽№™←-↓−≈≠≤≥ \n]/g, '')
		.trim()
}

export function buildResultPdf(result: QuizResult, opts: PdfOptions): jsPDF {
	const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
	doc.addFileToVFS('Inter-Regular.ttf', opts.fonts.regular)
	doc.addFont('Inter-Regular.ttf', 'Inter', 'normal')
	doc.addFileToVFS('Inter-SemiBold.ttf', opts.fonts.semibold)
	doc.addFont('Inter-SemiBold.ttf', 'Inter', 'semibold')
	doc.addFileToVFS('Inter-Bold.ttf', opts.fonts.bold)
	doc.addFont('Inter-Bold.ttf', 'Inter', 'bold')
	doc.setProperties({ title: `${opts.quizTitle}: результат`, creator: 'SkillQuiz', subject: opts.url })

	let y = M

	const font = (style: 'normal' | 'semibold' | 'bold', size: number, color: RGB = C.text) => {
		doc.setFont('Inter', style)
		doc.setFontSize(size)
		doc.setTextColor(...color)
	}
	const lineH = (size: number) => size * 0.3528 * 1.38

	const ensure = (h: number) => {
		if (y + h > PAGE_H - M - 8) {
			doc.addPage()
			y = M
		}
	}

	/** Абзац с переносами. Возвращает высоту */
	const para = (text: string, size = 10.5, color: RGB = C.text, style: 'normal' | 'semibold' | 'bold' = 'normal', x = M, width = W) => {
		font(style, size, color)
		const lines = doc.splitTextToSize(clean(text), width) as string[]
		const lh = lineH(size)
		for (const line of lines) {
			ensure(lh)
			doc.text(line, x, y + lh * 0.75)
			y += lh
		}
	}

	const heading = (text: string) => {
		ensure(16)
		y += 5
		para(text, 13.5, C.text, 'bold')
		y += 1.5
	}

	const bullets = (items: string[], marker: (i: number) => string = () => '•', color: RGB = C.primary) => {
		for (const [i, item] of items.entries()) {
			font('normal', 10.5)
			const lines = doc.splitTextToSize(clean(item), W - 7) as string[]
			const lh = lineH(10.5)
			ensure(lh * Math.min(lines.length, 2))
			font('bold', 10.5, color)
			doc.text(marker(i), M, y + lh * 0.75)
			font('normal', 10.5)
			for (const line of lines) {
				ensure(lh)
				doc.text(line, M + 7, y + lh * 0.75)
				y += lh
			}
			y += 1.2
		}
	}

	const bar = (percent: number, color: RGB = C.primary, h = 3.2) => {
		ensure(h + 2)
		doc.setFillColor(...C.soft)
		doc.roundedRect(M, y, W, h, h / 2, h / 2, 'F')
		doc.setFillColor(...color)
		doc.roundedRect(M, y, Math.max(h, (W * percent) / 100), h, h / 2, h / 2, 'F')
		y += h + 2
	}

	// Шапка: знак, название, дата
	doc.setFillColor(...C.primary)
	doc.roundedRect(M, y, 11, 11, 2.8, 2.8, 'F')
	doc.setFillColor(255, 255, 255)
	doc.roundedRect(M + 2.4, y + 2.4, 6.2, 1.4, 0.7, 0.7, 'F')
	doc.roundedRect(M + 2.4, y + 4.8, 6.2, 1.4, 0.7, 0.7, 'F')
	doc.roundedRect(M + 2.4, y + 7.2, 4.5, 1.4, 0.7, 0.7, 'F')
	doc.setFillColor(...C.accent)
	doc.circle(M + 7.9, y + 5.5, 1.05, 'F')
	font('bold', 15)
	doc.text('Skill', M + 14, y + 7.6)
	const skillW = doc.getTextWidth('Skill')
	font('bold', 15, C.primary)
	doc.text('Quiz', M + 14 + skillW, y + 7.6)
	font('normal', 9, C.muted)
	const date = opts.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
	doc.text(clean(date), PAGE_W - M, y + 4.5, { align: 'right' })
	doc.text('skillquiz.ru', PAGE_W - M, y + 8.8, { align: 'right' })
	y += 16
	doc.setDrawColor(...C.line)
	doc.line(M, y, PAGE_W - M, y)
	y += 7
	para(`Результат теста «${opts.quizTitle}»`, 11, C.muted, 'semibold')
	y += 2

	const renderBlock = (block: ResultBlock) => {
		switch (block.type) {
			case 'hero': {
				const d = block.data
				para(d.eyebrow.toUpperCase(), 9, C.muted, 'semibold')
				y += 1
				if (d.value) {
					font('bold', 22, C.text)
					const vw = doc.getTextWidth(clean(d.value))
					const before = y
					para(d.title, 22, TONE[d.tone], 'bold', M, W - vw - 8)
					font('bold', 22, C.text)
					doc.text(clean(d.value), PAGE_W - M, before + lineH(22) * 0.75, { align: 'right' })
				} else {
					para(d.title, 22, TONE[d.tone], 'bold')
				}
				y += 2
				para(d.summary, 11.5)
				y += 2
				return
			}
			case 'gauge': {
				const d = block.data
				heading(d.label)
				ensure(22)
				font('semibold', 10, C.text)
				doc.text(clean(d.valueLabel), M + Math.min(Math.max((W * d.percent) / 100, 14), W - 14), y + 3.5, { align: 'center' })
				y += 6
				let x = M
				for (const s of d.segments) {
					const w = (W * Math.max(1, s.to - s.from)) / 100
					const [r, g, b] = TONE[s.tone]
					if (s.active) doc.setFillColor(r, g, b)
					else doc.setFillColor(Math.round(r + (255 - r) * 0.72), Math.round(g + (255 - g) * 0.72), Math.round(b + (255 - b) * 0.72))
					doc.rect(x, y, Math.max(0.5, w - 0.6), 4, 'F')
					x += w
				}
				const mx = M + (W * d.percent) / 100
				doc.setFillColor(...C.text)
				doc.triangle(mx - 1.8, y - 2.2, mx + 1.8, y - 2.2, mx, y + 0.4, 'F')
				y += 6.5
				font('normal', 8.5, C.muted)
				doc.text(clean(d.lowLabel), M, y + 2.5)
				doc.text(clean(d.highLabel), PAGE_W - M, y + 2.5, { align: 'right' })
				y += 5
				para(d.segments.map(s => (s.active ? `[${s.label}]` : s.label)).join('  ·  '), 9, C.muted)
				return
			}
			case 'scaleChart': {
				heading(block.data.title)
				for (const item of block.data.items) {
					ensure(10)
					font('semibold', 10)
					doc.text(clean(item.label), M, y + 3.5)
					font('normal', 9.5, C.muted)
					doc.text(clean(`${item.percent}% · ${item.level}`), PAGE_W - M, y + 3.5, { align: 'right' })
					y += 5.2
					bar(item.percent)
					y += 0.8
				}
				return
			}
			case 'scaleDetails': {
				heading(block.data.title)
				for (const item of block.data.items) {
					ensure(14)
					para(`${item.label}: ${item.level.toLowerCase()}, ${item.percent}%`, 10.5, C.text, 'semibold')
					para(item.text, 10, C.muted)
					y += 2.5
				}
				return
			}
			case 'text':
				heading(block.data.title)
				for (const p of block.data.paragraphs) {
					para(p)
					y += 2
				}
				return
			case 'list':
				heading(block.data.title)
				bullets(block.data.items)
				return
			case 'strengths':
				heading('Сильные стороны')
				bullets(block.data.strengths, () => '+', TONE.good)
				heading('Зоны роста')
				bullets(block.data.growth, () => '→', TONE.warn)
				return
			case 'recommendations':
				heading(block.data.title)
				bullets(block.data.items, i => `${i + 1}.`)
				return
			case 'secondary':
				heading(block.data.title)
				para(`${block.data.typeTitle} (${block.data.percent}% ответов)`, 11, C.text, 'semibold')
				para(block.data.text, 10.5, C.muted)
				return
			case 'comparison': {
				const d = block.data
				const s = opts.stats
				heading('Сравнение с другими')
				if (d.type) {
					const share = s?.reliable && s.typeShare !== null ? `у ${s.typeShare}% прошедших` : `примерно в ${d.baselineTypeShare}% случаев (ориентир)`
					para(`Тип «${d.type.title}» ${share}.`)
				}
				for (const m of d.metrics) {
					const real = s?.reliable ? s.percentiles[m.key] : undefined
					const value = real ?? d.baseline.find(b => b.key === m.key)?.percentile ?? 50
					para(`${m.label}: выше, чем у ${real === undefined ? '~' : ''}${value}% прошедших`, 10.5, C.text, 'semibold')
					bar(value)
				}
				para(
					s?.reliable
						? `По данным ${s.count} прохождений на SkillQuiz.`
						: 'Пока прохождений мало, поэтому цифры ориентировочные: так распределились бы результаты при случайных ответах. По данным первых прохождений сравнение пересчитается.',
					9,
					C.muted
				)
				return
			}
			case 'answerReview':
				heading(`Разбор ответов: ${block.data.correctCount} из ${block.data.total} верно`)
				for (const item of block.data.items) {
					ensure(18)
					para(`${item.n}. ${item.question}`, 10, C.text, 'semibold')
					para(`Ваш ответ: ${item.yourAnswer} (${item.correct ? 'верно' : 'неверно'})`, 9.5, item.correct ? TONE.good : TONE.alert)
					if (!item.correct) para(`Верный ответ: ${item.correctAnswer}`, 9.5)
					para(item.explanation, 9, C.muted)
					y += 2.5
				}
				return
			case 'breakdown':
				heading(block.data.title)
				for (const item of block.data.items) {
					ensure(8)
					font('normal', 10.5, C.muted)
					doc.text(clean(item.label), M, y + 4)
					font('semibold', 10.5)
					doc.text(clean(item.value), PAGE_W - M, y + 4, { align: 'right' })
					y += 6.5
					doc.setDrawColor(...C.line)
					doc.line(M, y, PAGE_W - M, y)
					y += 1
				}
				return
			case 'disclaimer': {
				y += 4
				const text =
					block.data.kind === 'psychology'
						? 'Это не диагноз и не замена консультации специалиста. Тест учитывает только ваши ответы на вопросы.'
						: 'Это не индивидуальная инвестиционная или финансовая рекомендация. Расчёт ориентировочный.'
				para(text, 9, C.muted)
				if (block.data.seekHelp) {
					para('Ваш результат говорит о том, что стоит поговорить с психологом, психотерапевтом или врачом. Если вам очень плохо, звоните 112.', 9, TONE.warn, 'semibold')
				}
				return
			}
			default: {
				const never: never = block
				return never
			}
		}
	}

	for (const block of result.blocks) {
		renderBlock(block)
		y += 3
	}

	// Подвал на каждой странице
	const pages = doc.getNumberOfPages()
	for (let i = 1; i <= pages; i++) {
		doc.setPage(i)
		font('normal', 8, C.muted)
		doc.text(clean(`SkillQuiz · ${opts.url}`), M, PAGE_H - 8)
		doc.text(`${i} / ${pages}`, PAGE_W - M, PAGE_H - 8, { align: 'right' })
	}
	return doc
}

/** Браузер: грузим шрифты и отдаём файл на скачивание */
export async function downloadResultPdf(result: QuizResult, opts: Omit<PdfOptions, 'fonts'>, fileName: string) {
	const load = async (name: string) => {
		const buf = await (await fetch(`/fonts/pdf/${name}`)).arrayBuffer()
		let binary = ''
		const bytes = new Uint8Array(buf)
		for (let i = 0; i < bytes.length; i += 0x8000) {
			binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
		}
		return btoa(binary)
	}
	const [regular, semibold, bold] = await Promise.all([
		load('Inter-Regular.ttf'),
		load('Inter-SemiBold.ttf'),
		load('Inter-Bold.ttf')
	])
	const doc = buildResultPdf(result, { ...opts, fonts: { regular, semibold, bold } })
	doc.save(fileName)
}
