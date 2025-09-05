'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQBlock({ faqs, title = 'Часто задаваемые вопросы', className }: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-3xl uppercase mb-2">{title}</h2>
        <p className="text-foreground/60">Ответы на популярные вопросы о наших тестах</p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <NeoCard
            key={index}
            hover
            className={cn(
              'cursor-pointer transition-all',
              openIndex === index && 'shadow-[6px_6px_0px_0px_theme(colors.border)]'
            )}
            onClick={() => toggleQuestion(index)}
          >
            <NeoCardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <HelpCircle className="w-6 h-6 text-chart-2 shrink-0 mt-0.5" />
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 shrink-0" />
                  )}
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-9 text-foreground/80">
                      {faq.answer.split('\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className={pIndex > 0 ? 'mt-2' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </NeoCardContent>
          </NeoCard>
        ))}
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </div>
  );
}
