import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileDown, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuizCard } from '@/components/quiz/QuizCard'
import { HeroPreview } from '@/components/home/HeroPreview'
import { JsonLd } from '@/components/seo/JsonLd'
import { getAllQuizzes, getCategoriesWithCounts, getFeaturedCards } from '@/lib/quiz/catalog'
import { getAllPosts } from '@/lib/api'
import { SITE } from '@/lib/site'
import { testsLabel } from '@/lib/utils/pluralize'
import { formatDate } from '@/lib/utils'

const TITLE = 'Психологические тесты онлайн бесплатно с расшифровкой'
const DESCRIPTION =
	'Тесты на тип личности, темперамент, стресс, отношения и карьеру. Бесплатно и без регистрации: подробный разбор по шкалам, PDF и сравнение с другими.'

export const metadata: Metadata = {
	title: { absolute: `${TITLE} | SkillQuiz` },
	description: DESCRIPTION,
	alternates: { canonical: '/' },
	openGraph: { url: SITE.url, title: TITLE, description: DESCRIPTION }
}

const FAQ = [
	{
		q: 'Тесты правда бесплатные?',
		a: 'Да. Все тесты, разбор результата, PDF и ссылка на результат бесплатны и не требуют регистрации. Сайт живёт за счёт рекламы, а не платных расшифровок.'
	},
	{
		q: 'Насколько точны результаты?',
		a: 'Это опросники для самопознания. Часть построена по мотивам известных моделей (Большая пятёрка, теория привязанности, стили конфликта Томаса-Килманна), но это не клиническая диагностика, и диагноз по ним не ставят. Для точной оценки состояния нужен специалист.'
	},
	{
		q: 'Что происходит с моими ответами?',
		a: 'Ответы не привязаны к имени, почте или телефону. Для сравнения с другими мы сохраняем только тест, баллы по шкалам и время прохождения. Подробности в политике конфиденциальности.'
	},
	{
		q: 'Можно ли пройти тест с телефона?',
		a: 'Да, сайт сделан в первую очередь для телефона: один вопрос на экран, крупные варианты ответа. Прогресс сохраняется, поэтому тест можно закрыть и продолжить позже с того же вопроса.'
	},
	{
		q: 'Как поделиться результатом?',
		a: 'У каждого результата своя ссылка. Её можно отправить в Telegram, VK или WhatsApp или просто скопировать. Ещё результат можно скачать в PDF.'
	}
]

