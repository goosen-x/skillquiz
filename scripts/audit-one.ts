/**
 * Проверка одного файла теста до добавления в реестр:
 *   pnpm tsx scripts/audit-one.ts content/quizzes/<slug>.ts
 * Печатает проблемы аудита (lib/quiz/audit.ts) и пример результата.
 */
import { resolve } from 'path'
import { pathToFileURL } from 'url'
import { auditQuiz } from '../lib/quiz/audit'
import { buildResult } from '../lib/quiz/engine'
import { PLANNED_SLUGS } from '../content/quizzes/slugs'
import type { AnyQuiz } from '../lib/quiz/types'

async function main() {
	const file = process.argv[2]
	if (!file) throw new Error('укажите путь к файлу теста')
	const mod = await import(pathToFileURL(resolve(file)).href)
	const quiz: AnyQuiz = mod.default?.default ?? mod.default
	const { issues, witnesses } = auditQuiz(quiz, { allSlugs: [...PLANNED_SLUGS] })
	if (issues.length) {
		console.log(`✗ ${quiz.slug}: ${issues.length} проблем`)
		for (const i of issues) console.log('  - ' + i)
		process.exit(1)
	}
	const sample = buildResult(quiz, witnesses[witnesses.length - 1])
	console.log(`✓ ${quiz.slug} (${quiz.kind}): ${quiz.questions.length} вопросов, проверено ${witnesses.length} наборов ответов`)
	console.log('  пример: ' + sample.blocks.map(b => b.type).join(' → '))
	if (process.argv.includes('--json')) console.log(JSON.stringify(sample, null, 2))
}

main().catch(e => {
	console.error(e)
	process.exit(1)
})
