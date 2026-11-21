import Link from 'next/link'
import { Logo } from '@/components/global/Logo'
import ThemeToggle from '@/components/global/ThemeToggle'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { getCategoriesWithCounts } from '@/lib/quiz/catalog'

export default function Header() {
	const categories = getCategoriesWithCounts().map(c => ({ id: c.id, title: c.title, emoji: c.emoji }))
	return (
		<header
			data-site-header
			className='sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75'
		>
			<div className='container flex h-16 items-center justify-between gap-3'>
				<Link
					href='/'
					className='group flex items-center gap-2.5 font-heading text-xl font-bold text-foreground'
					aria-label='SkillQuiz, на главную'
				>
					<Logo size={32} className='transition-transform group-hover:rotate-[-6deg]' />
					<span>
						Skill<span className='text-primary'>Quiz</span>
					</span>
				</Link>
				<Navigation />
				<div className='flex items-center gap-2'>
					<ThemeToggle />
					<MobileMenu categories={categories} />
				</div>
			</div>
		</header>
	)
}
