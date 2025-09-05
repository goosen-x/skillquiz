import { Metadata } from 'next';
import { siteConfig } from './site.config';

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [...siteConfig.seo.authors],
  creator: siteConfig.seo.creator,
  publisher: siteConfig.seo.publisher,
  robots: siteConfig.seo.robots,
  openGraph: {
    type: siteConfig.openGraph.type,
    locale: siteConfig.openGraph.locale,
    url: siteConfig.url,
    siteName: siteConfig.openGraph.siteName,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [...siteConfig.openGraph.images],
  },
  twitter: {
    card: siteConfig.twitter.card,
    site: siteConfig.twitter.site,
    creator: siteConfig.twitter.creator,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteConfig.theme.colors.background },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  other: {
    'yandex-verification': 'your-yandex-verification-code',
    'google-site-verification': 'your-google-verification-code',
  },
};

// Функция для генерации метаданных для конкретной страницы
export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  image,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const finalKeywords = keywords
    ? [...siteConfig.seo.keywords, ...keywords]
    : siteConfig.seo.keywords;

  return {
    title,
    description,
    keywords: [...finalKeywords],
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : [...siteConfig.openGraph.images],
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

// Метаданные для конкретных страниц
export const pageMetadata = {
  tests: {
    title: 'Каталог психологических тестов',
    description:
      'Полный каталог психологических тестов: на личность, профориентацию, продуктивность. Все тесты бесплатны с подробной расшифровкой результатов.',
    keywords: ['каталог тестов', 'все тесты', 'психологические тесты список'],
  },
  about: {
    title: 'О проекте Professional Test',
    description:
      'Professional Test - платформа научных психологических тестов. Узнайте больше о нашей миссии и методологии.',
    keywords: ['о проекте', 'о нас', 'психологические тесты методология'],
  },
  contact: {
    title: 'Контакты',
    description:
      'Свяжитесь с командой Professional Test. Мы открыты для предложений и сотрудничества.',
    keywords: ['контакты', 'связаться', 'обратная связь'],
  },
  privacy: {
    title: 'Политика конфиденциальности',
    description:
      'Политика конфиденциальности сайта Professional Test. Как мы защищаем ваши данные.',
    keywords: ['конфиденциальность', 'защита данных', 'приватность'],
  },
  terms: {
    title: 'Условия использования',
    description: 'Условия использования сайта Professional Test. Правила пользования платформой.',
    keywords: ['условия использования', 'правила', 'соглашение'],
  },
} as const;
