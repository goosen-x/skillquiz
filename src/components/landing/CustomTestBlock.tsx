'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, Users, Clock, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export function CustomTestBlock() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission
    toast.success('Заявка отправлена! Мы свяжемся с вами в течение 24 часов');
    setIsFormOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
  };

  const features = [
    {
      icon: Brain,
      title: 'Научный подход',
      description: 'Разработка на основе проверенных психологических методик',
    },
    {
      icon: Target,
      title: 'Под ваши цели',
      description: 'Тест, который решает именно ваши бизнес-задачи',
    },
    {
      icon: Users,
      title: 'Для команд',
      description: 'Оценка персонала, подбор сотрудников, развитие команды',
    },
    {
      icon: Clock,
      title: 'От 2 недель',
      description: 'Быстрая разработка и внедрение готового решения',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-main relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-foreground rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-foreground rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-foreground rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 uppercase">
            <Sparkles className="w-4 h-4 mr-1" />
            Эксклюзивное предложение
          </Badge>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-foreground mb-6 uppercase">
            Закажите свой <span className="text-background">тест</span>
          </h2>

          <p className="text-xl text-foreground/90 max-w-3xl mx-auto mb-8">
            Нужен специализированный психологический тест для вашей компании? Мы разработаем
            уникальный инструмент оценки под ваши задачи
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_theme(colors.foreground)] hover:-translate-y-1 transition-transform">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-main border-2 border-foreground shadow-shadow mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2 uppercase">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground/80">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* What we offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background border-2 border-foreground shadow-[8px_8px_0px_0px_theme(colors.foreground)] p-8 mb-12"
        >
          <h3 className="text-2xl font-heading font-bold mb-6 uppercase">Что вы получите:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Полностью готовый психологический тест',
              'Научно обоснованную методику оценки',
              'Детальную интерпретацию результатов',
              'Брендирование под вашу компанию',
              'Интеграцию с вашими системами',
              'Техническую поддержку и обновления',
              'Обучение для HR-специалистов',
              'Аналитику и отчеты',
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-main mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA or Form */}
        {!isFormOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setIsFormOpen(true)}
              className="uppercase font-bold"
            >
              Обсудить проект
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="mt-4 text-sm text-foreground/70">
              Бесплатная консультация • Без обязательств
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 border-foreground bg-background shadow-[8px_8px_0px_0px_theme(colors.foreground)]">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-6 uppercase text-center">
                  Оставьте заявку
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold uppercase mb-2">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-border bg-background focus:border-main focus:shadow-[4px_4px_0px_0px_theme(colors.border)] transition-all"
                        placeholder="Иван Иванов"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-border bg-background focus:border-main focus:shadow-[4px_4px_0px_0px_theme(colors.border)] transition-all"
                        placeholder="ivan@company.ru"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold uppercase mb-2">Телефон</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-border bg-background focus:border-main focus:shadow-[4px_4px_0px_0px_theme(colors.border)] transition-all"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase mb-2">Компания</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-border bg-background focus:border-main focus:shadow-[4px_4px_0px_0px_theme(colors.border)] transition-all"
                        placeholder="Название компании"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase mb-2">
                      Опишите вашу задачу *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-border bg-background focus:border-main focus:shadow-[4px_4px_0px_0px_theme(colors.border)] transition-all resize-none"
                      placeholder="Расскажите, какой тест вам нужен и для каких целей..."
                    />
                  </div>

                  <div className="flex gap-4 justify-center pt-4">
                    <Button type="submit" size="lg" className="uppercase font-bold">
                      Отправить заявку
                      <Mail className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      onClick={() => setIsFormOpen(false)}
                      className="uppercase font-bold"
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
