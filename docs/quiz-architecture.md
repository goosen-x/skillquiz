# Архитектура тестов SkillQuiz

В прошлой версии сайта результат теста собирался вручную в каждом файле: у одного теста `symptoms` и `urgent_actions`, у другого `famous_people` и `childhood_origins`, у третьего `factors`. Общий экран результата пытался показать всё сразу. Отсюда пустые блоки, `undefined` в тексте и компоненты, которым приходили чужие данные. Половина тестов вообще падала на экране результата, потому что функция подсчёта возвращала поля, которых шаблон не ждал.

Новая схема устроена так, чтобы эта ошибка была невозможна по построению:

1. Тест описывается одним файлом `content/quizzes/<slug>.ts` с полем `kind`. Вид определяет форму вопросов, правило подсчёта и содержание результата.
2. Подсчёт и сборка результата лежат в движке (`lib/quiz/engine.ts`), а не в файле теста. В файле теста только данные.
3. Результат собирается из блоков по шаблону вида (`lib/quiz/templates.ts`). Строитель каждого блока возвращает данные, а не `null`: если блок в шаблоне, данные для него есть всегда.
4. Проверки (`lib/quiz/schema.ts`, `lib/quiz/audit.ts`) гоняются по всем тестам в юнит-тестах и перед каждой сборкой.

## Виды тестов

| Вид (`kind`) | Что измеряет | Вопросы и варианты | Как считается | Блоки результата (шаблон) |
|---|---|---|---|---|
| `level` | Одну величину: уровень стресса, тревожности, самооценки | Вариант даёт `score` (целое ≥ 0) | Сумма баллов → процент от диапазона [минимум, максимум] → уровень `bands` | итог, шкала с отметкой, сравнение, описание, сильные стороны и зоны роста, рекомендации, оговорка |
| `index` | Общий показатель из нескольких составляющих: эмоциональный интеллект, устойчивость | Вариант даёт `points` одной или нескольким шкалам | Процент по каждой шкале, общий индекс = среднее процентов → уровень `bands`; шкала → свой отрезок `bands` | итог, шкала с отметкой, диаграмма шкал, сравнение, описание, разбор по шкалам, сильные стороны и зоны роста, рекомендации, оговорка |
| `profile` | Независимые шкалы без общего балла: Большая пятёрка | Вариант даёт `points` шкалам | Процент по каждой шкале; самые высокие и низкие шкалы → сильные стороны и зоны роста | итог, диаграмма шкал (радар от 5 шкал), сравнение по каждой шкале, разбор по шкалам, сильные стороны и зоны роста, рекомендации, оговорка |
| `typology` | Тип: темперамент, стиль привязанности, язык любви | Вариант даёт `points` одному или нескольким типам | Сумма по типам, побеждает максимальный, при равенстве — тот, что раньше в `tieOrder`; второй по сумме — «второй тип» | итог (тип), диаграмма типов, сравнение (доля типа), описание, черты, сильные стороны и зоны роста, второй тип, рекомендации, оговорка |
| `knowledge` | Знания: финансовая грамотность, когнитивные искажения | 2–6 вариантов, `correct` — индекс верного, `explanation`, `topic` | Процент верных → уровень `bands`; процент по темам | итог (X из N), шкала с отметкой, сравнение, результат по темам, сильные и слабые темы, рекомендации, разбор каждого ответа |
| `calculator` | Числовой показатель: на сколько месяцев хватит подушки | Вопрос задаёт переменную `variable`, вариант — её `value` | Функция `metric.compute(переменные)` → значение → уровень `bands` в единицах показателя | итог (число), из чего складывается, шкала с отметкой, сравнение, описание, рекомендации, оговорка |

Сюда же ложатся типичные будущие тесты:

| Будущий тест | Вид |
|---|---|
| Психологические шкалы (одна величина) | `level` |
| Опросник с факторами и общим баллом | `index` |
| Типы личности, стили, архетипы | `typology` (тип) или `profile` (шкалы без общего балла) |
| Тест на знания, экзамен, викторина | `knowledge` |
| Риск-профиль инвестора | `level` (шкала «осторожность → готовность к риску», уровни = профили) |
| Финансовая грамотность | `knowledge` |
| Расчёт показателя (подушка, долговая нагрузка, пенсионный разрыв) | `calculator` |
| Карьерная матрица компетенций и уровень | `index` (шкалы = компетенции, уровни = грейды «начинающий → эксперт») |

