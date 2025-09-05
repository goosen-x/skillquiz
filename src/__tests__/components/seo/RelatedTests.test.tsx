import { render, screen } from '@testing-library/react';
import { RelatedTests } from '@/components/seo/RelatedTests';

const mockTests = [
  {
    id: 'personality-type',
    title: 'Тест на тип личности',
    description: 'Определите свой тип личности по методике MBTI',
    slug: 'personality-type',
    category: 'psychology' as const,
    difficulty: 'Легкий' as const,
    duration: '10 мин',
  },
  {
    id: 'emotional-intelligence',
    title: 'Тест на эмоциональный интеллект',
    description: 'Оцените свой уровень эмоционального интеллекта',
    slug: 'emotional-intelligence',
    category: 'psychology' as const,
    difficulty: 'Средний' as const,
    duration: '15 мин',
  },
  {
    id: 'career-orientation',
    title: 'Тест на профориентацию',
    description: 'Узнайте, какая профессия вам подходит',
    slug: 'career-orientation',
    category: 'career' as const,
    difficulty: 'Сложный' as const,
    duration: '25 мин',
  },
  {
    id: 'lifestyle-balance',
    title: 'Тест на баланс жизни',
    description: 'Проверьте баланс между работой и личной жизнью',
    slug: 'lifestyle-balance',
    category: 'lifestyle' as const,
    difficulty: 'Легкий' as const,
    duration: '5 мин',
  },
];

describe('RelatedTests', () => {
  it('renders related tests excluding current test', () => {
    render(<RelatedTests tests={mockTests} currentTestId="personality-type" />);

    expect(screen.getByText('Похожие тесты')).toBeInTheDocument();

    // Should not show the current test
    expect(screen.queryByText('Тест на тип личности')).not.toBeInTheDocument();

    // Should show other tests
    expect(screen.getByText('Тест на эмоциональный интеллект')).toBeInTheDocument();
    expect(screen.getByText('Тест на профориентацию')).toBeInTheDocument();
    expect(screen.getByText('Тест на баланс жизни')).toBeInTheDocument();
  });

  it('shows maximum 3 related tests', () => {
    render(
      <RelatedTests
        tests={[...mockTests, ...mockTests]} // Double the tests
        currentTestId="test-not-in-list"
      />
    );

    const testTitles = screen.getAllByRole('heading', { level: 3 });
    expect(testTitles).toHaveLength(3);
  });

  it('renders with custom title', () => {
    render(
      <RelatedTests
        tests={mockTests}
        currentTestId="personality-type"
        title="Рекомендуемые тесты"
      />
    );

    expect(screen.getByText('Рекомендуемые тесты')).toBeInTheDocument();
  });

  it('shows category badges', () => {
    render(<RelatedTests tests={mockTests} currentTestId="personality-type" />);

    expect(screen.getByText('Психология')).toBeInTheDocument();
    expect(screen.getByText('Карьера')).toBeInTheDocument();
    expect(screen.getByText('Образ жизни')).toBeInTheDocument();
  });

  it('shows test duration and difficulty', () => {
    render(<RelatedTests tests={mockTests} currentTestId="personality-type" />);

    expect(screen.getByText('15 мин')).toBeInTheDocument();

    // Check for difficulty text in span elements
    const difficultyElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('Сложность:') || false;
    });

    const difficulties = difficultyElements.map((el) => el.textContent);
    expect(difficulties.some((text) => text?.includes('Средний'))).toBeTruthy();
    expect(difficulties.some((text) => text?.includes('Сложный'))).toBeTruthy();
  });

  it('includes structured data script', () => {
    const { container } = render(
      <RelatedTests tests={mockTests} currentTestId="personality-type" />
    );

    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();

    const structuredData = JSON.parse(scriptTag?.innerHTML || '{}');
    expect(structuredData['@type']).toBe('ItemList');
    expect(structuredData.itemListElement).toHaveLength(3);
  });

  it('returns null when no related tests', () => {
    const { container } = render(
      <RelatedTests tests={[mockTests[0]]} currentTestId="personality-type" />
    );

    expect(container.firstChild).toBeNull();
  });

  it('shows "All tests" button', () => {
    render(<RelatedTests tests={mockTests} currentTestId="personality-type" />);

    const allTestsLink = screen.getByRole('link', { name: /Все тесты/i });
    expect(allTestsLink).toHaveAttribute('href', '/tests');
  });
});
