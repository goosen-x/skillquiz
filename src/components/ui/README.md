# Neobrutalist Component Library

> Единая библиотека компонентов в стиле необрутализм на базе shadcn/ui

## 📋 Overview

Эта библиотека предоставляет набор готовых компонентов в необруталистическом стиле для проекта PsyTest. Все компоненты построены на базе shadcn/ui и оптимизированы для быстрой разработки.

## 🎨 Design Principles

### Core Rules

1. **Границы**: Всегда 2px сплошные черные
2. **Тени**: 4px 4px 0px 0px #000000 (без blur)
3. **Цвета**: Яркие, без градиентов
4. **Скругления**: Минимальные или отсутствуют
5. **Типографика**: Bold, часто UPPERCASE

### Color System

```tsx
const colors = {
  // Backgrounds
  background: 'oklch(96.22% 0.0569 95.61)',
  secondaryBackground: 'oklch(93.5% 0.0569 95.61)',

  // Main colors
  main: 'oklch(84.08% 0.1725 84.2)', // Yellow
  border: 'oklch(0% 0 0)', // Black

  // Chart colors
  chart1: '#FFBF00', // Amber
  chart2: '#0099FF', // Blue
  chart3: '#FF7A05', // Orange
  chart4: '#00D696', // Mint
  chart5: '#7A83FF', // Lavender
};
```

## 🧩 Components

### Basic Components

#### Button

```tsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

#### Card

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Заголовок карточки</CardTitle>
  </CardHeader>
  <CardContent>Контент карточки</CardContent>
</Card>;
```

#### Badge

```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

### Neobrutalist Components

#### NeoCard

```tsx
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';

// Colors: white, yellow, blue, orange, green, purple
<NeoCard color="yellow" hover>
  <NeoCardContent>
    Контент в необруталистической карточке
  </NeoCardContent>
</NeoCard>

// Without hover effect
<NeoCard color="blue" hover={false}>
  <NeoCardContent>
    Статичная карточка
  </NeoCardContent>
</NeoCard>
```

#### NeoBadge

```tsx
import { NeoBadge } from '@/components/ui/neo-card';

<NeoBadge color="yellow">Новый</NeoBadge>
<NeoBadge color="blue">Популярный</NeoBadge>
<NeoBadge color="green">Активный</NeoBadge>
```

#### NeoStatCard

```tsx
import { NeoStatCard } from '@/components/ui/neo-card';

<NeoStatCard
  title="Пользователей"
  value="1,234"
  description="За последний месяц"
  icon={<Users className="w-6 h-6" />}
  color="yellow"
/>;
```

#### GeometricSeparator

```tsx
import { GeometricSeparator } from '@/components/ui/geometric-separator';

// Types: zigzag, dots, squares, triangles, wave
<GeometricSeparator type="zigzag" />
<GeometricSeparator type="dots" color="#FFBF00" />
```

### Form Components

#### Progress

```tsx
import { Progress } from '@/components/ui/progress';

<Progress value={66} className="w-full" />;
```

#### Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Вкладка 1</TabsTrigger>
    <TabsTrigger value="tab2">Вкладка 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Контент 1</TabsContent>
  <TabsContent value="tab2">Контент 2</TabsContent>
</Tabs>;
```

#### Accordion

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Вопрос 1</AccordionTrigger>
    <AccordionContent>Ответ на первый вопрос</AccordionContent>
  </AccordionItem>
</Accordion>;
```

### Animation Components

#### AnimatedButton

```tsx
import { AnimatedButton } from '@/components/animations/AnimatedButton';

// Animations: bounce, shake, pulse
<AnimatedButton variant="default" animation="bounce" onClick={handleClick}>
  Анимированная кнопка
</AnimatedButton>;
```

#### AnimatedCard

```tsx
import { AnimatedCard } from '@/components/animations/AnimatedCard';

<AnimatedCard delay={0.1}>
  <h3>Карточка с анимацией</h3>
  <p>Появляется при загрузке</p>
</AnimatedCard>;
```

#### LoadingSpinner

```tsx
import { LoadingSpinner } from '@/components/animations/LoadingSpinner';

<LoadingSpinner size="md" color="yellow" />;
```

#### ConfettiEffect

```tsx
import { ConfettiEffect } from '@/components/animations/ConfettiEffect';

