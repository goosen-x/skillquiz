/**
 * Склонение существительного после числительного: 1 тест, 2 теста, 5 тестов,
 * 11 тестов, 21 тест.
 */
export function pluralizeRu(count: number, [one, few, many]: [string, string, string]): string {
	const mod10 = count % 10
	const mod100 = count % 100
	if (mod100 >= 11 && mod100 <= 14) return many
	if (mod10 === 1) return one
	if (mod10 >= 2 && mod10 <= 4) return few
	return many
}

export const testsLabel = (n: number) => `${n} ${pluralizeRu(n, ['тест', 'теста', 'тестов'])}`
export const questionsLabel = (n: number) => `${n} ${pluralizeRu(n, ['вопрос', 'вопроса', 'вопросов'])}`
export const minutesLabel = (n: number) => `${n} ${pluralizeRu(n, ['минута', 'минуты', 'минут'])}`
export const peopleLabel = (n: number) => `${n} ${pluralizeRu(n, ['человек', 'человека', 'человек'])}`
