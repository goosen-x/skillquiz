# Claude Code Configuration - PsyTest

## 📋 Project Overview

PsyTest - платформа психологических тестов с необруталистическим дизайном и SEO-оптимизацией под Яндекс. Проект создан с использованием AI-агентов для ускорения разработки и повышения качества кода.

### Tech Stack

- Next.js 15.5.2 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Recharts (для визуализации данных)

### Key Features

- 113 психологических тестов
- Необруталистический дизайн
- SEO-оптимизация под Яндекс
- Адаптивный интерфейс
- Визуализация результатов через графики
- Микроанимации для улучшения UX

## 🤖 AI Agents Ecosystem

Проект включает **37 специализированных AI-агентов** организованных в **8 департаментов** для работы в рамках 6-дневных спринтов.

### Departments Overview

#### 🔧 Engineering (7 agents)

- **AI Engineer** - интеграция AI/ML функций
- **Backend Architect** - проектирование серверной архитектуры
- **DevOps Automator** - CI/CD и инфраструктура
- **Frontend Developer** - разработка пользовательских интерфейсов
- **Mobile App Builder** - мобильная разработка
- **Rapid Prototyper** - быстрое прототипирование MVP
- **Test Writer Fixer** - тестирование и исправление багов

#### 🎨 Design (5 agents)

- **Brand Guardian** - поддержание визуальной консистентности
- **UI Designer** - создание интерфейсов
- **UX Researcher** - исследование пользовательского опыта
- **Visual Storyteller** - визуальные нарративы
- **Whimsy Injector** - добавление деталей и личности

#### 📈 Marketing (7 agents)

- **Content Creator** - создание контента
- **Growth Hacker** - стратегии роста
- **App Store Optimizer** - ASO оптимизация
- **Instagram Curator** - Instagram стратегия
- **Reddit Community Builder** - Reddit присутствие
- **TikTok Strategist** - TikTok контент
- **Twitter Engager** - Twitter взаимодействие

#### 📊 Product (3 agents)

- **Feedback Synthesizer** - анализ обратной связи
- **Sprint Prioritizer** - приоритизация задач
- **Trend Researcher** - исследование трендов

#### 📋 Project Management (3 agents)

- **Experiment Tracker** - A/B тестирование
- **Project Shipper** - координация запусков
- **Studio Producer** - управление командой

#### 🏢 Studio Operations (5 agents)

- **Analytics Reporter** - аналитика и отчеты
- **Finance Tracker** - финансовое планирование
- **Infrastructure Maintainer** - поддержка инфраструктуры
- **Legal Compliance Checker** - юридическое соответствие
- **Support Responder** - поддержка пользователей

#### 🧪 Testing (5 agents)

- **API Tester** - тестирование API
- **Performance Benchmarker** - тестирование производительности
- **Test Results Analyzer** - анализ результатов тестов
- **Tool Evaluator** - оценка инструментов
- **Workflow Optimizer** - оптимизация процессов

#### 🔍 SEO (1 agent)

- **Yandex SEO Optimizer** - оптимизация под Яндекс (YATI, Королёв, Баден-Баден)

#### 🎁 Bonus (2 agents)

- **Studio Coach** - координация команды и мотивация
- **Joker** - поднятие настроения команды

#### 📝 Content (1 agent)

- **Psychological Test Creator** - создание научно обоснованных тестов

### Agent Usage Guidelines

При работе с проектом используйте агентов для:

1. **SEO оптимизации**:

   ```
   "Используй Yandex SEO агента для оптимизации страницы /tests под запрос 'психологические тесты онлайн'"
   ```

2. **Создания UI компонентов**:

   ```
   "Создай новый компонент карточки теста используя необруталистический дизайн"
   ```

3. **Добавления тестов**:

   ```
   "Добавь новый тест на эмоциональный интеллект с 20 вопросами"
   ```

4. **Анализа производительности**:
   ```
   "Используй Performance Benchmarker для проверки Core Web Vitals"
   ```

## 🎨 Neobrutalist Design System

### Core Principles

