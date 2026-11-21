/**
 * Проверка всех тестов перед сборкой (pnpm build запускает его первым).
 * Падает с кодом 1, если у любого теста есть проблемы аудита.
 */
import { QUIZZES } from '../content/quizzes'
import { PLANNED_SLUGS } from '../content/quizzes/slugs'
import { auditQuiz } from '../lib/quiz/audit'

const slugs = QUIZZES.map(q => q.slug)
let failed = 0
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i)
if (dupes.length) {
	console.error(`✗ повторяются слаги: ${dupes.join(', ')}`)
	failed++
}
const unregistered = PLANNED_SLUGS.filter(s => !slugs.includes(s))
if (unregistered.length) {
	console.error(`✗ есть в slugs.ts, но нет в реестре: ${unregistered.join(', ')}`)
	failed++
}

const byKind: Record<string, number> = {}
for (const quiz of QUIZZES) {
	const { issues, witnesses } = auditQuiz(quiz, { allSlugs: slugs })
	byKind[quiz.kind] = (byKind[quiz.kind] ?? 0) + 1
	if (issues.length) {
		failed++
		console.error(`✗ ${quiz.slug}`)
		for (const i of issues) console.error(`    ${i}`)
	} else {
		console.log(`✓ ${quiz.slug.padEnd(24)} ${quiz.kind.padEnd(11)} ${String(quiz.questions.length).padStart(3)} вопр.  ${witnesses.length} наборов ответов`)
	}
}
console.log(`\nТестов: ${QUIZZES.length} (${Object.entries(byKind).map(([k, n]) => `${k} ${n}`).join(', ')})`)
if (failed) {
	console.error(`Проблем: ${failed}`)
	process.exit(1)
}
