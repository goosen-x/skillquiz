import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { getQuiz } from '@/lib/quiz/catalog'
import { questionsLabel } from '@/lib/utils/pluralize'

function escapeHtml(s: string) {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * Абзац, в котором только адрес теста (`/tests/<slug>`), превращается в
 * карточку теста с кнопкой. Так в статье удобно звать пройти тест.
 */
function quizCard(slug: string): string | null {
	const quiz = getQuiz(slug)
	if (!quiz) return null
	return `<div class="not-prose my-8 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6">
	<p style="margin:0" class="text-xs font-semibold uppercase tracking-wide text-primary">Тест · ${quiz.minutes} мин · ${questionsLabel(quiz.questions.length)}</p>
	<p style="margin:0.5rem 0 0" class="font-heading text-xl font-bold leading-snug">${escapeHtml(quiz.title)}</p>
	<p style="margin:0.5rem 0 0" class="text-base text-muted-foreground">${escapeHtml(quiz.summary)}</p>
	<a href="/tests/${quiz.slug}" style="text-decoration:none" class="mt-4 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Пройти тест</a>
</div>`
}

export default async function markdownToHtml(markdown: string): Promise<string> {
	const result = await remark().use(gfm).use(html, { sanitize: false }).process(markdown)
	return result
		.toString()
		.replace(/<p>\/tests\/([a-z0-9-]+)<\/p>/g, (m, slug: string) => quizCard(slug) ?? m)
		.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
		.replace(/<table>/g, '<div style="overflow-x:auto;margin:2rem 0"><table>')
		.replace(/<\/table>/g, '</table></div>')
}

/** Подзаголовки h2 для оглавления */
export function extractHeadings(markdown: string): string[] {
	return [...markdown.matchAll(/^## (.+)$/gm)].map(m => m[1].trim())
}
