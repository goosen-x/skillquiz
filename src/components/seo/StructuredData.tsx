import Script from 'next/script';

interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'WebPage' | 'FAQPage';
  data: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// Предустановленные схемы для сайта психологических тестов
export function WebsiteSchema() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: "PsyTest - Психологические тесты онлайн",
        url: "https://psytest.ru",
        description: "Бесплатные психологические тесты онлайн для определения типа личности, выбора профессии и самопознания",
        publisher: {
          "@type": "Organization",
          name: "PsyTest",
          url: "https://psytest.ru"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://psytest.ru/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        inLanguage: "ru-RU"
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: "PsyTest",
        url: "https://psytest.ru",
        description: "Онлайн платформа для прохождения психологических тестов",
        foundingDate: "2024",
        knowsAbout: [
          "Психология",
          "Типы личности", 
          "Профориентация",
          "Психологические тесты",
          "Самопознание"
        ],
        sameAs: [
          "https://t.me/psytest_ru",
          "https://vk.com/psytest_ru"
        ],
        areaServed: {
          "@type": "Country",
          name: "Russia"
        }
      }}
    />
  );
}

export function FAQSchema() {
  return (
    <StructuredData
      type="FAQPage"
      data={{
        mainEntity: [
          {
            "@type": "Question",
            name: "Как пройти психологический тест на тип личности?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Для прохождения психологического теста на тип личности выберите подходящий тест, честно отвечайте на вопросы и получите детальную расшифровку результатов."
            }
          },
          {
            "@type": "Question", 
            name: "Какие профессии подходят моему типу личности?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Профессиональная пригодность зависит от ваших интересов, навыков и типа личности. Пройдите тест на профориентацию для получения персональных рекомендаций."
            }
          },
          {
            "@type": "Question",
            name: "Бесплатны ли психологические тесты на сайте?",
            acceptedAnswer: {
              "@type": "Answer", 
              text: "Да, все основные психологические тесты на определение типа личности и профориентацию доступны бесплатно с подробной расшифровкой результатов."
            }
          }
        ]
      }}
    />
  );
}