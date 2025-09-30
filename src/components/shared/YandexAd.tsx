'use client';

import { useEffect, useRef } from 'react';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { cn } from '@/lib/utils';

interface YandexAdProps {
  blockId: string;
  className?: string;
  variant?: 'default' | 'compact';
}

declare global {
  interface Window {
    yaContextCb: Array<() => void>;
    Ya?: {
      Context?: {
        AdvManager?: {
          render: (config: { blockId: string; renderTo: string }) => void;
        };
      };
    };
  }
}

export function YandexAd({ blockId, className, variant = 'default' }: YandexAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    // Проверяем, что контейнер существует и реклама еще не отрендерена
    const container = containerRef.current;
    if (!container || renderedRef.current) return;

    const renderAd = () => {
      if (window.Ya?.Context?.AdvManager && containerRef.current && !renderedRef.current) {
        const containerId = `yandex_rtb_${blockId}`;

        // Создаем div для рекламы
        const adDiv = document.createElement('div');
        adDiv.id = containerId;
        containerRef.current.appendChild(adDiv);

        try {
          window.Ya.Context.AdvManager.render({
            blockId: blockId,
            renderTo: containerId,
          });
          renderedRef.current = true;
        } catch (error) {
          console.error('Ошибка при рендеринге рекламы:', error);
        }
      }
    };

    // Если Ya.Context уже доступен, рендерим сразу
    if (window.Ya?.Context?.AdvManager) {
      renderAd();
    } else {
      // Иначе добавляем в очередь
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(renderAd);
    }

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      renderedRef.current = false;
    };
  }, [blockId]);

  return (
    <div className={cn('relative', variant === 'compact' ? 'my-6' : 'my-8', className)}>
      <NeoCard className="overflow-hidden">
        <NeoCardContent className={variant === 'compact' ? 'p-4' : 'p-6'}>
          {/* Заголовок рекламного блока */}
          <div className="absolute top-2 left-2 z-10">
            <span className="text-xs text-foreground/40 font-bold uppercase">Реклама</span>
          </div>

          {/* Контейнер для рекламы */}
          <div
            ref={containerRef}
            className={cn('relative min-h-[100px]', variant === 'default' && 'min-h-[250px]')}
          >
            {/* Заглушка на время загрузки */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-border border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-foreground/60">Загрузка рекламы...</p>
              </div>
            </div>
          </div>
        </NeoCardContent>
      </NeoCard>
    </div>
  );
}
