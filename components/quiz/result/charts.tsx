import type { GaugeData, ScaleChartData } from '@/lib/quiz/blocks'
import type { Tone } from '@/lib/quiz/types'
import { cn } from '@/lib/utils'

export const TONE_BG: Record<Tone, string> = {
	good: 'bg-success',
	neutral: 'bg-primary',
	warn: 'bg-warning',
	alert: 'bg-destructive'
}

export const TONE_TEXT: Record<Tone, string> = {
	good: 'text-success',
	neutral: 'text-primary',
	warn: 'text-warning',
	alert: 'text-destructive'
}

/** Шкала из отрезков-уровней с маркером результата */
export function Gauge({ data }: { data: GaugeData }) {
	return (
		<div>
			<div className='relative pt-9'>
				<div
					className='absolute top-0 -translate-x-1/2 rounded-lg bg-foreground px-2 py-1 text-xs font-bold whitespace-nowrap text-background'
					style={{ left: `clamp(2.5rem, ${data.percent}%, calc(100% - 2.5rem))` }}
				>
					{data.valueLabel}
				</div>
				<div className='flex h-4 gap-1 overflow-hidden rounded-full'>
					{data.segments.map(s => (
						<div
							key={s.label}
							className={cn('h-full', TONE_BG[s.tone], s.active ? 'opacity-100' : 'opacity-25')}
							style={{ width: `${Math.max(1, s.to - s.from)}%` }}
						/>
					))}
				</div>
				<div
					className='absolute top-[1.85rem] h-7 w-1.5 -translate-x-1/2 rounded-full bg-foreground ring-2 ring-card'
					style={{ left: `${data.percent}%` }}
					aria-hidden='true'
				/>
			</div>
			<div className='mt-2 flex justify-between text-xs text-muted-foreground'>
				<span>{data.lowLabel}</span>
				<span>{data.highLabel}</span>
			</div>
			<ul className='mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs'>
				{data.segments.map(s => (
					<li key={s.label} className={cn('flex items-center gap-1.5', s.active ? 'font-semibold' : 'text-muted-foreground')}>
						<span className={cn('h-2.5 w-2.5 rounded-full', TONE_BG[s.tone], !s.active && 'opacity-40')} aria-hidden='true' />
						{s.label}
					</li>
				))}
			</ul>
		</div>
	)
}

export function Bars({ items }: { items: ScaleChartData['items'] }) {
	return (
		<ul className='space-y-4'>
			{items.map(item => (
				<li key={item.id}>
					<div className='flex items-baseline justify-between gap-3 text-sm'>
						<span className='font-medium'>{item.label}</span>
						<span className='shrink-0 text-muted-foreground tabular-nums'>
							{item.percent}% · {item.level}
						</span>
					</div>
					<div className='mt-1.5 h-3 overflow-hidden rounded-full bg-muted'>
						<div className='h-full rounded-full bg-primary' style={{ width: `${Math.max(2, item.percent)}%` }} />
					</div>
				</li>
			))}
		</ul>
	)
}

/** Подпись вершины радара: длинные названия переносим на две строки */
function splitLabel(label: string): string[] {
	if (label.length <= 12) return [label]
	if (!label.includes(' ')) {
		// Одно длинное слово: перенос после гласной ближе к середине
		const mid = label.length / 2
		let cut = -1
		for (let i = 3; i < label.length - 3; i++) {
			if (/[аеёиоуыэюяaeiou]/i.test(label[i - 1]) && (cut < 0 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i
		}
		return cut > 0 ? [`${label.slice(0, cut)}-`, label.slice(cut)] : [label]
	}
	const words = label.split(' ')
	let best = [label]
	let bestLen = Infinity
	for (let i = 1; i < words.length; i++) {
		const a = words.slice(0, i).join(' ')
		const b = words.slice(i).join(' ')
		const len = Math.max(a.length, b.length)
		if (len < bestLen) {
			bestLen = len
			best = [a, b]
		}
	}
	return best
}

/** Радар для 5+ шкал. Подписи снаружи, проценты под подписью */
export function Radar({ items }: { items: ScaleChartData['items'] }) {
	const r = 92
	const padX = 100
	const padY = 52
	const c = { x: r + padX, y: r + padY }
	const n = items.length
	const point = (i: number, v: number) => {
		const a = (Math.PI * 2 * i) / n - Math.PI / 2
		return [c.x + Math.cos(a) * r * v, c.y + Math.sin(a) * r * v] as const
	}
	const rings = [0.25, 0.5, 0.75, 1]
	const poly = items.map((it, i) => point(i, Math.max(0.03, it.percent / 100)).join(',')).join(' ')
	return (
		<svg
			viewBox={`0 0 ${2 * (r + padX)} ${2 * (r + padY)}`}
			className='mx-auto w-full max-w-md'
			role='img'
			aria-label='Диаграмма шкал'
		>
			{rings.map(k => (
				<polygon
					key={k}
					points={items.map((_, i) => point(i, k).join(',')).join(' ')}
					fill='none'
					className='stroke-border'
					strokeWidth='1'
				/>
			))}
			{items.map((_, i) => {
				const [x, y] = point(i, 1)
				return <line key={i} x1={c.x} y1={c.y} x2={x} y2={y} className='stroke-border' strokeWidth='1' />
			})}
			<polygon points={poly} className='fill-primary/25 stroke-primary' strokeWidth='2.5' strokeLinejoin='round' />
			{items.map((it, i) => {
				const [x, y] = point(i, Math.max(0.03, it.percent / 100))
				return <circle key={it.id} cx={x} cy={y} r='4' className='fill-primary' />
			})}
			{items.map((it, i) => {
				const [x, y] = point(i, 1.14)
				const anchor = Math.abs(x - c.x) < 8 ? 'middle' : x > c.x ? 'start' : 'end'
				const lines = splitLabel(it.label)
				const top = y < c.y - 8
				const startY = top ? y - lines.length * 15 : y + 4
				return (
					<text key={it.id} x={x} y={startY} textAnchor={anchor} className='fill-foreground text-[14px] font-semibold'>
						{lines.map((l, k) => (
							<tspan key={k} x={x} dy={k === 0 ? 0 : 15}>
								{l}
							</tspan>
						))}
						<tspan x={x} dy='15' className='fill-primary font-bold'>
							{it.percent}%
						</tspan>
					</text>
				)
			})}
		</svg>
	)
}