export default function HomePage() {
	const total = getAllQuizzes().length
	const featured = getFeaturedCards(8)
	const categories = getCategoriesWithCounts()
	const posts = getAllPosts().slice(0, 3)

	return (
		<main>
			<JsonLd
				data={{
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity: FAQ.map(f => ({
						'@type': 'Question',
						name: f.q,
						acceptedAnswer: { '@type': 'Answer', text: f.a }
					}))
				}}
			/>

			{/* Первый экран */}
			<section className='relative overflow-hidden'>
				<div
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_0%,hsl(var(--primary)/0.14),transparent_70%),radial-gradient(40%_50%_at_90%_30%,hsl(var(--accent)/0.12),transparent_70%)]'
				/>
				<div className='container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20'>
					<div className='hero-rise'>
						<p className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary'>
							<Sparkles className='h-3.5 w-3.5' aria-hidden='true' />
							{testsLabel(total)} с подробным разбором
						</p>
						<h1 className='mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl'>
							Психологические тесты, после которых понятно,{' '}
							<span className='text-primary'>что делать дальше</span>
						</h1>
						<p className='mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground'>
							Тип личности, темперамент, стресс, отношения, карьера и деньги. Отвечаете на вопросы, получаете
							результат по шкалам, сильные стороны, зоны роста и конкретные советы.
						</p>
						<div className='mt-8 flex flex-col gap-3 sm:flex-row'>
							<Button asChild size='lg' className='h-13 text-base'>
								<Link href='/tests'>
									Выбрать тест
									<ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
								</Link>
							</Button>
							<Button asChild size='lg' variant='outline' className='h-13 text-base'>
								<Link href='/tests/personality-type'>Начать с теста на тип личности</Link>
							</Button>
						</div>
						<ul className='mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-3'>
							<li className='flex items-center gap-2'>
								<ShieldCheck className='h-4 w-4 shrink-0 text-success' aria-hidden='true' />
								Без регистрации
							</li>
							<li className='flex items-center gap-2'>
								<FileDown className='h-4 w-4 shrink-0 text-success' aria-hidden='true' />
								Результат в PDF
							</li>
							<li className='flex items-center gap-2'>
								<Users className='h-4 w-4 shrink-0 text-success' aria-hidden='true' />
								Сравнение с другими
							</li>
						</ul>
					</div>
					<HeroPreview />
				</div>
			</section>

			{/* Категории */}
			<section className='container py-10' aria-labelledby='categories-title'>
				<div className='flex items-end justify-between gap-4'>
					<h2 id='categories-title' className='text-2xl sm:text-3xl'>
						Темы
					</h2>
					<Link href='/tests' className='text-sm font-semibold text-primary hover:underline'>
						Все тесты
					</Link>
				</div>
				<div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
					{categories.map(c => (
						<Link
							key={c.id}
							href={`/tests/category/${c.id}`}
							className='group flex flex-col gap-1 rounded-2xl border border-border/70 bg-card p-4 transition-all [corner-shape:squircle] hover:border-primary/40 hover:shadow-md'
						>
							<span className='text-2xl' aria-hidden='true'>
								{c.emoji}
							</span>
							<span className='mt-1 font-heading font-semibold leading-tight group-hover:text-primary'>{c.title}</span>
							<span className='text-xs text-muted-foreground'>{testsLabel(c.count)}</span>
						</Link>
					))}
				</div>
			</section>

			{/* Популярные */}
			<section className='container py-10' aria-labelledby='popular-title'>
				<h2 id='popular-title' className='text-2xl sm:text-3xl'>
					С чего начать
				</h2>
				<p className='mt-2 text-muted-foreground'>Тесты, которые проходят чаще всего.</p>
				<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{featured.map(q => (
						<QuizCard key={q.slug} quiz={q} />
					))}
				</div>
			</section>

			{/* Как это работает */}
			<section className='container py-10' aria-labelledby='how-title'>
				<h2 id='how-title' className='text-2xl sm:text-3xl'>
					Как устроен результат
				</h2>
				<div className='mt-6 grid gap-4 md:grid-cols-3'>
					{[
						{
							n: '1',
							title: 'Один вопрос на экран',
							text: 'Крупные варианты, удобно отвечать с телефона. Можно вернуться назад, а прогресс не потеряется, даже если закрыть вкладку.'
						},
						{
							n: '2',
							title: 'Разбор, а не ярлык',
							text: 'Итог, шкалы на диаграмме, что значит ваш уровень, сильные стороны, зоны роста и советы, которые можно сделать на этой неделе.'
						},
						{
							n: '3',
							title: 'Сравнение и PDF',
							text: 'Видно, как ваш результат выглядит на фоне других прошедших. Результат можно скачать в PDF или отправить ссылкой.'
						}
					].map(step => (
						<div key={step.n} className='rounded-2xl border border-border/70 bg-card p-6'>
							<span className='flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>
								{step.n}
							</span>
							<h3 className='mt-4 text-lg'>{step.title}</h3>
							<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{step.text}</p>
						</div>
					))}
				</div>
			</section>

			{/* Блог */}
			{posts.length > 0 && (
				<section className='container py-10' aria-labelledby='blog-title'>
					<div className='flex items-end justify-between gap-4'>
						<h2 id='blog-title' className='text-2xl sm:text-3xl'>
							Статьи
						</h2>
						<Link href='/blog' className='text-sm font-semibold text-primary hover:underline'>
							Все статьи
						</Link>
					</div>
					<div className='mt-6 grid gap-4 md:grid-cols-3'>
						{posts.map(p => (
							<Link
								key={p.slug}
								href={`/blog/${p.slug}`}
								className='group flex flex-col rounded-2xl border border-border/70 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md'
							>
								<time className='text-xs text-muted-foreground' dateTime={p.date}>
									{formatDate(p.date, 'ru-RU')}
								</time>
								<h3 className='mt-2 text-lg leading-snug group-hover:text-primary'>{p.title}</h3>
								<p className='mt-2 line-clamp-3 text-sm text-muted-foreground'>{p.excerpt}</p>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Вопросы */}
			<section className='container py-10' aria-labelledby='faq-title'>
				<h2 id='faq-title' className='text-2xl sm:text-3xl'>
					Частые вопросы
				</h2>
				<div className='mt-6 divide-y divide-border rounded-2xl border border-border/70 bg-card'>
					{FAQ.map(f => (
						<details key={f.q} className='group px-5 py-4 [&_summary::-webkit-details-marker]:hidden'>
							<summary className='flex cursor-pointer items-center justify-between gap-4 font-semibold'>
								{f.q}
								<span
									aria-hidden='true'
									className='text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45'
								>
									+
								</span>
							</summary>
							<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>{f.a}</p>
						</details>
					))}
				</div>
			</section>

			<section className='container py-10'>
				<div className='flex flex-col items-start gap-5 rounded-3xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 md:flex-row md:items-center md:justify-between'>
					<div>
						<h2 className='text-2xl sm:text-3xl'>Пять минут, и вы знаете о себе чуть больше</h2>
						<p className='mt-2 opacity-85'>Выберите тему, которая волнует сейчас.</p>
					</div>
					<Button asChild size='lg' variant='secondary' className='h-13 text-base'>
						<Link href='/tests'>
							Все тесты
							<ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
						</Link>
					</Button>
				</div>
			</section>
		</main>
	)
}
