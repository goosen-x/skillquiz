'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { NeoCard, NeoCardContent, NeoBadge } from '@/components/ui/neo-card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Share2, 
  Download, 
  RefreshCw,
  Shield,
  Users,
  Handshake,
  ArrowRight,
  Star,
  Lightbulb,
  Eye
} from 'lucide-react';
import { TestData } from '@/data/tests';
import { TestResult, getEmotionalIntelligenceChartData } from '@/data/emotional-intelligence-test';

interface EmotionalIntelligenceResultsProps {
  test: TestData;
  result: TestResult;
  answers: number[];
}

// Конфигурация цветов для графика
const chartConfig = {
  score: {
    label: "Уровень",
    color: "var(--chart-1)",
  },
} as const;

// Иконки для компонентов EQ
const factorIcons = {
  "Самосознание": Eye,
  "Самоконтроль": Shield,
  "Социальное понимание": Users,
  "Управление отношениями": Handshake
};

export default function EmotionalIntelligenceResults({ test, result, answers }: EmotionalIntelligenceResultsProps) {
  const chartData = getEmotionalIntelligenceChartData(answers);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Мой результат: ${result.name}`,
          text: `Я прошел тест на эмоциональный интеллект и получил результат: ${result.name}! ${result.description}`,
          url: window.location.origin + `/tests/${test.slug}`
        });
      } catch (error) {
        console.log('Ошибка при попытке поделиться:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const text = `Мой результат: ${result.name}!\n${result.description}\n\nПройди тест: ${window.location.origin}/tests/${test.slug}`;
    navigator.clipboard.writeText(text);
    // Здесь можно добавить уведомление о копировании
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Простой экспорт результата в виде изображения
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 800, 600);
    
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('Результат теста EQ', 50, 80);
    
    ctx.font = '24px Arial';
    ctx.fillText(result.name, 50, 140);
    
    ctx.font = '16px Arial';
    const words = result.description.split(' ');
    let line = '';
    let y = 180;
    
    words.forEach((word) => {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 700 && line !== '') {
        ctx.fillText(line, 50, y);
        line = word + ' ';
        y += 25;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, 50, y);

    const link = document.createElement('a');
    link.download = `emotional-intelligence-result-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const retakeTest = () => {
    localStorage.removeItem(`test-result-${test.slug}`);
    localStorage.removeItem(`test-progress-${test.slug}`);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-secondary-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Заголовок результатов */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-heading font-bold mb-4 uppercase">
            Результаты теста на эмоциональный интеллект
          </h1>
          <p className="text-foreground/80 font-base">
            Полный анализ вашего EQ по методике Дэниела Гоулмана
          </p>
        </motion.div>

        {/* Основной результат */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <NeoCard className={`bg-background border-4 border-${result.color}-500`}>
            <NeoCardContent className="p-8 text-center">
              <div className="text-6xl mb-4">{result.emoji}</div>
              <h2 className="text-2xl font-heading font-bold mb-4 uppercase">
                {result.name}
              </h2>
              <p className="text-lg text-foreground/90 mb-6 font-base leading-relaxed">
                {result.description}
              </p>
              <div className="flex justify-center">
                <NeoBadge color={result.color as 'yellow' | 'blue' | 'orange' | 'green' | 'purple'} className="text-lg px-6 py-2">
                  Ваш уровень EQ определен
                </NeoBadge>
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* График компонентов EQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <NeoCard className="bg-background">
            <NeoCardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-6 uppercase text-center">
                Анализ компонентов эмоционального интеллекта
              </h3>
              
              <div className="h-80 mb-6">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis 
                        dataKey="factor" 
                        tick={{ fontSize: 12, fontWeight: 'bold' }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        tick={{ fontSize: 12, fontWeight: 'bold' }}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                      />
                      <Bar 
                        dataKey="score" 
                        fill="var(--chart-1)"
                        radius={[4, 4, 0, 0]}
                        className="drop-shadow-lg"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Детальное описание компонентов */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chartData.map((item, index) => {
                  const IconComponent = factorIcons[item.factor as keyof typeof factorIcons] || Brain;
                  const colorClass = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4'][index];
                  
                  return (
                    <motion.div
                      key={item.factor}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="border-2 border-border p-4 bg-secondary-background"
                    >
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 ${colorClass} border-2 border-border shadow-shadow flex items-center justify-center mr-3`}>
                          <IconComponent className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-sm uppercase">
                            {item.factor}
                          </h4>
                          <p className="text-2xl font-bold text-foreground">
                            {item.score}%
                          </p>
                        </div>
                      </div>
                      <div className={`w-full bg-border h-3 border-2 border-border`}>
                        <div 
                          className={`h-full ${colorClass} border-border border transition-all duration-1000`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Характеристики */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <NeoCard className="bg-background">
            <NeoCardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-4 uppercase flex items-center">
                <Star className="mr-2 w-6 h-6" />
                Ваши характеристики
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.characteristics.map((characteristic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center p-3 bg-chart-5/10 border-2 border-border"
                  >
                    <ArrowRight className="w-4 h-4 mr-3 text-chart-5" />
                    <span className="font-base font-bold">{characteristic}</span>
                  </motion.div>
                ))}
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Рекомендации */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <NeoCard className="bg-background">
            <NeoCardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-4 uppercase flex items-center">
                <Lightbulb className="mr-2 w-6 h-6" />
                Рекомендации по развитию
              </h3>
              <div className="space-y-3">
                {result.advice.map((advice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-start p-4 bg-secondary-background border-2 border-border"
                  >
                    <div className="w-8 h-8 bg-chart-3 border-2 border-border shadow-shadow flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-foreground font-bold">{index + 1}</span>
                    </div>
                    <p className="font-base text-foreground">{advice}</p>
                  </motion.div>
                ))}
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8"
        >
          <NeoCard className="bg-background">
            <NeoCardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-4 uppercase flex items-center">
                <Brain className="mr-2 w-6 h-6" />
                О методике Дэниела Гоулмана
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading font-bold mb-3 text-chart-1">Четыре компонента EQ:</h4>
                  <ul className="space-y-2 font-base">
                    <li className="flex items-center"><Eye className="w-4 h-4 mr-2 text-chart-1" /> <strong>Самосознание</strong> - понимание своих эмоций</li>
                    <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-chart-2" /> <strong>Самоконтроль</strong> - управление эмоциями</li>
                    <li className="flex items-center"><Users className="w-4 h-4 mr-2 text-chart-3" /> <strong>Социальное понимание</strong> - эмпатия</li>
                    <li className="flex items-center"><Handshake className="w-4 h-4 mr-2 text-chart-4" /> <strong>Управление отношениями</strong> - социальные навыки</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-3 text-chart-2">Важность EQ:</h4>
                  <p className="font-base text-foreground/90 leading-relaxed">
                    Исследования показывают, что эмоциональный интеллект на 58% определяет успех 
                    в профессиональной деятельности и является ключевым фактором эффективного 
                    лидерства и качества межличностных отношений.
                  </p>
                </div>
              </div>
            </NeoCardContent>
          </NeoCard>
        </motion.div>

        {/* Действия */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleShare}
            className="flex items-center font-bold uppercase"
            variant="default"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Поделиться результатом
          </Button>
          
          <Button
            onClick={handleDownload}
            className="flex items-center font-bold uppercase"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Скачать результат
          </Button>
          
          <Button
            onClick={retakeTest}
            className="flex items-center font-bold uppercase"
            variant="outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Пройти заново
          </Button>
        </motion.div>

        {/* SEO информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 text-center text-sm text-foreground/60"
        >
          <p className="font-base">
            Тест основан на научных исследованиях эмоционального интеллекта. 
            Для более глубокого понимания рекомендуется консультация со специалистом.
          </p>
        </motion.div>
      </div>
    </div>
  );
}