import { Inter, Onest } from 'next/font/google'

// Текст интерфейса и вопросов
export const interFont = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	display: 'swap'
})

// Заголовки: кириллица у Onest родная, рисовалась вместе с латиницей
export const onestFont = Onest({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-onest',
	display: 'swap'
})
