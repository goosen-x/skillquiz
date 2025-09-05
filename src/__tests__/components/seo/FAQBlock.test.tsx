import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQBlock } from '@/components/seo/FAQBlock';

const mockFAQs = [
  {
    question: 'Что такое психологические тесты?',
    answer:
      'Психологические тесты - это инструменты оценки личностных характеристик, способностей и поведенческих паттернов человека.',
  },
  {
    question: 'Сколько времени занимает прохождение теста?',
    answer:
      'В среднем тест занимает от 5 до 25 минут.\nВремя зависит от сложности и количества вопросов.',
  },
  {
    question: 'Насколько точны результаты?',
    answer:
      'Наши тесты основаны на научных методиках и обеспечивают высокую точность результатов при честных ответах.',
  },
];

describe('FAQBlock', () => {
  it('renders FAQ title and questions', () => {
    render(<FAQBlock faqs={mockFAQs} />);

    expect(screen.getByText('Часто задаваемые вопросы')).toBeInTheDocument();
    expect(screen.getByText('Ответы на популярные вопросы о наших тестах')).toBeInTheDocument();

    // All questions should be visible
    mockFAQs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it('renders with custom title', () => {
    render(<FAQBlock faqs={mockFAQs} title="FAQ по тестам" />);

    expect(screen.getByText('FAQ по тестам')).toBeInTheDocument();
  });

  it('toggles answer visibility on click', async () => {
    const user = userEvent.setup();
    render(<FAQBlock faqs={mockFAQs} />);

    // Answer should not be visible initially
    expect(screen.queryByText(/Психологические тесты - это инструменты/)).not.toBeInTheDocument();

    // Click on first question
    const firstQuestion = screen.getByText('Что такое психологические тесты?');
    const firstCard = firstQuestion.closest('.cursor-pointer');

    if (firstCard) {
      await user.click(firstCard);
    }

    // Answer should now be visible
    expect(screen.getByText(/Психологические тесты - это инструменты/)).toBeInTheDocument();
  });

  it('opens different answers on click', async () => {
    const user = userEvent.setup();
    render(<FAQBlock faqs={mockFAQs} />);

    // Click on first question
    const firstQuestion = screen.getByText('Что такое психологические тесты?');
    const firstCard = firstQuestion.closest('.cursor-pointer');

    if (firstCard) {
      await user.click(firstCard);
    }

    // First answer should be visible
    expect(screen.getByText(/Психологические тесты - это инструменты/)).toBeInTheDocument();

    // Click on second question
    const secondQuestion = screen.getByText('Сколько времени занимает прохождение теста?');
    const secondCard = secondQuestion.closest('.cursor-pointer');

    if (secondCard) {
      await user.click(secondCard);
    }

    // Second answer should be visible
    expect(screen.getByText(/В среднем тест занимает/)).toBeInTheDocument();
  });

  it('renders multiline answers correctly', async () => {
    const user = userEvent.setup();
    render(<FAQBlock faqs={mockFAQs} />);

    // Click on second question which has multiline answer
    const secondQuestion = screen.getByText('Сколько времени занимает прохождение теста?');
    const secondCard = secondQuestion.closest('.cursor-pointer');

    if (secondCard) {
      await user.click(secondCard);
    }

    // Both lines should be visible
    expect(screen.getByText(/В среднем тест занимает/)).toBeInTheDocument();
    expect(screen.getByText(/Время зависит от сложности/)).toBeInTheDocument();
  });

  it('includes structured data script', () => {
    const { container } = render(<FAQBlock faqs={mockFAQs} />);

    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();

    const structuredData = JSON.parse(scriptTag?.innerHTML || '{}');
    expect(structuredData['@type']).toBe('FAQPage');
    expect(structuredData.mainEntity).toHaveLength(3);
    expect(structuredData.mainEntity[0]['@type']).toBe('Question');
    expect(structuredData.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
  });
});
