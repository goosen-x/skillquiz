---
name: new-quiz
description:
  Добавить новый тест на SkillQuiz: один файл с описанием по виду (level, index,
  profile, typology, knowledge, calculator), регистрация и автопроверки.
  Использовать, когда просят добавить или перенести тест.
trigger: /new-quiz
---

# Новый тест SkillQuiz

Тест = один файл `content/quizzes/<slug>.ts`. Код экранов, подсчёта, PDF и SEO
трогать не нужно: всё строится из описания. Модель и правила подробно:
`docs/quiz-architecture.md`, спецификация полей в комментариях
`lib/quiz/types.ts`.

## 1. Выбрать вид

| Результат | Вид |
|---|---|
| одна величина: уровень стресса, самооценки | `level` |
| общий балл + 3–6 шкал-компонентов | `index` |
| несколько шкал без общего балла (Большая пятёрка) | `profile` |
| тип: темперамент, стиль, архетип | `typology` |
| правильные ответы, процент верных | `knowledge` |
| число по формуле: месяцы, рубли, проценты | `calculator` |

Шкала-симптом (выше = хуже) в `index`/`profile`: `direction: 'higher-worse'`.

## 2. Написать файл

Образцы: `stress-level.ts` (level), `emotional-intelligence.ts` (index),
`personality-type.ts` (profile), `temperament.ts` (typology),
`financial-literacy.ts` (knowledge), `financial-cushion.ts` (calculator).

```ts
import { defineLevelQuiz } from '@/lib/quiz/define'
export default defineLevelQuiz({ kind: 'level', slug: '…', … })
```

- Конструктор `defineXxxQuiz` выводит id шкал/типов/уровней: опечатка в ключе
  баллов или пропущенное описание типа не скомпилируется.
- Отрезки уровней и шкал: полуоткрытые [from, to), без дыр, 0–100 (у
  calculator — от `metric.min` до `metric.max`).
- 10–50 вопросов, 2–7 вариантов. Лайкерт: `likert(scale, text, { reverse })`,
  `likertLevel(text)`.
- Мета: `title` (H1, со словом «Тест»), `question`, `summary`, `seo.title` до
  70 знаков, `seo.description` 120–170, `learn` 3–5 пунктов со строчной,
  `intro` 2–3 абзаца, честный `method`, 4 `faq`, `related` 3–4 слага,
  `published` (YYYY-MM-DD).
- `seekHelp: true` только у уровней/типов, где честно нужен специалист.
  Телефонов, кроме 112, не писать.
- Дополнительный список к шаблону: `template.add` (для каждого ключа вида).
  Убрать можно только блоки без текста: `template.omit: ['comparison']` и т.п.

Тексты пишутся по правилам `~/.claude/skills/unslop/SKILL.md`: без длинного
тире «—», «ёлочки», без «является/ключевой/не только…но и», советы конкретные.

## 3. Зарегистрировать

1. Слаг в `content/quizzes/slugs.ts` (в свою категорию).
2. Импорт и строка в `content/quizzes/index.ts`.

## 4. Проверить (до «✓» и зелёного)

```bash
pnpm tsx scripts/audit-one.ts content/quizzes/<slug>.ts   # аудит одного файла
pnpm typecheck && pnpm lint
pnpm test            # аудит + результаты всех тестов + PDF
grep -n "—" content/quizzes/<slug>.ts   # пусто
```

Аудит ловит: лишние поля и чужой вид, пустые строки, дыры в отрезках,
недостижимые уровни/типы/отрезки шкал, тексты, которые не попадают ни в один
блок. Недостижимое — поправить границы или баллы, а не убирать проверку.

Потом e2e этого теста на обоих телефонах:

```bash
pnpm build && pnpm test:e2e -g "<slug>"
```

## 5. Выкатить

`scripts/deploy.sh` (см. CLAUDE.md). После деплоя проверить
`https://skillquiz.ru/tests/<slug>`.
