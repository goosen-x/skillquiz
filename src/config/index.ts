// Экспорт всех конфигураций
export * from './site.config';
export * from './metadata.config';
export * from './tests.config';

// Дополнительные утилиты для работы с конфигурацией
import { siteConfig } from './site.config';

// Функция для получения полного URL
export function getAbsoluteUrl(path: string = ''): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Функция для получения названия категории по ID
export function getCategoryName(categoryId: string): string {
  const category = siteConfig.categories[categoryId as keyof typeof siteConfig.categories];
  return category?.name || 'Неизвестная категория';
}

// Функция для проверки включенной функции
export function isFeatureEnabled(feature: keyof typeof siteConfig.features): boolean {
  return siteConfig.features[feature] ?? false;
}

// Функция для получения цвета по индексу
export function getChartColor(index: number): string {
  const colors = [
    siteConfig.theme.colors.chart1,
    siteConfig.theme.colors.chart2,
    siteConfig.theme.colors.chart3,
    siteConfig.theme.colors.chart4,
    siteConfig.theme.colors.chart5,
  ];
  return colors[index % colors.length];
}

// Функция для генерации ключа хранилища
export function getStorageKey(type: 'progress' | 'result' | 'settings', testSlug: string): string {
  const prefix = siteConfig.tests.progressStorageKey;
  return `${prefix}-${type}-${testSlug}`;
}

// Функция для форматирования времени теста
export function formatTestDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}ч ${mins}мин` : `${hours}ч`;
}

// Функция для получения URL шаринга
export function getShareUrl(platform: string, url: string, text: string): string {
  const sharingPlatform = siteConfig.sharing.platforms.find(p => p.name === platform);
  return sharingPlatform ? sharingPlatform.shareUrl(url, text) : '';
}