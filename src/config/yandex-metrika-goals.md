# 🎯 Цели Яндекс.Метрики для PsyTest

## Основные цели

### 1. Тесты

- **test_start** - Начало прохождения теста
  - Параметры: test_id
- **test_complete** - Завершение теста
  - Параметры: test_id, result_type
- **test_share** - Шаринг результатов
  - Параметры: test_id, platform (vk, telegram, twitter)
- **test_abandon** - Прерывание теста
  - Параметры: test_id, question_number

### 2. Навигация

- **category_view** - Просмотр категории тестов
  - Параметры: category (psychology, career, lifestyle)
- **test_view** - Просмотр страницы теста
  - Параметры: test_id
- **results_view** - Просмотр результатов
  - Параметры: test_id, result_type

### 3. Взаимодействие

- **easter_egg_found** - Найден пасхальный элемент
  - Параметры: egg_type (konami, rapid_click, etc.)
- **notification_click** - Клик по уведомлению
  - Параметры: notification_type
- **footer_link_click** - Клик по ссылке в футере
  - Параметры: link_type

### 4. Конверсии

- **signup** - Регистрация (когда добавим)
- **save_results** - Сохранение результатов
- **download_pdf** - Скачивание PDF (когда добавим)

## Настройка в интерфейсе Яндекс.Метрики

1. Зайдите в настройки счетчика
2. Перейдите в раздел "Цели"
3. Создайте JavaScript-событие для каждой цели
4. Используйте идентификаторы из списка выше

## Использование в коде

```typescript
import { useYandexMetrika } from '@/hooks/useYandexMetrika';

function TestInterface() {
  const { trackTestStart, trackTestComplete } = useYandexMetrika();

  const handleStart = () => {
    trackTestStart('personality-type');
  };

  const handleComplete = (result: string) => {
    trackTestComplete('personality-type', result);
  };
}
```
