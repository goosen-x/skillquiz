import { render, screen } from '@testing-library/react';
import { TestRating } from '@/components/seo/TestRating';

const mockRatingData = {
  rating: 4.5,
  totalReviews: 150,
  distribution: {
    5: 80,
    4: 40,
    3: 20,
    2: 7,
    1: 3,
  },
};

describe('TestRating', () => {
  it('renders rating information correctly', () => {
    render(<TestRating {...mockRatingData} />);

    expect(screen.getByText('Рейтинг теста')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('150 отзывов')).toBeInTheDocument();
  });

  it('renders distribution bars', () => {
    render(<TestRating {...mockRatingData} />);

    // Check that all rating levels are shown (they appear in star-count pairs)
    const allText = screen.getAllByText(/^\d+$/);
    const textValues = allText.map((el) => el.textContent);

    expect(textValues).toContain('80'); // 5 stars count
    expect(textValues).toContain('40'); // 4 stars count
    expect(textValues).toContain('20'); // 3 stars count
    expect(textValues).toContain('7'); // 2 stars count
    expect(textValues).toContain('3'); // 1 star count
  });

  it('includes structured data script', () => {
    const { container } = render(<TestRating {...mockRatingData} />);

    const scriptTag = container.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();

    const structuredData = JSON.parse(scriptTag?.innerHTML || '{}');
    expect(structuredData['@type']).toBe('AggregateRating');
    expect(structuredData.ratingValue).toBe(4.5);
    expect(structuredData.reviewCount).toBe(150);
  });

  it('handles zero reviews', () => {
    render(
      <TestRating rating={0} totalReviews={0} distribution={{ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }} />
    );

    expect(screen.getByText('0 отзывов')).toBeInTheDocument();
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });
});
