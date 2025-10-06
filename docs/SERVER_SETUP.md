# Настройка сервера для CI/CD деплоя SkillQuiz

## Проблема с sudo в deployment скриптах

При автоматическом деплое через GitHub Actions возникает ошибка:

```
sudo: a terminal is required to read the password
```

## Решение

Выберите один из вариантов:

### Вариант 1: Настроить sudo без пароля для docker (рекомендуется)

1. Подключитесь к серверу по SSH
2. Выполните команду:

   ```bash
   sudo visudo
   ```

3. Добавьте в конец файла строку (замените `admin` на ваше имя пользователя):

   ```
   admin ALL=(ALL) NOPASSWD: /usr/bin/docker
   ```

4. Сохраните файл (Ctrl+X, затем Y, затем Enter)

### Вариант 2: Добавить пользователя в группу docker

1. Подключитесь к серверу по SSH
2. Выполните команду:

   ```bash
   sudo usermod -aG docker $USER
   ```

3. Выйдите и снова зайдите по SSH для применения изменений

4. Проверьте, что docker работает без sudo:

   ```bash
   docker ps
   ```

5. Обновите скрипт `~/deploy-scripts/deploy-skillquiz.sh`, убрав `sudo` перед docker командами

### Вариант 3: Использовать docker через systemd (для production)

Создайте systemd сервис для управления контейнером без sudo.

## Проверка настройки

После применения одного из решений:

1. Запустите деплой вручную из GitHub Actions:
   - Перейдите на https://github.com/goosen-x/skillquiz/actions
   - Выберите "Deploy to Production"
   - Нажмите "Run workflow"

2. Или сделайте любой коммит в main ветку для автоматического запуска

## Структура deployment скрипта

Скрипт `~/deploy-scripts/deploy-skillquiz.sh` должен выполнять следующие действия:

```bash
#!/bin/bash
set -e

IMAGE=$1
CONTAINER_NAME="skillquiz"
PORT=3002

echo "=== Deploying SkillQuiz ==="
echo "Docker image: $IMAGE"

# Остановить старый контейнер
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Скачать новый образ
docker pull $IMAGE

# Запустить новый контейнер
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $PORT:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e HOSTNAME=0.0.0.0 \
  -e NEXT_PUBLIC_SITE_URL=https://skillquiz.ru \
  $IMAGE

# Проверить статус
docker ps | grep $CONTAINER_NAME

echo "=== Deployment completed ==="
```

## Дополнительные настройки

### Логирование

Для просмотра логов контейнера:

```bash
docker logs skillquiz
docker logs -f skillquiz  # следить за логами в реальном времени
```

### Мониторинг

Добавьте health check в Dockerfile или docker run команду:

```bash
--health-cmd="curl -f http://localhost:3000/api/health || exit 1" \
--health-interval=30s \
--health-timeout=10s \
--health-retries=3
```

### Автоматическая очистка старых образов

Добавьте в скрипт деплоя:

```bash
# Очистить неиспользуемые образы
docker image prune -f
```
