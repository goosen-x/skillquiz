# SkillQuiz

Психологические и развивающие тесты с подробным разбором результата: https://skillquiz.ru

- 34 теста шести видов: уровень, индекс, профиль, тип, знания, расчёт
- результат собирается из типизированных блоков, PDF с кириллицей, ссылка на результат с OG-картинкой
- анонимное сравнение с другими прошедшими (Postgres)
- блог, SEO: sitemap, robots, RSS, llms.txt, JSON-LD

## Запуск

```bash
pnpm install
pnpm dev
```

Проверки: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e`.

Архитектура тестов: [docs/quiz-architecture.md](docs/quiz-architecture.md).
Как добавить тест: [.claude/skills/new-quiz/SKILL.md](.claude/skills/new-quiz/SKILL.md).
Сервер и деплой: [CLAUDE.md](CLAUDE.md).
