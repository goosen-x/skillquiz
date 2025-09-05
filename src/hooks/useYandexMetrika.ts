import { useCallback } from 'react';
import { siteConfig } from '@/config/site.config';
import {
  trackGoal as ymTrackGoal,
  trackExtLink as ymTrackExtLink,
  trackFile as ymTrackFile,
  setUserParams as ymSetUserParams,
  setVisitParams as ymSetVisitParams,
} from '@/components/seo/YandexMetrika';

export function useYandexMetrika() {
  const counterId = siteConfig.analytics.yandexMetrikaId;

  const trackGoal = useCallback(
    (goalName: string, params?: Record<string, unknown>) => {
      if (counterId && counterId !== 'XXXXXXXXX') {
        ymTrackGoal(counterId, goalName, params);
      }
    },
    [counterId]
  );

  const trackExtLink = useCallback(
    (url: string, title?: string) => {
      if (counterId && counterId !== 'XXXXXXXXX') {
        ymTrackExtLink(counterId, url, title);
      }
    },
    [counterId]
  );

  const trackFile = useCallback(
    (file: string, title?: string) => {
      if (counterId && counterId !== 'XXXXXXXXX') {
        ymTrackFile(counterId, file, title);
      }
    },
    [counterId]
  );

  const setUserParams = useCallback(
    (params: Record<string, unknown>) => {
      if (counterId && counterId !== 'XXXXXXXXX') {
        ymSetUserParams(counterId, params);
      }
    },
    [counterId]
  );

  const setVisitParams = useCallback(
    (params: Record<string, unknown>) => {
      if (counterId && counterId !== 'XXXXXXXXX') {
        ymSetVisitParams(counterId, params);
      }
    },
    [counterId]
  );

  // Специфические цели для психологических тестов
  const trackTestStart = useCallback(
    (testId: string) => {
      trackGoal('test_start', { test_id: testId });
    },
    [trackGoal]
  );

  const trackTestComplete = useCallback(
    (testId: string, resultType: string) => {
      trackGoal('test_complete', {
        test_id: testId,
        result_type: resultType,
      });
    },
    [trackGoal]
  );

  const trackTestShare = useCallback(
    (testId: string, platform: string) => {
      trackGoal('test_share', {
        test_id: testId,
        platform,
      });
    },
    [trackGoal]
  );

  const trackTestAbandon = useCallback(
    (testId: string, questionNumber: number) => {
      trackGoal('test_abandon', {
        test_id: testId,
        question_number: questionNumber,
      });
    },
    [trackGoal]
  );

  const trackCategoryView = useCallback(
    (category: string) => {
      trackGoal('category_view', { category });
    },
    [trackGoal]
  );

  return {
    trackGoal,
    trackExtLink,
    trackFile,
    setUserParams,
    setVisitParams,
    // Специфические методы для тестов
    trackTestStart,
    trackTestComplete,
    trackTestShare,
    trackTestAbandon,
    trackCategoryView,
  };
}
