'use client';

import Link from 'next/link';
import { Navigation } from './Navigation';
import { WebsiteSchema, OrganizationSchema } from '@/components/seo/StructuredData';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export function Layout({ children, showNavigation = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Глобальные структурированные данные */}
      <WebsiteSchema />
      <OrganizationSchema />
      
      {/* Навигация */}
      {showNavigation && <Navigation />}
      
      {/* Основной контент */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold mb-4">PsyTest - Психологические тесты онлайн</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Пройдите бесплатные психологические тесты для самопознания, выбора профессии и личностного развития. 
                Научно обоснованные методики с детальной расшифровкой результатов.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'психологический тест',
                  'тест на личность',
                  'профориентация',
                  'тип личности',
                  'характер',
                  'темперамент'
                ].map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Популярные тесты</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/test/personality-type" className="hover:text-white transition-colors">Тест на тип личности</Link></li>
                <li><Link href="/test/career-test" className="hover:text-white transition-colors">Тест на профессию</Link></li>
                <li><Link href="/test/emotional-intelligence" className="hover:text-white transition-colors">Эмоциональный интеллект</Link></li>
                <li><Link href="/test/chronotype" className="hover:text-white transition-colors">Определить хронотип</Link></li>
                <li><Link href="/test/productivity-test" className="hover:text-white transition-colors">Тест продуктивности</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/tests?category=psychology" className="hover:text-white transition-colors">Психологические</Link></li>
                <li><Link href="/tests?category=career" className="hover:text-white transition-colors">Карьерные</Link></li>
                <li><Link href="/tests?category=lifestyle" className="hover:text-white transition-colors">Образ жизни</Link></li>
              </ul>
              
              <h4 className="text-md font-semibold mt-6 mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-white transition-colors">О проекте</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 PsyTest. Все права защищены. Бесплатные психологические тесты онлайн для самопознания и развития.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}