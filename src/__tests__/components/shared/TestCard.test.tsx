import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestCard } from '@/components/shared/TestCard';

const mockTest = {
  id: 'personality-type',
  title: 'Тест на тип личности',
  description: 'Определите свой тип личности по методике MBTI',
  category: 'psychology' as const,
  difficulty: 'Легкий' as const,
  duration: '10 мин',
  questionsCount: 20,
  usersCount: '10k+',
  popularity: 5,
  tags: ['MBTI', 'психология', 'личность'],
  slug: 'personality-type',
  status: 'completed' as const,
};

describe('TestCard', () => {
  it('renders test information correctly', () => {
    render(<TestCard test={mockTest} />);

    expect(screen.getByText('Тест на тип личности')).toBeInTheDocument();
    expect(screen.getByText('Определите свой тип личности по методике MBTI')).toBeInTheDocument();
    expect(screen.getByText('10 мин')).toBeInTheDocument();
  });

  it('shows correct button text when test is available', () => {
    render(<TestCard test={{ ...mockTest, status: 'completed' }} />);

    expect(screen.getByText('Пройти тест')).toBeInTheDocument();
  });

  it('shows in development badge when test is in development', () => {
    render(<TestCard test={{ ...mockTest, status: 'in_development' }} />);

    expect(screen.getByText('В разработке')).toBeInTheDocument();
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<TestCard test={mockTest} variant="compact" />);
    // Compact variant still shows the same button text
    expect(screen.getByText('Пройти тест')).toBeInTheDocument();

    // Check that tags are not shown in compact variant
    expect(screen.queryByText('MBTI')).not.toBeInTheDocument();

    rerender(<TestCard test={mockTest} variant="default" />);
    // Default variant shows tags
    expect(screen.getByText('MBTI')).toBeInTheDocument();
  });

  it('shows stats when showStats is true', () => {
    render(<TestCard test={mockTest} showStats />);

    // Check for duration and questions count
    expect(screen.getByText('10 мин')).toBeInTheDocument();
    expect(screen.getByText('20 вопросов')).toBeInTheDocument();
    expect(screen.getByText('10k+')).toBeInTheDocument();
  });

  it('hides stats when showStats is false', () => {
    render(<TestCard test={mockTest} showStats={false} />);

    // Stats should not be shown
    expect(screen.queryByText('20 вопросов')).not.toBeInTheDocument();
  });

  it('links to test page when available', () => {
    render(<TestCard test={mockTest} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tests/personality-type');
  });

  it('calls onHover when provided', async () => {
    const user = userEvent.setup();
    const handleHover = jest.fn();

    render(<TestCard test={mockTest} onHover={handleHover} />);

    const link = screen.getByRole('link');
    await user.hover(link);

    expect(handleHover).toHaveBeenCalled();
  });
});
