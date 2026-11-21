import { getAllPosts } from '@/lib/api'
import { KIND_LABELS, getAllQuizzes, getCategoriesWithCounts } from '@/lib/quiz/catalog'
import { SITE } from '@/lib/site'

const HEAD = `# SkillQuiz

> Бесплатные психологические и развивающие тесты на русском языке: личность и темперамент, стресс и эмоции, отношения, карьера, мышление, привычки, финансы. После теста: результат по шкалам с диаграммой, сильные стороны и зоны роста, рекомендации, сравнение с другими прошедшими, PDF и ссылка на результат. Без регистрации. Тесты для самопознания, не клиническая диагностика.`

/** Карта сайта для языковых моделей (llmstxt.org) */
export function buildLlmsTxt(): string {
	const quizzes = getAllQuizzes()
	const sections = getCategoriesWithCounts().map(c => {
		const lines = quizzes
			.filter(q => q.category === c.id)
			.map(q => `- [${q.title}](${SITE.url}/tests/${q.slug}): ${q.summary}`)
		return `## ${c.title}\n\n${c.description}\n\n${lines.join('\n')}`
	})
	const posts = getAllPosts().map(p => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.excerpt}`)
	return `${HEAD}

Подробные описания тестов: ${SITE.url}/llms-full.txt

${sections.join('\n\n')}

## Блог

${posts.join('\n')}

## Optional

- [Все тесты](${SITE.url}/tests)
- [О проекте](${SITE.url}/about)
- [Контакты](${SITE.url}/contact)
- [Политика конфиденциальности](${SITE.url}/privacy)
- [RSS блога](${SITE.url}/rss.xml)
`
}

/** Полные описания: вступление, методика и вопросы-ответы каждого теста */
export function buildLlmsFullTxt(): string {
	const blocks = getAllQuizzes().map(q =>
		[
			`## ${q.title}`,
			`Адрес: ${SITE.url}/tests/${q.slug}`,
			`Вид результата: ${KIND_LABELS[q.kind].toLowerCase()}. Вопросов: ${q.questions.length}, около ${q.minutes} мин.`,
			'',
			...q.intro,
			'',
			`Как считается: ${q.method}`,
			'',
			'После прохождения вы узнаете:',
			...q.learn.map(l => `- ${l}`),
			'',
			...q.faq.flatMap(f => [`В: ${f.q}`, `О: ${f.a}`, ''])
		].join('\n')
	)
	return `${HEAD}\n\n${blocks.join('\n\n')}`
}