1. **Толстые границы**: 2px для всех элементов
2. **Жёсткие тени**: 4px 4px 0px 0px (без blur)
3. **Яркие цвета**: без градиентов и прозрачности
4. **Минимальные скругления**: border-radius только где необходимо
5. **Жирная типографика**: uppercase для заголовков

### Color Palette

```css
/* Background */
--background: oklch(96.22% 0.0569 95.61);
--secondary-background: oklch(93.5% 0.0569 95.61);

/* Foreground */
--foreground: oklch(0% 0 0); /* Чёрный */
--muted-foreground: oklch(40% 0 0); /* Серый */

/* Main Colors */
--main: oklch(84.08% 0.1725 84.2); /* Жёлтый */
--border: oklch(0% 0 0); /* Чёрный */

/* Chart Colors */
--chart-1: #ffbf00; /* Янтарный */
--chart-2: #0099ff; /* Голубой */
--chart-3: #ff7a05; /* Оранжевый */
--chart-4: #00d696; /* Мятный */
--chart-5: #7a83ff; /* Лавандовый */
```

### Shadow System

```css
/* Default shadow */
--shadow: 4px 4px 0px 0px #000000;

/* Hover shadow */
--shadow-hover: 6px 6px 0px 0px #000000;

/* Small shadow */
--shadow-sm: 2px 2px 0px 0px #000000;
```

## 🧩 Component Library

### UI Components (shadcn/ui based)

#### Base Components

- **Button** - кнопки с вариантами: default, outline, ghost, destructive
- **Card** - карточки с толстыми границами
- **Badge** - метки с цветовыми вариантами
- **Progress** - прогресс-бар с анимацией
- **Skeleton** - скелетоны для загрузки
- **Tabs** - вкладки в необруталистическом стиле

#### Neobrutalist Components

- **NeoCard** - карточка с цветными вариантами и hover эффектами
- **NeoBadge** - яркие метки с тенями
- **NeoStatCard** - карточка для статистики
- **NeoBrutalButton** - кнопка с усиленным необруталистическим стилем
- **GeometricSeparator** - геометрические разделители

#### Chart Components

- **SimpleChart** - простые графики (bar, line, pie)
- **NeoBrutalistRadarChart** - радарные диаграммы для результатов
- **Chart** (Recharts wrapper) - расширенные графики

#### Animation Components

- **AnimatedButton** - кнопки с микроанимациями
- **AnimatedCard** - карточки с анимацией при наведении
- **ConfettiEffect** - эффект конфетти для празднования
- **LoadingSpinner** - спиннеры загрузки
- **PageTransition** - анимация перехода между страницами
- **EngagementNotification** - уведомления для вовлечения

#### Content Components

- **Accordion** - аккордеон для FAQ и контента
- **Sonner** - тост-уведомления

### Test-Specific Components

- **TestInterface** - интерфейс прохождения теста
- **TestResults** - отображение результатов
- **ModernResultsBlock** - современный блок результатов с графиками
- **UniversalTestResults** - универсальный компонент результатов
- **TestIntroduction** - вступление к тесту
- **TestsCatalogPage** - каталог всех тестов

### Landing Components

- **Hero** - главный блок с CTA
- **Benefits** - преимущества платформы
- **TestCategories** - категории тестов
- **SocialProof** - социальное доказательство
- **RecentResults** - последние результаты
- **CTA** - призыв к действию

### SEO Components

- **Breadcrumbs** - хлебные крошки
- **StructuredData** - микроразметка Schema.org
- **TestStructuredData** - специальная разметка для тестов

## 📁 Project Structure