## Блоки и их данные

Каждый блок объявляет тип своих данных (`lib/quiz/blocks.ts`) и zod-схему (`blockSchema` в `lib/quiz/schema.ts`). Компонент блока на экране (`components/quiz/result/blocks.tsx`) и его отрисовка в PDF (`lib/quiz/pdf.ts`) получают только эти данные.

| Блок (`type`) | Данные | Откуда берутся |
|---|---|---|
| `hero` | надпись, итог, крупное значение или `null`, вывод, тон | уровень (`title`, `summary`, `tone`), тип (`title`, `tagline`), профиль (`profileLabel`, `profileSummary` + две ведущие шкалы) |
| `gauge` | процент, подпись значения, отрезки с тоном, активный отрезок, подписи краёв | `bands` вида, `scale.lowLabel/highLabel` у `level` |
| `scaleChart` | заголовок, столбцы или радар, шкалы: подпись, процент, уровень | шкалы `index`/`profile`, типы `typology`, темы `knowledge` |
| `scaleDetails` | шкалы с текстом отрезка | `scales.*.bands[].text` |
| `text` | заголовок, абзацы | `bands.*.description`, `types.*.description` |
| `list` | заголовок, пункты | `types.*.traits`, дополнительные списки `template.add` |
| `strengths` | сильные стороны, зоны роста | `bands.*.strengths/growth` у `level`, `types.*.strengths/growth`, `scales.*.strength/growth` двух-трёх крайних шкал, `topics.*.strength/growth` |
| `recommendations` | заголовок, пункты | `bands.*.recommendations` (+ `scales.*.tips` слабых шкал у `index` и `profile`), `types.*.recommendations` |
| `secondary` | заголовок, второй тип, текст, процент | `types.*.secondary` |
| `comparison` | тест, метрики (ключ, подпись, значение) или тип, ориентир при случайных ответах | метрики результата; сами проценты по людям приходят с сервера (`/api/stats`) |
| `answerReview` | вопрос, ваш ответ, верный, верно ли, разбор | `questions[].options/correct/explanation` |
| `breakdown` | пункты «подпись — значение» | `breakdown[].compute` |
| `disclaimer` | психология или финансы, советовать ли специалиста | `disclaimer` теста, `seekHelp` уровня |

## Переопределение шаблона

Тест может отличаться от шаблона своего вида только через поле `template`:

- `omit` убирает блок. Разрешены только блоки без собственного текста (сравнение, шкала с отметкой, диаграммы), список задан типом для каждого вида. Убрать блок с содержанием нельзя: его тексты стали бы лишними данными.
- `add` добавляет блок-список после указанного слота (тип слота проверяется). Данные задаются для каждого ключа вида: для каждого типа у `typology`, каждого уровня у `level`/`index`/`knowledge`/`calculator`, каждой шкалы у `profile`. Пустым такой блок не бывает.

## Что проверяется автоматически

На этапе компиляции (`pnpm typecheck`):

- поле чужого вида в описании теста (`bands` у типологии, `scales` у `level`) — ошибка, объектные литералы проверяются на лишние ключи;
- баллы можно начислить только существующей шкале или типу: идентификаторы выводятся дженериками из `scales`/`types`;
- `Record<S, ScaleDef>` и `Record<T, TypeDef>` требуют описания для каждой шкалы и каждого типа;
- шаблон каждого вида перечисляет все его слоты (`Exhaustive` в `templates.ts`); экран и PDF делают исчерпывающий `switch` по типу блока.

В юнит-тестах (`pnpm test`) и перед сборкой (`pnpm validate:quizzes` внутри `pnpm build`):

