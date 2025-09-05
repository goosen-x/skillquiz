import { Hero } from '@/components/landing/Hero';
import { Benefits } from '@/components/landing/Benefits';
import { TestCategories } from '@/components/landing/TestCategories';
import { SocialProof } from '@/components/landing/SocialProof';
import { CTA, FinalCTA } from '@/components/landing/CTA';
import { WebsiteSchema, OrganizationSchema, FAQSchema } from '@/components/seo/StructuredData';
import { GeometricSeparator } from '@/components/ui/geometric-separator';
import RecentResults from '@/components/landing/RecentResults';
import { Footer } from '@/components/shared/Footer';

export default function Home() {
  return (
    <>
      {/* Structured Data для SEO */}
      <WebsiteSchema />
      <OrganizationSchema />
      <FAQSchema />

      <main className="min-h-screen">
        {/* Hero секция с H1 и основным value proposition */}
        <Hero />

        <GeometricSeparator variant="animated" />

        {/* Преимущества психологических тестов */}
        <Benefits />

        <GeometricSeparator variant="complex" />

        {/* Категории тестов с LSI словами */}
        <TestCategories />

        <GeometricSeparator variant="animated" />

        {/* Социальные доказательства и отзывы */}
        <SocialProof />

        <GeometricSeparator variant="simple" />

        {/* Последние результаты пользователя */}
        <RecentResults />

        {/* Главная CTA секция */}
        <CTA />

        <GeometricSeparator variant="complex" />

        {/* Финальная CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
