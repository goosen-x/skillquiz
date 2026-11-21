/** Простое ограничение частоты в памяти процесса (один контейнер) */
const hits = new Map<string, number[]>()

export function allow(key: string, limit: number, windowMs: number): boolean {
	const now = Date.now()
	const list = (hits.get(key) ?? []).filter(t => now - t < windowMs)
	if (list.length >= limit) {
		hits.set(key, list)
		return false
	}
	list.push(now)
	hits.set(key, list)
	if (hits.size > 10_000) hits.clear()
	return true
}
