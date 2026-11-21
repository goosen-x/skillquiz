'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from './nav'

interface Props {
	categories: Array<{ id: string; title: string; emoji: string }>
}

export function MobileMenu({ categories }: Props) {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	const close = () => setTimeout(() => setOpen(false), 50)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button
					type='button'
					aria-label='Открыть меню'
					className='flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/60 transition-colors hover:bg-muted md:hidden'
				>
					<Menu className='h-5 w-5 text-muted-foreground' />
				</button>
			</SheetTrigger>
			<SheetContent side='right' className='z-[100] flex w-[85vw] max-w-sm flex-col gap-1 overflow-y-auto px-3 pt-12'>
				<SheetTitle className='sr-only'>Меню</SheetTitle>
				<nav aria-label='Мобильная навигация' className='flex flex-col gap-1'>
					{NAV_ITEMS.map(({ href, label, match }) => (
						<Link
							key={href}
							href={href}
							onClick={close}
							aria-current={match(pathname) ? 'page' : undefined}
							className={cn(
								'rounded-xl px-3 py-3 text-base font-semibold transition-colors',
								match(pathname) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
							)}
						>
							{label}
						</Link>
					))}
				</nav>
				<div className='my-3 h-px bg-border' />
				<p className='px-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>Категории</p>
				{categories.map(c => (
					<Link
						key={c.id}
						href={`/tests/category/${c.id}`}
						onClick={close}
						className={cn(
							'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
							pathname === `/tests/category/${c.id}` ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
						)}
					>
						<span aria-hidden='true'>{c.emoji}</span>
						{c.title}
					</Link>
				))}
			</SheetContent>
		</Sheet>
	)
}
