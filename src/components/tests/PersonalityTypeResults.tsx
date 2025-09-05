'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NeoBrutalistRadarChart from '@/components/charts/NeoBrutalistRadarChart';
import { 
  calculatePersonalityTypeResult, 
  calculateBigFiveScores, 
  getPersonalityTypeChartData
} from '@/data/personality-type-test';

interface PersonalityTypeResultsProps {
  answers: number[];
}

// Neobrutalist styling constants
const NEOBRUTALIST_STYLES = {
  card: "border-2 border-black bg-white shadow-[4px_4px_0px_0px_black]",
  title: "font-heading font-bold uppercase text-2xl",
  badge: "border-2 font-bold uppercase text-xs px-3 py-1",
  button: "border-2 border-black bg-white hover:bg-gray-100 font-bold uppercase px-4 py-2 shadow-[2px_2px_0px_0px_black] transition-all hover:shadow-[4px_4px_0px_0px_black]"
};

const PersonalityTypeResults: React.FC<PersonalityTypeResultsProps> = ({ answers }) => {
  const result = calculatePersonalityTypeResult(answers);
  const scores = calculateBigFiveScores(answers);
  const chartData = getPersonalityTypeChartData(answers);

  const getScoreInterpretation = (score: number): { level: string; color: string } => {
    if (score >= 70) return { level: "ВЫСОКИЙ", color: "bg-green-400 text-black border-black" };
    if (score >= 40) return { level: "СРЕДНИЙ", color: "bg-yellow-400 text-black border-black" };
    return { level: "НИЗКИЙ", color: "bg-blue-400 text-black border-black" };
  };

  const factorDescriptions = {
    extraversion: {
      high: "Вы общительны, энергичны и получаете энергию от взаимодействия с людьми. Любите быть в центре внимания и легко заводите новые знакомства.",
      medium: "Вы сбалансированы в социальном плане - можете наслаждаться как общением, так и одиночеством, в зависимости от ситуации.",
      low: "Вы предпочитаете тишину и уединение, тщательно выбираете круг общения. Получаете энергию от времени, проведенного наедине с собой."
    },
    agreeableness: {
      high: "Вы эмпатичны, отзывчивы и стремитесь помогать другим. Цените гармонию в отношениях и легко идете на компромиссы.",
      medium: "Вы умеете находить баланс между заботой о других и защитой собственных интересов. Проявляете здоровый скептицизм.",
      low: "Вы независимы, прямолинейны и ставите свои цели выше желания нравиться. Цените честность больше дипломатии."
    },
    conscientiousness: {
      high: "Вы организованны, дисциплинированы и всегда доводите дела до конца. Любите порядок и планирование.",
      medium: "Вы способны быть организованными при необходимости, но также цените спонтанность и гибкость в подходах.",
      low: "Вы предпочитаете гибкость и спонтанность строгому планированию. Любите импровизировать и адаптироваться на ходу."
    },
    neuroticism: {
      high: "Вы эмоционально стабильны, спокойны в стрессовых ситуациях и обладаете устойчивым настроением.", // Инвертировано
      medium: "Ваша эмоциональная стабильность варьируется в зависимости от обстоятельств. Иногда стресс может повлиять на вас.",
      low: "Вы чувствительны к стрессу и можете переживать эмоциональные колебания. Важно развивать стратегии управления стрессом."
    },
    openness: {
      high: "Вы любопытны, креативны и открыты новому опыту. Цените искусство, идеи и нестандартное мышление.",
      medium: "Вы открыты новому, но также цените проверенные подходы. Умеете совмещать творчество с практичностью.",
      low: "Вы предпочитаете традиционные подходы и проверенные методы. Цените стабильность и предсказуемость."
    }
  };

  return (
    <div className="space-y-6">
      {/* Основной результат */}
      <Card className={NEOBRUTALIST_STYLES.card}>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div 
              className="text-4xl p-3 border-2 border-black bg-yellow-400"
              style={{ boxShadow: '2px 2px 0px 0px black' }}
            >
              {result.emoji}
            </div>
            <div>
              <CardTitle className={NEOBRUTALIST_STYLES.title}>
                {result.name}
              </CardTitle>
              <p className="text-black font-bold mt-1 uppercase text-sm">
                ВАШ ТИП ЛИЧНОСТИ ПО МОДЕЛИ BIG FIVE
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed font-medium">{result.description}</p>
        </CardContent>
      </Card>

      {/* Neobrutalist Radar Chart */}
      <div className="space-y-4">
        <div className={NEOBRUTALIST_STYLES.card + " p-6"}>
          <div className="mb-4">
            <h2 className={NEOBRUTALIST_STYLES.title}>
              ПРОФИЛЬ ЛИЧНОСТИ BIG FIVE
            </h2>
            <p className="text-black font-bold mt-2 uppercase text-sm">
              ВАШИ ПОКАЗАТЕЛИ ПО ПЯТИ ОСНОВНЫМ ФАКТОРАМ ЛИЧНОСТИ
            </p>
          </div>
          <NeoBrutalistRadarChart 
            data={chartData} 
            height={450}
            className="w-full"
          />
        </div>
      </div>

      {/* Подробные результаты по факторам */}
      <Card className={NEOBRUTALIST_STYLES.card}>
        <CardHeader>
          <CardTitle className={NEOBRUTALIST_STYLES.title}>
            ДЕТАЛЬНЫЙ АНАЛИЗ ФАКТОРОВ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(scores).map(([factor, score]) => {
            const interpretation = getScoreInterpretation(factor === 'neuroticism' ? 100 - score : score);
            const adjustedScore = factor === 'neuroticism' ? 100 - score : score; // Инвертируем нейротизм
            const factorKey = factor as keyof typeof factorDescriptions;
            
            let descriptionKey: 'high' | 'medium' | 'low';
            if (adjustedScore >= 70) descriptionKey = 'high';
            else if (adjustedScore >= 40) descriptionKey = 'medium';
            else descriptionKey = 'low';

            const factorNames = {
              extraversion: 'Экстраверсия',
              agreeableness: 'Доброжелательность',  
              conscientiousness: 'Добросовестность',
              neuroticism: 'Эмоциональная стабильность',
              openness: 'Открытость опыту'
            };

            return (
              <div key={factor} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg uppercase">
                    {factorNames[factorKey]}
                  </h3>
                  <div className="flex items-center gap-3">
                    <Badge className={`${interpretation.color} ${NEOBRUTALIST_STYLES.badge} shadow-[2px_2px_0px_0px_black]`}>
                      {interpretation.level}
                    </Badge>
                    <span className="font-bold text-lg min-w-[3rem] text-right">
                      {adjustedScore}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-300 border-2 border-black h-4" style={{ borderRadius: '0' }}>
                  <div 
                    className="h-full bg-orange-400 border-r-2 border-black transition-all duration-300"
                    style={{ 
                      width: `${adjustedScore}%`,
                      borderRadius: '0',
                      boxShadow: adjustedScore > 0 ? '2px 0px 0px 0px black inset' : 'none'
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {factorDescriptions[factorKey][descriptionKey]}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Характеристики */}
      <Card className={NEOBRUTALIST_STYLES.card}>
        <CardHeader>
          <CardTitle className={NEOBRUTALIST_STYLES.title}>
            КЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.characteristics.map((characteristic, index) => (
              <li key={index} className="flex items-start gap-3">
                <span 
                  className="flex-shrink-0 w-3 h-3 bg-orange-400 border border-black mt-1"
                  style={{ borderRadius: '0' }}
                />
                <span className="text-sm font-medium">{characteristic}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Рекомендации */}
      <Card className={NEOBRUTALIST_STYLES.card}>
        <CardHeader>
          <CardTitle className={NEOBRUTALIST_STYLES.title}>
            РЕКОМЕНДАЦИИ ПО РАЗВИТИЮ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.advice.map((advice, index) => (
              <li key={index} className="flex items-start gap-3">
                <span 
                  className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-black border-2 border-black flex items-center justify-center text-xs font-bold"
                  style={{ borderRadius: '0', boxShadow: '2px 2px 0px 0px black' }}
                >
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed font-medium">{advice}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Дополнительная информация */}
      <Card className={NEOBRUTALIST_STYLES.card}>
        <CardHeader>
          <CardTitle className={NEOBRUTALIST_STYLES.title}>
            О МОДЕЛИ BIG FIVE
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed font-medium mb-6">
            МОДЕЛЬ BIG FIVE (БОЛЬШАЯ ПЯТЕРКА) - ЭТО НАУЧНО ОБОСНОВАННАЯ СИСТЕМА ОПИСАНИЯ ЛИЧНОСТИ, 
            ОСНОВАННАЯ НА ПЯТИ КЛЮЧЕВЫХ ФАКТОРАХ. ЭТА МОДЕЛЬ ШИРОКО ИСПОЛЬЗУЕТСЯ В ПСИХОЛОГИИ 
            И ПРИЗНАНА ОДНОЙ ИЗ НАИБОЛЕЕ ВАЛИДНЫХ И НАДЕЖНЫХ СИСТЕМ ОЦЕНКИ ЛИЧНОСТНЫХ ЧЕРТ.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <h4 className="font-bold uppercase text-base">ПРИМЕНЕНИЕ РЕЗУЛЬТАТОВ:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">КАРЬЕРНОЕ ПЛАНИРОВАНИЕ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">КОМАНДНАЯ РАБОТА</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">ЛИЧНОСТНОЕ РАЗВИТИЕ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">УЛУЧШЕНИЕ ОТНОШЕНИЙ</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold uppercase text-base">ВАЖНО ПОМНИТЬ:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">ЛИЧНОСТЬ МОЖЕТ ИЗМЕНЯТЬСЯ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">НЕТ &quot;ПРАВИЛЬНЫХ&quot; РЕЗУЛЬТАТОВ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">ВСЕ ТИПЫ ИМЕЮТ СИЛЬНЫЕ СТОРОНЫ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 border border-black mt-2" style={{ borderRadius: '0' }} />
                  <span className="font-medium">РЕЗУЛЬТАТ - ОСНОВА ДЛЯ РАЗВИТИЯ</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityTypeResults;