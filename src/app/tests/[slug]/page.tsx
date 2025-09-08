import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTestBySlug, getAllTests } from '@/data/tests';
import TestPage from '@/components/tests/TestPage';
import TestUnderDevelopment from '@/components/tests/TestUnderDevelopment';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tests = getAllTests();
  return tests.map((test) => ({
    slug: test.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const test = getTestBySlug(slug);

  if (!test) {
    return {
      title: 'Тест не найден',
    };
  }

  return {
    title: `${test.title} | Психологический тест онлайн`,
    description: test.description,
    keywords: `${test.title}, психологический тест, ${test.category === 'psychology' ? 'тест личности' : test.category === 'career' ? 'тест на профессию' : 'тест образа жизни'}, онлайн тест`,
    openGraph: {
      title: test.title,
      description: test.description,
      type: 'website',
    },
  };
}

export default async function TestPageRoute({ params }: Props) {
  const { slug } = await params;
  const test = getTestBySlug(slug);

  if (!test) {
    notFound();
  }

  // Проверяем статус теста из данных
  if (test.status === 'completed') {
    return <TestPage test={test} />;
  }

  // Для тестов в разработке или запланированных показываем красивую страницу "В разработке"
  return <TestUnderDevelopment test={test} />;
}
