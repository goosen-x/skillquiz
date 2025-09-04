import type { Metadata } from 'next';
import { TestsCatalogPage } from '@/components/tests/TestsCatalogPage';

export const metadata: Metadata = {
  title: 'Психологические тесты онлайн бесплатно - каталог всех тестов | PsyTest',
  description: 'Полный каталог психологических тестов онлайн бесплатно. Тесты на личность, профориентация, продуктивность. Быстрые и точные результаты с расшифровкой.',
  keywords: [
    'психологические тесты',
    'тест на личность',
    'тест на профессию',
    'каталог тестов',
    'профориентация онлайн',
    'тест на продуктивность',
    'определить хронотип',
    'бесплатные тесты',
    'психология онлайн',
    'самопознание тесты'
  ].join(', '),
  authors: [{ name: 'PsyTest Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Каталог психологических тестов онлайн бесплатно - PsyTest',
    description: 'Откройте свой потенциал с помощью наших психологических тестов. Определите тип личности, выберите профессию, повысьте продуктивность.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'PsyTest',
    images: [
      {
        url: '/images/tests-catalog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Каталог психологических тестов PsyTest'
      }
    ]
  },
  alternates: {
    canonical: 'https://psytest.ru/tests'
  },
  other: {
    'yandex-zen-verification': 'yandex_zen_verification_code'
  }
};

export default function TestsPage() {
  return <TestsCatalogPage />;
}