```
psytest-site/
├── TODO.md               # 📌 СПИСОК ЗАДАЧ ПРОЕКТА
├── CLAUDE.md             # 📌 КОНФИГУРАЦИЯ ДЛЯ CLAUDE CODE
├── src/
│   ├── app/              # Pages (App Router)
│   │   ├── tests/        # Страницы тестов
│   │   └── (root)        # Главная и общие страницы
│   ├── components/       # React components
│   │   ├── landing/      # Landing page components
│   │   ├── tests/        # Test components
│   │   ├── animations/   # Animation components
│   │   ├── charts/       # Chart components
│   │   ├── seo/          # SEO components
│   │   ├── shared/       # Shared components
│   │   └── ui/           # UI components library
│   ├── data/             # Test data (113 tests)
│   │   └── tests/        # Individual test files
│   ├── config/           # Configuration files
│   │   ├── site.config.ts
│   │   ├── metadata.config.ts
│   │   └── tests.config.ts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities
│   │   ├── seo/          # SEO utilities
│   │   ├── tests/        # Test utilities
│   │   └── utils/        # General utilities
│   └── types/            # TypeScript types
└── agents/               # AI agents
    └── content/          # Content-specific agents
```

## 🔧 Development Commands

```bash
# Development
npm run dev

# Quality checks (ALWAYS run before committing)
npm run lint
npm run build

# Type checking (add to package.json)
npm run typecheck
```

## ✅ Code Quality Standards

1. **TypeScript**: Строгая типизация везде
2. **Imports**: Использовать @ алиасы (`@/components`, `@/lib`)
3. **Components**: Следовать паттернам shadcn/ui
4. **Styling**: Только Tailwind классы, никаких inline стилей
5. **SEO**: Все страницы должны иметь metadata
6. **Animations**: Использовать Framer Motion для сложных анимаций
7. **Charts**: Использовать Recharts с необруталистическими стилями

## 🚀 Performance Requirements

- Lighthouse Score: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: <150KB (first load)
- Core Web Vitals: все в зелёной зоне

## 📝 Git Workflow

1. Создавать осмысленные коммиты
2. Использовать conventional commits:
   - `feat:` новая функциональность
   - `fix:` исправление багов
   - `docs:` документация
   - `style:` форматирование
   - `refactor:` рефакторинг
   - `test:` тесты
   - `chore:` рутинные задачи
3. Всегда проверять `npm run lint` и `npm run build`
4. Не коммитить сломанный код

## 🎯 Project Goals

1. **SEO**: ТОП-10 Яндекса по запросам "психологические тесты"
2. **UX**: Completion rate тестов >70%
3. **Performance**: Загрузка <3 секунд на 3G
4. **Design**: Узнаваемый необруталистический стиль
5. **Content**: 100+ качественных тестов к концу года ✅ (113 тестов)

## 🛠️ Component Usage Examples

### Creating a New Neobrutalist Component

```tsx
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';

export function TestCard({ test }) {
  return (
    <NeoCard color="yellow" hover>
      <NeoCardContent className="p-6">
        <NeoBadge color="blue">Популярный</NeoBadge>
        <h3 className="font-heading font-bold uppercase">{test.title}</h3>
        <p className="text-sm">{test.description}</p>
        <Button variant="outline" className="mt-4">
          Пройти тест
        </Button>
      </NeoCardContent>
    </NeoCard>
  );
}
```

### Using Animation Components

```tsx
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { ConfettiEffect } from '@/components/animations/ConfettiEffect';

export function TestComplete() {
  return (
    <>
      <ConfettiEffect />
      <AnimatedButton variant="default" animation="bounce" onClick={handleShare}>
        Поделиться результатом
      </AnimatedButton>
    </>
  );
}
```

## 🤝 Collaboration Notes

- Проект оптимизирован для работы с Claude Code
- Используйте агентов для рутинных задач
- Фокусируйтесь на качестве кода и UX
- Следуйте установленным паттернам
- Документируйте новые компоненты
- Тестируйте на мобильных устройствах

## 🔍 Quick Agent Commands

```bash
# Оптимизация SEO
"@yandex-seo-optimizer оптимизируй страницу под запрос X"

# Создание теста
"@psychological-test-creator создай тест на тему Y"

# Анализ производительности
"@performance-benchmarker проверь Core Web Vitals"

# UI улучшения
"@ui-designer улучши компонент Z"

# Добавление анимаций
"@whimsy-injector добавь микроанимации в результаты теста"
```

---

_Последнее обновление: 2025-09-05_
_Создано с помощью Claude Code и AI-агентов_
