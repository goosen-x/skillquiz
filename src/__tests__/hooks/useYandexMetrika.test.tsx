import { renderHook, act } from '@testing-library/react';
import { useYandexMetrika } from '@/hooks/useYandexMetrika';
import * as metrikaModule from '@/components/seo/YandexMetrika';

// Mock the YandexMetrika module
jest.mock('@/components/seo/YandexMetrika', () => ({
  ym: jest.fn(),
  trackGoal: jest.fn(),
}));

// Mock siteConfig
jest.mock('@/config/site.config', () => ({
  siteConfig: {
    analytics: {
      yandexMetrikaId: 'test-counter-id',
    },
  },
}));

describe('useYandexMetrika', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tracks test start event', () => {
    const { result } = renderHook(() => useYandexMetrika());

    act(() => {
      result.current.trackTestStart('personality-type');
    });

    expect(metrikaModule.trackGoal).toHaveBeenCalledWith('test-counter-id', 'test_start', {
      test_id: 'personality-type',
    });
  });

  it('tracks test complete event', () => {
    const { result } = renderHook(() => useYandexMetrika());

    act(() => {
      result.current.trackTestComplete('personality-type', 'INTJ');
    });

    expect(metrikaModule.trackGoal).toHaveBeenCalledWith('test-counter-id', 'test_complete', {
      test_id: 'personality-type',
      result_type: 'INTJ',
    });
  });

  it('tracks test abandon event', () => {
    const { result } = renderHook(() => useYandexMetrika());

    act(() => {
      result.current.trackTestAbandon('personality-type', 5);
    });

    expect(metrikaModule.trackGoal).toHaveBeenCalledWith('test-counter-id', 'test_abandon', {
      test_id: 'personality-type',
      question_number: 5,
    });
  });

  it('tracks test share event', () => {
    const { result } = renderHook(() => useYandexMetrika());

    act(() => {
      result.current.trackTestShare('personality-type', 'vk');
    });

    expect(metrikaModule.trackGoal).toHaveBeenCalledWith('test-counter-id', 'test_share', {
      test_id: 'personality-type',
      platform: 'vk',
    });
  });

  it('tracks category view event', () => {
    const { result } = renderHook(() => useYandexMetrika());

    act(() => {
      result.current.trackCategoryView('psychology');
    });

    expect(metrikaModule.trackGoal).toHaveBeenCalledWith('test-counter-id', 'category_view', {
      category: 'psychology',
    });
  });

  it('tracks generic goal', () => {
    const { result } = renderHook(() => useYandexMetrika());

    act(() => {
      result.current.trackGoal('custom_goal', { custom_param: 'value' });
    });

    expect(metrikaModule.trackGoal).toHaveBeenCalledWith('test-counter-id', 'custom_goal', {
      custom_param: 'value',
    });
  });
});
