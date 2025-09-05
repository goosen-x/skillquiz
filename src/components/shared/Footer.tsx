import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Популярные тесты',
    links: [
      { label: 'Тест на тип личности', href: '/tests/personality-type' },
      { label: 'Тест на профессию', href: '/tests/career-test' },
      { label: 'Эмоциональный интеллект', href: '/tests/emotional-intelligence' },
      { label: 'Тест на продуктивность', href: '/tests/productivity-test' },
    ],
  },
  {
    title: 'О сайте',
    links: [
      { label: 'О нас', href: '/about' },
      { label: 'Контакты', href: '/contacts' },
      { label: 'Конфиденциальность', href: '/privacy' },
      { label: 'Условия', href: '/terms' },
    ],
  },
];

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/psytest' },
  { label: 'VK', href: 'https://vk.com/psytest' },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main info section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-heading font-black mb-4 uppercase">PsyTest</h3>
            <p className="text-background/80 mb-4 leading-relaxed font-base">
              Профессиональные <strong className="font-bold">психологические тесты онлайн</strong>{' '}
              для определения типа личности, выбора профессии и саморазвития. Все тесты бесплатны и
              основаны на научных методиках.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'px-4 py-2 border-2 border-background',
                    'bg-foreground text-background',
                    'font-bold uppercase text-sm',
                    'hover:bg-background hover:text-foreground',
                    'transition-colors'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-bold mb-4 uppercase text-lg">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-background/80 hover:text-background transition-colors font-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
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
  );
}
