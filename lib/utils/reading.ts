/** Время чтения в минутах: ~180 слов в минуту для русского текста */
export function readingMinutes(markdown: string): number {
	const words = markdown.replace(/[#>*_`[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.round(words / 180))
}
