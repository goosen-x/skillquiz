#!/usr/bin/env bash
# Деплой SkillQuiz на goosen: исходники → папка релиза → docker-образ на сервере →
# кандидат на 127.0.0.1:3021 → проверка здоровья → переключение на 3020.
# Старый контейнер работает, пока кандидат не прошёл /api/health.
#
#   scripts/deploy.sh            # тег = дата-время
#   scripts/deploy.sh v1.2       # свой тег
#   SKIP_CHECKS=1 scripts/deploy.sh   # без локальных проверок (не делать так без причины)
set -euo pipefail

HOST=${DEPLOY_HOST:-goosen}
ROOT=/opt/skillquiz
TAG=${1:-$(date +%Y%m%d-%H%M%S)}
REL=$ROOT/releases/$TAG
PORT=3020
CANDIDATE_PORT=3021

cd "$(dirname "$0")/.."
export PATH="/opt/homebrew/bin:$PATH"

if [ "${SKIP_CHECKS:-}" != "1" ]; then
	echo "→ проверки: typecheck, lint, unit"
	pnpm -s typecheck
	pnpm -s lint
	pnpm -s test
fi

echo "→ релиз $TAG на $HOST"
ssh "$HOST" "mkdir -p $REL"
rsync -az --delete \
	--exclude node_modules --exclude /.next --exclude .git --exclude '.env*' \
	--exclude /test-results --exclude /playwright-report --exclude '*.tmp.mjs' \
	./ "$HOST:$REL/"

ssh "$HOST" TAG="$TAG" REL="$REL" ROOT="$ROOT" PORT="$PORT" CANDIDATE_PORT="$CANDIDATE_PORT" bash -s <<'REMOTE'
set -euo pipefail
ENV_FILE=$ROOT/.env.production

# Первый запуск: сеть, пароль БД (генерируется и живёт только на сервере), Postgres
docker network inspect skillquiz-net >/dev/null 2>&1 || docker network create skillquiz-net >/dev/null
if [ ! -f "$ENV_FILE" ]; then
	PASS=$(openssl rand -hex 24)
	umask 077
	cat > "$ENV_FILE" <<ENV
POSTGRES_USER=skillquiz
POSTGRES_DB=skillquiz
POSTGRES_PASSWORD=$PASS
DATABASE_URL=postgresql://skillquiz:$PASS@skillquiz-db:5432/skillquiz
NEXT_PUBLIC_SITE_URL=https://skillquiz.ru
ENV
	echo "  создан $ENV_FILE"
fi
if ! docker inspect skillquiz-db >/dev/null 2>&1; then
	docker run -d --name skillquiz-db --restart unless-stopped \
		--network skillquiz-net --env-file "$ENV_FILE" \
		-v skillquiz-db-data:/var/lib/postgresql/data \
		--memory 256m postgres:16-alpine >/dev/null
	echo "  запущен skillquiz-db"
	sleep 5
fi

cd "$REL"
echo "→ сборка образа skillquiz:$TAG"
docker build -q -t "skillquiz:$TAG" . >/dev/null

run() { # имя порт
	docker run -d --name "$1" --restart unless-stopped \
		--network skillquiz-net --env-file "$ENV_FILE" -e RELEASE_TAG="$TAG" \
		-p "127.0.0.1:$2:3000" --memory 512m "skillquiz:$TAG" >/dev/null
}
healthy() { # порт
	for _ in $(seq 1 45); do
		if curl -fsS "http://127.0.0.1:$1/api/health" 2>/dev/null | grep -q "\"release\":\"$TAG\""; then return 0; fi
		sleep 2
	done
	return 1
}

docker rm -f skillquiz-candidate >/dev/null 2>&1 || true
run skillquiz-candidate "$CANDIDATE_PORT"
if ! healthy "$CANDIDATE_PORT"; then
	echo "✗ кандидат не прошёл проверку, старый контейнер не тронут"
	docker logs --tail 40 skillquiz-candidate || true
	docker rm -f skillquiz-candidate >/dev/null
	exit 1
fi
for path in / /tests /tests/stress-level /blog /sitemap.xml; do
	code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$CANDIDATE_PORT$path")
	if [ "$code" != "200" ]; then
		echo "✗ кандидат: $path → $code"
		docker rm -f skillquiz-candidate >/dev/null
		exit 1
	fi
done
echo "  кандидат здоров"

# Переключение: старый останавливаем только сейчас
docker rm -f skillquiz >/dev/null 2>&1 || true
run skillquiz "$PORT"
if ! healthy "$PORT"; then
	echo "✗ новый контейнер на $PORT не поднялся"
	docker logs --tail 40 skillquiz || true
	exit 1
fi
docker rm -f skillquiz-candidate >/dev/null
ln -sfn "$REL" "$ROOT/current"

# Чистка: последние 5 релизов и их образы
ls -1dt $ROOT/releases/* | tail -n +6 | xargs -r rm -rf
docker images skillquiz --format '{{.Tag}}' | grep -v "^$TAG$" | sort -r | tail -n +5 | xargs -r -I{} docker rmi "skillquiz:{}" >/dev/null 2>&1 || true
docker image prune -f >/dev/null
echo "✓ работает $TAG на 127.0.0.1:$PORT"
REMOTE
