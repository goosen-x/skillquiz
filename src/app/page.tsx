import { Hero } from '@/components/landing/Hero';
import { Benefits } from '@/components/landing/Benefits';
import { TestCategories } from '@/components/landing/TestCategories';
import { SocialProof } from '@/components/landing/SocialProof';
import { CTA, FinalCTA } from '@/components/landing/CTA';
import { WebsiteSchema, OrganizationSchema, FAQSchema } from '@/components/seo/StructuredData';
import RecentResults from '@/components/landing/RecentResults';
import { Footer } from '@/components/shared/Footer';
import { MarqueeHome } from '@/components/landing/MarqueeHome';
import { TestsCarousel } from '@/components/landing/TestsCarousel';
import { CustomTestBlock } from '@/components/landing/CustomTestBlock';

export default function Home() {
  return (
    <>
      {/* Structured Data для SEO */}
      <WebsiteSchema />
      <OrganizationSchema />
      <FAQSchema />

      <main className="min-h-screen">
        <Hero />
        <MarqueeHome />
        <Benefits />
        <TestsCarousel />
        <TestCategories />
        <SocialProof />
        <CustomTestBlock />
        <RecentResults />
        <CTA />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
