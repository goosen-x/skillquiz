import type { Metadata } from 'next'

/** Мета-роботс для страниц, которые не должны попадать в индекс (результаты по ссылке) */
export const NOINDEX: Metadata['robots'] = {
	index: false,
	follow: true,
	googleBot: { index: false, follow: true }
}
