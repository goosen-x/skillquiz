'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from './nav'

export function Navigation() {
	const pathname = usePathname()
	return (
		<nav aria-label='Основная навигация' className='hidden items-center gap-1 md:flex'>
			{NAV_ITEMS.map(({ href, label, match }) => {
				const active = match(pathname)
				return (
					<Link
						key={href}
						href={href}
						aria-current={active ? 'page' : undefined}
						className={cn(
							'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors [corner-shape:squircle]',
							active
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground'
						)}
					>
						{label}
					</Link>
				)
			})}
		</nav>
	)
}
