import { AlertTriangle, CheckCircle2, CircleX, Info, Sparkles, Sprout, Target } from 'lucide-react'
import type { BlockOf, ResultBlock } from '@/lib/quiz/blocks'
import { cn } from '@/lib/utils'
import { Bars, Gauge, Radar, TONE_TEXT } from './charts'
import { Comparison } from './Comparison'

function Section({
	title,
	children,
	className,
	icon
}: {
	title?: string
	children: React.ReactNode
	className?: string
	icon?: React.ReactNode
}) {
	return (
		<section className={cn('rounded-3xl border border-border/70 bg-card p-5 sm:p-7', className)}>
			{title && (
				<h2 className='mb-4 flex items-center gap-2 text-xl sm:text-2xl'>
					{icon}
					{title}
				</h2>
			)}
			{children}
		</section>
	)
}

function Hero({ data }: { data: BlockOf<'hero'>['data'] }) {
	return (
		<section
			className='relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-6 sm:p-9'
			data-testid='result-hero'
		>
			<p className='text-sm font-semibold tracking-wide text-muted-foreground uppercase'>{data.eyebrow}</p>
			<div className='mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
				<p className={cn('font-heading text-3xl leading-tight font-bold sm:text-5xl', TONE_TEXT[data.tone])}>{data.title}</p>
				{data.value && (
					<p className='shrink-0 font-heading text-4xl font-bold tabular-nums sm:text-5xl' data-testid='result-value'>
						{data.value}
					</p>
				)}
			</div>
			<p className='mt-4 max-w-2xl text-lg leading-relaxed'>{data.summary}</p>
		</section>
	)
}

function Strengths({ data }: { data: BlockOf<'strengths'>['data'] }) {
	return (
		<div className='grid gap-4 md:grid-cols-2'>
			<Section title='Сильные стороны' icon={<Sparkles className='h-5 w-5 text-success' aria-hidden='true' />}>
				<ul className='space-y-3'>
					{data.strengths.map(s => (
						<li key={s} className='flex gap-3 leading-relaxed'>
							<CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-success' aria-hidden='true' />
							<span>{s}</span>
						</li>
					))}
				</ul>
			</Section>
			<Section title='Зоны роста' icon={<Sprout className='h-5 w-5 text-warning' aria-hidden='true' />}>
				<ul className='space-y-3'>
					{data.growth.map(s => (
						<li key={s} className='flex gap-3 leading-relaxed'>
							<Target className='mt-0.5 h-5 w-5 shrink-0 text-warning' aria-hidden='true' />
							<span>{s}</span>
						</li>
					))}
				</ul>
			</Section>
		</div>
	)
}