// Запускается автоматически при монтировании
<ConfettiEffect />;
```

### Chart Components

#### SimpleChart

```tsx
import { SimpleChart } from '@/components/ui/simple-chart';

<SimpleChart
  type="bar"
  data={[
    { label: 'Янв', value: 65 },
    { label: 'Фев', value: 75 },
    { label: 'Мар', value: 85 },
  ]}
/>;
```

#### NeoBrutalistRadarChart

```tsx
import { NeoBrutalistRadarChart } from '@/components/charts/NeoBrutalistRadarChart';

<NeoBrutalistRadarChart
  data={[
    { subject: 'Эмпатия', value: 80 },
    { subject: 'Самоконтроль', value: 65 },
    { subject: 'Мотивация', value: 90 },
  ]}
/>;
```

### Notification Components

#### Sonner (Toast)

```tsx
import { toast } from 'sonner';

// Success
toast.success('Тест успешно пройден!');

// Error
toast.error('Произошла ошибка');

// Info
toast.info('Подсказка для пользователя');
```

#### EngagementNotification

```tsx
import { EngagementNotification } from '@/components/animations/EngagementNotification';

<EngagementNotification />;
```

## 📦 Component Patterns

### Composition Pattern

```tsx
// Используйте композицию для создания сложных компонентов
<NeoCard color="yellow">
  <NeoCardContent className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-heading font-bold uppercase">Заголовок</h3>
      <NeoBadge color="blue">Метка</NeoBadge>
    </div>
    <Progress value={75} />
    <Button variant="outline" className="w-full">
      Действие
    </Button>
  </NeoCardContent>
</NeoCard>
```

### Animation Pattern

```tsx
// Добавляйте анимации для улучшения UX
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <NeoCard color="orange" hover>
    <NeoCardContent>Анимированный контент</NeoCardContent>
  </NeoCard>
</motion.div>
```

### Responsive Pattern

```tsx
// Используйте адаптивные классы Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <NeoCard key={item.id} color="white" hover>
      <NeoCardContent>{item.content}</NeoCardContent>
    </NeoCard>
  ))}
</div>
```

## 🎯 Best Practices

### 1. Consistent Spacing

```tsx
// Используйте стандартные отступы
const spacing = {
  xs: 'p-2', // 8px
  sm: 'p-4', // 16px
  md: 'p-6', // 24px
  lg: 'p-8', // 32px
  xl: 'p-12', // 48px
};
```

### 2. Shadow Hover Effects

```tsx
// Добавляйте hover эффекты через тени
<div
  className="
  shadow-[4px_4px_0px_0px_#000000]
  hover:shadow-[6px_6px_0px_0px_#000000]
  transition-shadow
"
>
  Контент с hover эффектом
</div>
```

### 3. Color Combinations

```tsx
// Рекомендуемые комбинации цветов
const colorCombos = {
  primary: { bg: 'yellow', text: 'black' },
  secondary: { bg: 'blue', text: 'white' },
  accent: { bg: 'orange', text: 'black' },
  success: { bg: 'green', text: 'white' },
  danger: { bg: 'red', text: 'white' },
};
```

### 4. Typography

```tsx
// Используйте правильные стили текста
<h1 className="font-heading font-black text-4xl uppercase">
  Главный заголовок
</h1>
<h2 className="font-heading font-bold text-2xl uppercase">
  Подзаголовок
</h2>
<p className="font-base text-base">
  Обычный текст
</p>
```

## 🔧 Extending Components

### Creating Custom Variants

```tsx
// Расширьте существующие компоненты
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function NeoBrutalButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        'border-2 border-border',
        'shadow-[4px_4px_0px_0px_#000000]',
        'hover:shadow-[6px_6px_0px_0px_#000000]',
        'hover:translate-x-[-2px] hover:translate-y-[-2px]',
        'transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
```

### Custom Color Props

```tsx
// Добавьте поддержку кастомных цветов
type NeoComponentProps = {
  color?: 'yellow' | 'blue' | 'orange' | 'green' | 'purple' | 'white';
  hover?: boolean;
  children: React.ReactNode;
};

const colorClasses = {
  yellow: 'bg-chart-1',
  blue: 'bg-chart-2',
  orange: 'bg-chart-3',
  green: 'bg-chart-4',
  purple: 'bg-chart-5',
  white: 'bg-background',
};
```

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---

_Последнее обновление: 2025-09-05_
