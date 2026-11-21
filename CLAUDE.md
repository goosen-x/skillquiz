# SkillQuiz (skillquiz.ru)

Сайт психологических и развивающих тестов. Next.js 16 (App Router), React 19,
Tailwind 4, pnpm. Обвязка (layout, блог, SEO) взята из PixelTool
(`~/sites/pixeltool`), движок тестов свой.

Node и pnpm на Mac mini: `/opt/homebrew/bin` (добавить в PATH).

## Устройство

- `content/quizzes/<slug>.ts` — один файл на тест, реестр `index.ts`, список слагов `slugs.ts`
- `lib/quiz/` — модель (`types.ts`), шаблоны (`templates.ts`), подсчёт (`engine.ts`), блоки (`blocks.ts`), схемы (`schema.ts`), аудит (`audit.ts`), PDF (`pdf.ts`), кодек ссылки (`codec.ts`), статистика (`stats.ts`)
- `docs/quiz-architecture.md` — виды тестов, блоки, что проверяется
- `components/quiz/` — экран теста (`QuizRunner`), результат (`result/`), каталог
- `_posts/*.md` — статьи блога; абзац `/tests/<slug>` превращается в карточку теста
- `app/tests/[slug]/result/[code]` — результат по ссылке, код = ответы (`lib/quiz/codec.ts`), noindex

Как добавить тест: `.claude/skills/new-quiz/SKILL.md`.

## Команды

```bash
pnpm dev                 # нужен .env.local с DATABASE_URL (локальный Postgres, см. ниже)
pnpm typecheck && pnpm lint
pnpm test                # vitest: аудит всех тестов, результаты, PDF
pnpm build               # сначала validate:quizzes, потом next build
pnpm test:e2e            # Playwright на системном Chrome, поднимает next start на :3200
E2E_BASE_URL=https://skillquiz.ru pnpm test:e2e   # e2e по проду (результаты в БД не пишутся: webdriver)
```

Локальный Postgres: `~/.local/pgsql/bin`, данные `~/work/skillquiz-pg`, порт 5544:
`pg_ctl -D ~/work/skillquiz-pg -o "-p 5544 -k /tmp" start`, `.env.local`:
`DATABASE_URL=postgresql://postgres@localhost:5544/skillquiz`.

Скриншоты e2e: `~/work/skillquiz-shots/`.

## Сервер

`ssh goosen` (root@91.197.99.37). Другие сайты и контейнеры не трогать.

- `skillquiz` — приложение, `127.0.0.1:3020 → 3000`, сеть `skillquiz-net`
- `skillquiz-db` — Postgres 16, сеть `skillquiz-net`, порт наружу не опубликован, том `skillquiz-db-data`
- `/opt/skillquiz/.env.production` — пароль БД и DATABASE_URL, только на сервере, в git нет
- `/opt/skillquiz/releases/<тег>` — исходники релизов, `/opt/skillquiz/current` — текущий
- nginx: `/etc/nginx/sites-available/skillquiz.conf` (копия в `deploy/nginx-skillquiz.conf`), SSL certbot, www → 301 на без www

```bash
docker ps --filter name=skillquiz
docker logs skillquiz --tail 50
curl -s http://127.0.0.1:3020/api/health
```

## Деплой

`scripts/deploy.sh [тег]` с Mac mini: локальные проверки → rsync в релиз →
`docker build` на сервере → кандидат `skillquiz-candidate` на :3021 →
`/api/health` и ключевые страницы → только потом замена `skillquiz` на :3020.
Если кандидат не здоров, старый контейнер работает дальше.

Откат: `ssh goosen` → `docker images skillquiz` → перезапустить `skillquiz` со
старым тегом (команда `run` в `scripts/deploy.sh`).

## Аналитика

Метрика 104375294, цели: `test_start`, `test_complete`, `pdf_download`, `share`
(`lib/analytics/goals.ts`). РСЯ R-A-17422960-1 выключена, включается
`NEXT_PUBLIC_ADS=on` на этапе сборки.
