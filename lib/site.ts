/** Общие константы сайта. Всё, что зависит от домена и бренда, берётся отсюда. */
export const SITE = {
	name: 'SkillQuiz',
	url: 'https://skillquiz.ru',
	domain: 'skillquiz.ru',
	locale: 'ru_RU',
	language: 'ru',
	description:
		'Бесплатные психологические тесты онлайн: личность, эмоции, отношения, карьера, мышление. Подробный разбор результата по шкалам, PDF и сравнение с другими прошедшими.',
	shortDescription: 'Психологические и развивающие тесты с подробным разбором результата',
	/** Почта появится, когда заведём ящик на домене; пока связь через Telegram */
	email: null as string | null,
	author: 'Дмитрий Борисенко',
	telegram: 'https://t.me/gooselabs',
	foundingYear: 2025
} as const

/** Публичный номер счётчика, не секрет: он всё равно виден в HTML */
export const YANDEX_METRIKA_ID = 104375294

/** Блок РСЯ старого проекта. Включается флагом NEXT_PUBLIC_ADS=on */
export const YANDEX_AD_BLOCK_ID = 'R-A-17422960-1'
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS === 'on'

export function absoluteUrl(path = '/'): string {
	if (path.startsWith('http')) return path
	return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
