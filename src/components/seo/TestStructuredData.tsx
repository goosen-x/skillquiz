'use client';

import { TestData } from '@/data/tests';
import { siteConfig } from '@/config/site.config';

interface TestStructuredDataProps {
  test: TestData;
}

export function TestStructuredData({ test }: TestStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: test.title,
    description: test.description,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: test.usersCount.replace(/\D/g, '') + '000',
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'Professional Test',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Professional Test',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    applicationSubCategory:
      test.category === 'psychology'
        ? 'Психологический тест'
        : test.category === 'career'
          ? 'Карьерный тест'
          : 'Тест образа жизни',
    featureList: [
      `${test.questionsCount} научно обоснованных вопросов`,
      `Время прохождения: ${test.duration}`,
      'Мгновенный результат с рекомендациями',
      'Анонимное прохождение',
      'Мобильная версия',
    ],
    screenshot: `${siteConfig.url}/images/tests/${test.slug}-screenshot.jpg`,
    softwareVersion: '1.0',
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
    inLanguage: 'ru-RU',
    isAccessibleForFree: true,
    keywords: test.seoKeywords.join(', '),
    educationalUse: 'self-assessment',
    learningResourceType: 'interactive assessment',
    typicalAgeRange: '16-99',
  };

  // Additional structured data for digital wellness test
  if (test.slug === 'digital-wellness-persona') {
    const digitalWellnessData = {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: test.title,
      description: test.description,
      about: {
        '@type': 'Thing',
        name: 'Цифровое здоровье',
        description: 'Здоровые отношения с технологиями и цифровыми устройствами',
      },
      hasPart: Array.from({ length: 12 }, (_, i) => ({
        '@type': 'Question',
        name: `Вопрос ${i + 1}`,
        text: `Вопрос о цифровых привычках и wellness`,
      })),
      educationalAlignment: {
        '@type': 'AlignmentObject',
        alignmentType: 'teaches',
        educationalFramework: 'Digital Wellness',
        targetDescription: 'Понимание собственных цифровых привычек',
      },
      assesses: 'Digital Wellness Skills',
      educationalUse: 'self-assessment',
      interactivityType: 'active',
      isBasedOn: {
        '@type': 'CreativeWork',
        name: 'Научные исследования цифрового благополучия',
        description: 'Современные подходы к изучению влияния технологий на психическое здоровье',
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(digitalWellnessData),
          }}
        />
      </>
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
