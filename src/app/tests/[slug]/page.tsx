import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTestBySlug, getAllTests } from '@/data/tests';
import TestPage from '@/components/tests/TestPage';

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

  // Для теста "Цифровая личность" используем специальный компонент
  if (test.slug === 'digital-wellness-persona') {
    return <TestPage test={test} />;
  }

  // Для остальных тестов показываем заглушку
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{test.title}</h1>
        <p className="text-gray-600 mb-8">{test.description}</p>
        <p className="text-lg">Этот тест находится в разработке</p>
      </div>
    </div>
  );
}