- строгая zod-схема описания: лишние ключи, пустые строки, `undefined`/`NaN`/`[object Object]`, минимальные длины списков, длины SEO-полей;
- отрезки уровней и шкал покрывают диапазон без дыр и перекрытий;
- каждый уровень, каждый тип (и как основной, и как второй), каждый отрезок каждой шкалы, каждая тема реально получаются при каких-то ответах. Ответы ищет перебор со спуском (`searchAnswers`);
- на всех найденных ответах, на «все первые», «все последние» и на случайных ответах результат собирается, каждый блок проходит схему, в тексте нет `undefined`, `NaN`, пустых строк, проценты в пределах 0–100;
- проверка лишних данных: каждая строка содержания теста (описания, советы, разборы, дополнительные списки) хоть раз попадает в какой-то блок;
- PDF строится из тех же блоков, что и экран (`lib/quiz/pdf.ts` перебирает `result.blocks`).

## Тесты старого проекта

В реестре старого проекта (`src/data/tests.ts`, тег `legacy-psytest`) было 113 карточек, но вопросы и подсчёт были только у 31 теста (`src/data/*-test.ts`; `impostor-syndrome.ts` — дубль). Остальные карточки были заглушками без содержания. Из 31 рабочими считались 10, у остальных падал экран результата. В новой версии перенесены все 31 и добавлены три новых теста на виды, которых раньше не было.

| Старый файл | Новый слаг | Вид | Категория |
|---|---|---|---|
| stress-level-test.ts | stress-level | level | Эмоции и стресс |
| anxiety-level-test.ts | anxiety-level | level/index | Эмоции и стресс |
| emotional-stability-test.ts | emotional-stability | level/index | Эмоции и стресс |
| self-esteem-test.ts | self-esteem | level/index | Эмоции и стресс |
| perfectionism-test.ts | perfectionism | level/index | Эмоции и стресс |
| emotional-intelligence-test.ts | emotional-intelligence | index | Эмоции и стресс |
| mental-resilience-test.ts | mental-resilience | index | Эмоции и стресс |
| impostor-syndrome-test.ts, impostor-syndrome.ts | impostor-syndrome | index | Эмоции и стресс |
| personality-type-test.ts | personality-type | profile | Личность |
| temperament-test.ts | temperament | typology | Личность |
| introvert-extrovert-test.ts | introvert-extrovert | level | Личность |
| attachment-style-test.ts | attachment-style | typology | Отношения |
| love-language-test.ts | love-language | typology | Отношения |
| communication-style-test.ts | communication-style | typology | Отношения |
| conflict-style-test.ts | conflict-style | typology | Отношения |
| social-intelligence-test.ts | social-intelligence | level/index | Отношения |
| work-motivation-test.ts | work-motivation | typology | Карьера |
| management-style-test.ts | management-style | typology | Карьера |
| sales-potential-test.ts | sales-potential | level/index | Карьера |
| entrepreneurship-test.ts | entrepreneurship | level/index | Карьера |
| work-life-balance-test.ts | work-life-balance | level/index | Карьера |
| learning-style-test.ts | learning-style | typology | Мышление |
| memory-type-test.ts | memory-type | typology | Мышление |
| decision-making-test.ts | decision-making | typology | Мышление |
| creativity-test.ts | creativity | level/index | Мышление |
| procrastination-test.ts | procrastination | level/index | Продуктивность |
| time-management-test.ts | time-management | level/index | Продуктивность |
| chronotype-test.ts | chronotype | typology | Продуктивность |
| dopamine-detox-test.ts | dopamine-detox | index | Продуктивность |
| digital-wellness-test.ts | digital-habits | typology | Продуктивность |
| risk-tolerance-test.ts | risk-profile | level | Финансы |
| — (новый) | financial-literacy | knowledge | Финансы |
| — (новый) | financial-cushion | calculator | Финансы |
| — (новый) | cognitive-biases | knowledge | Мышление |

«level/index»: вид выбирается по старому подсчёту. Если у вопросов были категории по 3 и больше вопросов и разбор по ним полезен, тест стал `index`, иначе `level`. Итоговый вид каждого теста виден в `content/quizzes/<slug>.ts` и в отчёте `pnpm validate:quizzes`.

## Как добавить тест

Коротко: один файл `content/quizzes/<slug>.ts` + строка в `content/quizzes/index.ts` + слаг в `content/quizzes/slugs.ts`, затем `pnpm tsx scripts/audit-one.ts content/quizzes/<slug>.ts` до «✓». Подробно: `.claude/skills/new-quiz/SKILL.md`.
