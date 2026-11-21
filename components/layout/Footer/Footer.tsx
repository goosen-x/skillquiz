import Link from 'next/link'
import { Logo } from '@/components/global/Logo'
import { GooseLabsCredit } from '@/components/layout/GooseLabsCredit'
import { getCategoriesWithCounts } from '@/lib/quiz/catalog'
import { SITE } from '@/lib/site'

const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-foreground'

export function Footer() {
	const year = new Date().getFullYear()
	const categories = getCategoriesWithCounts()

	return (
		<footer className='mt-16 border-t border-border/60 bg-muted/30'>
			<div className='container py-12'>
				<div className='grid grid-cols-1 gap-10 md:grid-cols-12'>
					<div className='md:col-span-4'>
						<Link href='/' className='inline-flex items-center gap-2.5 font-heading text-xl font-bold'>
							<Logo size={32} />
							<span>
								Skill<span className='text-primary'>Quiz</span>
							</span>
						</Link>
						<p className='mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground'>
							Психологические и развивающие тесты с честным разбором результата. Бесплатно, без регистрации,
							с PDF и сравнением с другими прошедшими.
						</p>
					</div>

					<div className='grid grid-cols-2 gap-8 break-words sm:grid-cols-3 md:col-span-8'>
						<div className='col-span-2 sm:col-span-1'>
							<p className='mb-4 text-sm font-semibold'>Тесты</p>
							<ul className='space-y-3'>
								<li>
									<Link href='/tests' className={linkClass}>
										Все тесты
									</Link>
								</li>
								{categories.map(c => (
									<li key={c.id}>
										<Link href={`/tests/category/${c.id}`} className={linkClass}>
											{c.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div>
							<p className='mb-4 text-sm font-semibold'>Проект</p>
							<ul className='space-y-3'>
								<li>
									<Link href='/about' className={linkClass}>
										О проекте
									</Link>
								</li>
								<li>
									<Link href='/blog' className={linkClass}>
										Блог
									</Link>
								</li>
								<li>
									<Link href='/contact' className={linkClass}>
										Контакты
									</Link>
								</li>
								<li>
									<a href='/rss.xml' className={linkClass}>
										RSS
									</a>
								</li>
							</ul>
						</div>
						<div>
							<p className='mb-4 text-sm font-semibold'>Документы</p>
							<ul className='space-y-3'>
								<li>
									<Link href='/privacy' className={linkClass}>
										Политика конфиденциальности
									</Link>
								</li>
								<li>
									<Link href='/terms' className={linkClass}>
										Условия использования
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<p className='mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground'>
					Тесты на сайте помогают лучше понять себя, но не ставят диагноз и не заменяют консультацию психолога,
					психотерапевта или врача. Финансовые тесты не дают индивидуальных инвестиционных рекомендаций.
				</p>

				<div className='mt-8 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center'>
					<span>
						© {year} {SITE.name}. {SITE.domain}
					</span>
					<GooseLabsCredit />
				</div>
			</div>
		</footer>
	)
}