function AnswerReview({ data }: { data: BlockOf<'answerReview'>['data'] }) {
	return (
		<Section title={`Разбор ответов: ${data.correctCount} из ${data.total} верно`}>
			<ol className='space-y-4'>
				{data.items.map(item => (
					<li key={item.n} className={cn('rounded-2xl border p-4', item.correct ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5')}>
						<p className='font-semibold leading-snug'>
							{item.n}. {item.question}
						</p>
						<p className='mt-2 flex gap-2 text-sm'>
							{item.correct ? (
								<CheckCircle2 className='h-4 w-4 shrink-0 text-success' aria-hidden='true' />
							) : (
								<CircleX className='h-4 w-4 shrink-0 text-destructive' aria-hidden='true' />
							)}
							<span>
								Ваш ответ: <span className='font-medium'>{item.yourAnswer}</span>
							</span>
						</p>
						{!item.correct && (
							<p className='mt-1 pl-6 text-sm'>
								Верно: <span className='font-medium'>{item.correctAnswer}</span>
							</p>
						)}
						<p className='mt-2 pl-6 text-sm leading-relaxed text-muted-foreground'>{item.explanation}</p>
					</li>
				))}
			</ol>
		</Section>
	)
}

function Disclaimer({ data }: { data: BlockOf<'disclaimer'>['data'] }) {
	return (
		<aside
			className={cn(
				'flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed',
				data.seekHelp ? 'border-warning/40 bg-warning/10' : 'border-border bg-muted/40 text-muted-foreground'
			)}
			data-testid='result-disclaimer'
		>
			{data.seekHelp ? (
				<AlertTriangle className='mt-0.5 h-5 w-5 shrink-0 text-warning' aria-hidden='true' />
			) : (
				<Info className='mt-0.5 h-5 w-5 shrink-0' aria-hidden='true' />
			)}
			<div className='space-y-2'>
				{data.kind === 'psychology' ? (
					<p>
						Это не диагноз и не замена консультации специалиста. Тест помогает посмотреть на себя со стороны, но
						учитывает только ваши ответы на вопросы, а не всю жизненную ситуацию.
					</p>
				) : (
					<p>
						Это не индивидуальная инвестиционная или финансовая рекомендация. Расчёт ориентировочный и строится
						только на ваших ответах.
					</p>
				)}
				{data.seekHelp && (
					<p className='font-medium text-foreground'>
						Ваш результат говорит о том, что стоит поговорить с психологом, психотерапевтом или врачом. Если вам
						сейчас очень плохо или появились мысли о самоповреждении, звоните 112.
					</p>
				)}
			</div>
		</aside>
	)
}

/** Один блок. switch исчерпывающий: новый тип блока без отрисовки не соберётся */
export function ResultBlockView({ block, quizCode }: { block: ResultBlock; quizCode: string }) {
	switch (block.type) {
		case 'hero':
			return <Hero data={block.data} />
		case 'gauge':
			return (
				<Section title={block.data.label}>
					<Gauge data={block.data} />
				</Section>
			)
		case 'scaleChart':
			return (
				<Section title={block.data.title}>
					{block.data.chart === 'radar' ? (
						<>
							<Radar items={block.data.items} />
							<div className='mt-6'>
								<Bars items={block.data.items} />
							</div>
						</>
					) : (
						<Bars items={block.data.items} />
					)}
				</Section>
			)
		case 'scaleDetails':
			return (
				<Section title={block.data.title}>
					<div className='space-y-5'>
						{block.data.items.map(item => (
							<div key={item.id}>
								<p className='flex flex-wrap items-baseline justify-between gap-x-3 font-semibold'>
									<span>{item.label}</span>
									<span className='text-sm font-medium text-muted-foreground'>
										{item.level}, {item.percent}%
									</span>
								</p>
								<p className='mt-1.5 leading-relaxed text-muted-foreground'>{item.text}</p>
							</div>
						))}
					</div>
				</Section>
			)
		case 'text':
			return (
				<Section title={block.data.title}>
					<div className='space-y-3 text-[1.0625rem] leading-relaxed'>
						{block.data.paragraphs.map(p => (
							<p key={p}>{p}</p>
						))}
					</div>
				</Section>
			)
		case 'list':
			return (
				<Section title={block.data.title}>
					<ul className='space-y-2.5'>
						{block.data.items.map(item => (
							<li key={item} className='flex gap-3 leading-relaxed'>
								<span className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' aria-hidden='true' />
								<span>{item}</span>
							</li>
						))}
					</ul>
				</Section>
			)
		case 'strengths':
			return <Strengths data={block.data} />
		case 'recommendations':
			return (
				<Section title={block.data.title} className='border-primary/25'>
					<ol className='space-y-3'>
						{block.data.items.map((item, i) => (
							<li key={item} className='flex gap-3 leading-relaxed'>
								<span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground'>
									{i + 1}
								</span>
								<span>{item}</span>
							</li>
						))}
					</ol>
				</Section>
			)
		case 'secondary':
			return (
				<Section title={block.data.title}>
					<p className='font-heading text-xl font-bold'>
						{block.data.typeTitle} <span className='text-base font-medium text-muted-foreground'>· {block.data.percent}% ответов</span>
					</p>
					<p className='mt-2 leading-relaxed text-muted-foreground'>{block.data.text}</p>
				</Section>
			)
		case 'comparison':
			return <Comparison data={block.data} code={quizCode} />
		case 'answerReview':
			return <AnswerReview data={block.data} />
		case 'breakdown':
			return (
				<Section title={block.data.title}>
					<dl className='divide-y divide-border'>
						{block.data.items.map(item => (
							<div key={item.label} className='flex items-baseline justify-between gap-4 py-3'>
								<dt className='text-muted-foreground'>{item.label}</dt>
								<dd className='shrink-0 text-right font-semibold tabular-nums'>{item.value}</dd>
							</div>
						))}
					</dl>
				</Section>
			)
		case 'disclaimer':
			return <Disclaimer data={block.data} />
		default: {
			const never: never = block
			return never
		}
	}
}

export function ResultBlocks({ blocks, code }: { blocks: ResultBlock[]; code: string }) {
	return (
		<div className='space-y-4 sm:space-y-5' data-testid='result-blocks'>
			{blocks.map((block, i) => (
				<div key={`${block.type}-${i}`} data-block={block.type}>
					<ResultBlockView block={block} quizCode={code} />
				</div>
			))}
		</div>
	)
}
