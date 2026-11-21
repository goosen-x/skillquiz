import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/api'
import { getAllQuizzes, getCategoriesWithCounts } from '@/lib/quiz/catalog'
import { SITE } from '@/lib/site'

/**
 * Даты lastmod стабильные: меняются только вместе с содержимым, иначе
 * поисковики перестают им доверять. Для тестов — published, для статей —
 * updated или date, для статики — дата последней правки текстов.
 */
const STATIC_UPDATED = '2026-11-21'

export default function sitemap(): MetadataRoute.Sitemap {
	const quizzes = getAllQuizzes()
	const posts = getAllPosts()
	const latestQuiz = quizzes.map(q => q.published).sort().at(-1) ?? STATIC_UPDATED
	const latestPost = posts.map(p => p.updated ?? p.date).sort().at(-1) ?? STATIC_UPDATED
	const url = (path: string) => `${SITE.url}${path}`

	return [
		{ url: url('/'), lastModified: [latestQuiz, latestPost].sort().at(-1), changeFrequency: 'weekly', priority: 1 },
		{ url: url('/tests'), lastModified: latestQuiz, changeFrequency: 'weekly', priority: 0.9 },
		...getCategoriesWithCounts().map(c => ({
			url: url(`/tests/category/${c.id}`),
			lastModified: quizzes.filter(q => q.category === c.id).map(q => q.published).sort().at(-1),
			changeFrequency: 'weekly' as const,
			priority: 0.8
		})),
		...quizzes.map(q => ({
			url: url(`/tests/${q.slug}`),
			lastModified: q.published,
			changeFrequency: 'monthly' as const,
			priority: 0.8
		})),
		{ url: url('/blog'), lastModified: latestPost, changeFrequency: 'weekly', priority: 0.7 },
		...posts.map(p => ({
			url: url(`/blog/${p.slug}`),
			lastModified: p.updated ?? p.date,
			changeFrequency: 'monthly' as const,
			priority: 0.6
		})),
		...['/about', '/contact', '/privacy', '/terms'].map(path => ({
			url: url(path),
			lastModified: STATIC_UPDATED,
			changeFrequency: 'yearly' as const,
			priority: 0.3
		}))
	]
}
