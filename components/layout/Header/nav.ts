export const NAV_ITEMS = [
	{ href: '/tests', label: 'Все тесты', match: (p: string) => p.startsWith('/tests') },
	{ href: '/blog', label: 'Блог', match: (p: string) => p.startsWith('/blog') },
	{ href: '/about', label: 'О проекте', match: (p: string) => p === '/about' },
	{ href: '/contact', label: 'Контакты', match: (p: string) => p === '/contact' }
] as const
