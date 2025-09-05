import { Hero } from '@/components/landing/Hero';
import { Benefits } from '@/components/landing/Benefits';
import { TestCategories } from '@/components/landing/TestCategories';
import { SocialProof } from '@/components/landing/SocialProof';
import { CTA, FinalCTA } from '@/components/landing/CTA';
import { WebsiteSchema, OrganizationSchema, FAQSchema } from '@/components/seo/StructuredData';
import { GeometricSeparator } from '@/components/ui/geometric-separator';
import RecentResults from '@/components/landing/RecentResults';

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
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-heading font-black mb-4 uppercase">PsyTest</h3>
              <p className="text-background/80 mb-4 leading-relaxed font-base">
                Профессиональные <strong className="font-bold">психологические тесты онлайн</strong> для определения 
                типа личности, выбора профессии и саморазвития. Все тесты бесплатны и основаны 
                на научных методиках.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="px-4 py-2 border-2 border-background bg-foreground text-background font-bold uppercase text-sm hover:bg-background hover:text-foreground transition-colors">
                  Telegram
                </a>
                <a href="#" className="px-4 py-2 border-2 border-background bg-foreground text-background font-bold uppercase text-sm hover:bg-background hover:text-foreground transition-colors">
                  VK
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold mb-4 uppercase text-lg">Популярные тесты</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">Тест на тип личности</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">Тест на профессию</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">Эмоциональный интеллект</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">Тест на продуктивность</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold mb-4 uppercase text-lg">О сайте</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">О нас</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">Контакты</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">Конфиденциальность</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors font-base">Условия</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-background mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm font-bold uppercase">
              © 2024 PsyTest. Все права защищены.
            </p>
            <p className="text-background/60 text-sm mt-2 md:mt-0 font-bold uppercase">
              Психологические тесты • Профориентация • Саморазвитие
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
