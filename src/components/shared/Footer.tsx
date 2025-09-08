'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { 
  Brain, 
  Briefcase, 
  Heart, 
  Clock,
  Users,
  Mail,
  MessageCircle,
  Info,
  MapPin,
  Sparkles,
  ChevronRight,
  Send,
  Zap,
  Trophy
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface FooterSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  links: FooterLink[];
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const footerSections: FooterSection[] = [
    {
      title: 'Популярные тесты',
      icon: <Brain className="w-5 h-5" />,
      color: 'bg-[#FFD23F]',
      links: [
        { 
          label: 'Тип личности Big Five', 
          href: '/tests/personality-type',
          badge: 'ХИТ'
        },
        { 
          label: 'Синдром самозванца', 
          href: '/tests/impostor-syndrome',
          badge: 'NEW'
        },
        { 
          label: 'Эмоциональный интеллект', 
          href: '/tests/emotional-intelligence'
        },
        { 
          label: 'Психологическая устойчивость', 
          href: '/tests/stress-resistance'
        },
        {
          label: 'Все 113 тестов',
          href: '/tests',
          icon: <ChevronRight className="w-3 h-3" />
        }
      ],
    },
    {
      title: 'Категории',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-[#4ECDC4]',
      links: [
        { label: 'Профориентация', href: '/tests?category=career' },
        { label: 'Личность и характер', href: '/tests?category=psychology' },
        { label: 'Образ жизни', href: '/tests?category=lifestyle' },
        { label: 'Отношения', href: '/tests?category=relationships' },
        { label: 'Здоровье и стресс', href: '/tests?category=health' },
      ],
    },
    {
      title: 'Информация',
      icon: <Info className="w-5 h-5" />,
      color: 'bg-[#AA96DA]',
      links: [
        { label: 'О проекте', href: '/about' },
        { label: 'Как это работает', href: '/how-it-works' },
        { label: 'Научная база', href: '/methodology' },
        { label: 'Блог', href: '/blog', badge: 'Скоро' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Поддержка',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-[#FF6B35]',
      links: [
        { label: 'Контакты', href: '/contacts' },
        { label: 'Обратная связь', href: '/feedback' },
        { label: 'Сообщить об ошибке', href: '/report-bug' },
        { label: 'Политика конфиденциальности', href: '/privacy' },
        { label: 'Условия использования', href: '/terms' },
      ],
    },
  ];

  const socialLinks = [
    { 
      label: 'Telegram', 
      href: 'https://t.me/professional_test',
      icon: <Send className="w-4 h-4" />,
      color: 'bg-[#0099FF]'
    },
    { 
      label: 'VK', 
      href: 'https://vk.com/professional_test',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-[#4ECDC4]'
    },
    {
      label: 'Email',
      href: 'mailto:info@professional-test.ru',
      icon: <Mail className="w-4 h-4" />,
      color: 'bg-[#FFD23F]'
    }
  ];

  const stats = [
    { number: '113', label: 'тестов', icon: <Brain className="w-4 h-4" /> },
    { number: '73K+', label: 'пользователей', icon: <Users className="w-4 h-4" /> },
    { number: '4.8', label: 'рейтинг', icon: <Trophy className="w-4 h-4" /> },
    { number: '24/7', label: 'доступ', icon: <Clock className="w-4 h-4" /> },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-background border-t-4 border-border overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px)`
          }}
        />
      </div>

      <div className="relative">
        {/* Stats bar */}
        <div className="bg-foreground py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center gap-2 text-background">
                    {stat.icon}
                    <span className="text-2xl font-heading font-black">{stat.number}</span>
                  </div>
                  <div className="text-xs uppercase text-background/70 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Newsletter section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NeoCard className="bg-gradient-to-br from-[#FFD23F]/10 to-[#FF6B35]/10">
              <NeoCardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-12 h-12 bg-[#FF6B35] border-2 border-border shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-heading font-black uppercase">
                        Новые тесты каждую неделю
                      </h3>
                    </div>
                    <p className="text-foreground/80 mb-4">
                      Подпишитесь на рассылку и первыми узнавайте о новых тестах, 
                      исследованиях и эксклюзивных материалах
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 border-2 border-border bg-white font-base focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-all"
                      required
                    />
                    <motion.button
                      type="submit"
                      className={cn(
                        "px-6 py-3 border-2 border-border font-heading font-bold uppercase transition-all",
                        isSubscribed 
                          ? "bg-[#4ECDC4] text-white" 
                          : "bg-[#FFD23F] hover:bg-[#FF6B35] hover:text-white hover:shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[-4px] hover:translate-y-[-4px]"
                      )}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? (
                        <>✓ Подписано</>
                      ) : (
                        <>
                          Подписаться
                          <Zap className="w-4 h-4 ml-2 inline" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </NeoCardContent>
            </NeoCard>
          </motion.div>

          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand section */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <h3 className="text-3xl font-heading font-black mb-2 uppercase">
                  Professional<br />
                  <span className="text-[#FF6B35]">Test</span>
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Ваш путь к самопознанию начинается здесь. Научные тесты для каждого.
                </p>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      "w-12 h-12 border-2 border-border shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center transition-all hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]",
                      link.color
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              {/* Contact info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-foreground/70">
                  <MapPin className="w-4 h-4" />
                  <span>Россия, Москва</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <Clock className="w-4 h-4" />
                  <span>24/7 онлайн</span>
                </div>
              </div>
            </motion.div>

            {/* Footer sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={cn(
                    "w-8 h-8 border-2 border-border shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center",
                    section.color
                  )}>
                    {section.icon}
                  </div>
                  <h4 className="font-heading font-bold uppercase text-lg">{section.title}</h4>
                </div>
                
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                        <div className="flex items-center gap-2">
                          {link.badge && (
                            <span className="px-2 py-0.5 bg-[#FFD23F] text-xs font-bold uppercase border border-border">
                              {link.badge}
                            </span>
                          )}
                          {link.icon}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Legal and bottom section */}
          <div className="border-t-2 border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div
                className="flex flex-wrap items-center gap-4 text-xs text-foreground/60 font-bold uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span>© {new Date().getFullYear()} Professional Test</span>
                <span className="hidden md:inline">•</span>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Конфиденциальность
                </Link>
                <span className="hidden md:inline">•</span>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Условия
                </Link>
                <span className="hidden md:inline">•</span>
                <Link href="/sitemap" className="hover:text-foreground transition-colors">
                  Карта сайта
                </Link>
              </motion.div>

              {/* Fun element */}
              <motion.div
                className="flex items-center gap-2 text-xs text-foreground/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span>Сделано с</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.div>
                <span>и наукой</span>
                <Brain className="w-4 h-4 text-[#AA96DA]" />
              </motion.div>
            </div>

            {/* SEO text */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xs text-foreground/50 max-w-3xl mx-auto leading-relaxed">
                Professional Test — платформа психологических тестов онлайн для самопознания, 
                профориентации и развития. Тесты личности, эмоционального интеллекта, 
                профессиональные тесты, тесты на совместимость. Бесплатно, без регистрации, с научной точностью.
              </p>
            </motion.div>
          </div>

          {/* Animated shapes decoration */}
          <div className="flex justify-center mt-12 gap-4">
            {['bg-[#FFD23F]', 'bg-[#FF6B35]', 'bg-[#4ECDC4]', 'bg-[#AA96DA]'].map((color, index) => (
              <motion.div
                key={index}
                className={cn(
                  "w-4 h-4 border-2 border-border",
                  color,
                  index % 2 === 0 ? "" : "rounded-full"
                )}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: index % 2 === 0 ? [0, 180, 360] : 0 
                }}
                transition={{ 
                  duration: 2 + index * 0.3, 
                  repeat: Infinity,
                  delay: index * 0.2 
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}