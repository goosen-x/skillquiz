// Утилиты для создания коротких ссылок на результаты

import { UniversalTestResult } from '@/lib/test-loader';

// Генерация короткой ссылки для просмотра результата
export function generateShortResultUrl(
  testSlug: string,
  result: UniversalTestResult | { id?: string; name?: string; title?: string },
  scores?: { [key: string]: number }
): string {
  const params = new URLSearchParams();

  // Добавляем тип результата
  let resultId = '';
  if (result.id) {
    resultId = result.id;
  } else if ('name' in result) {
    resultId = result.name;
  } else if ('title' in result) {
    resultId = result.title || '';
  }
  params.set('r', resultId);

  // Для тестов с оценками добавляем их в сжатом формате
  if (scores) {
    const scoreValues = Object.values(scores)
      .map((s) => Math.round(s))
      .join(',');
    params.set('s', scoreValues);
  }

  // Добавляем временную метку для уникальности
  params.set('t', Date.now().toString(36));

  return `/tests/${testSlug}/result?${params.toString()}`;
}

// Парсинг короткой ссылки
export interface ShortUrlData {
  resultType: string;
  scores?: number[];
  timestamp?: string;
}

export function parseShortUrl(searchParams: URLSearchParams): ShortUrlData | null {
  const resultType = searchParams.get('r');
  const scoresParam = searchParams.get('s');
  const timestamp = searchParams.get('t');

  if (!resultType) {
    return null;
  }

  return {
    resultType,
    scores: scoresParam ? scoresParam.split(',').map(Number) : undefined,
    timestamp: timestamp || undefined,
  };
}

// Сжатие массива ответов в строку
export function compressAnswers(answers: number[]): string {
  // Конвертируем массив чисел в строку
  // Для ответов от 1 до 5 используем прямое представление
  return answers.join('');
}

// Распаковка строки в массив ответов
export function decompressAnswers(compressed: string): number[] {
  return compressed.split('').map(Number);
}

// Генерация полной ссылки для точного воспроизведения
export function generateFullResultUrl(
  testSlug: string,
  answers: number[],
  includeBase64: boolean = false
): string {
  if (includeBase64) {
    // Используем существующую систему base64 для полной ссылки
    return `/tests/${testSlug}/results/full?data=${btoa(JSON.stringify(answers))}`;
  }

  // Компактная версия с сжатыми ответами
  const compressed = compressAnswers(answers);
  return `/tests/${testSlug}/results/full?a=${compressed}`;
}
