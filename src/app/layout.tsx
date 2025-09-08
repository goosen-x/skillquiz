import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { SoundProvider, SoundToggle } from '@/components/animations/SoundEffects';
import { EasterEggProvider, TimeBasedEasterEgg } from '@/components/animations/EasterEggs';
import { EngagementNotification } from '@/components/animations/EngagementNotification';
import { YandexMetrika } from '@/components/seo/YandexMetrika';
import { siteConfig } from '@/config/site.config';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title:
    'Professional Test - Психологические тесты онлайн бесплатно | Узнать тип личности и профессию',
  description:
    'Пройдите бесплатные психологические тесты онлайн: тест на тип личности, тест на профессию, определение характера. Быстрые и точные результаты с расшифровкой.',
  keywords:
    'психологический тест, тест на личность, тест на профессию, психология, тип личности, профориентация, бесплатно, онлайн',
  authors: [{ name: 'Professional Test Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Professional Test - Психологические тесты онлайн бесплатно',
    description:
      'Узнайте свой тип личности и подходящую профессию с помощью наших бесплатных психологических тестов',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Professional Test',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-57x57.png', sizes: '57x57' },
      { url: '/favicon-76x76.png', sizes: '76x76' },
      { url: '/favicon-120x120.png', sizes: '120x120' },
      { url: '/favicon-152x152.png', sizes: '152x152' },
      { url: '/favicon-180x180.png', sizes: '180x180' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="yandex-verification" content="22185c9579369a2c" />
        <meta name="format-detection" content="telephone=no" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-57x57.png" sizes="57x57" />
        <link rel="apple-touch-icon" href="/favicon-76x76.png" sizes="76x76" />
        <link rel="apple-touch-icon" href="/favicon-120x120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/favicon-152x152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/favicon-180x180.png" sizes="180x180" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon-512x512.png" sizes="512x512" type="image/png" />
        
        {/* Yandex.RTB загрузчик рекламы */}
        <Script id="yandex-rtb-loader" strategy="afterInteractive">
          {`window.yaContextCb=window.yaContextCb||[]`}
        </Script>
        <Script 
          src="https://yandex.ru/ads/system/context.js" 
          strategy="afterInteractive"
          async
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <YandexMetrika counterId={siteConfig.analytics.yandexMetrikaId} />
        <SoundProvider>
          <EasterEggProvider>
            {children}
            <SoundToggle />
            <TimeBasedEasterEgg />
            <EngagementNotification timeThreshold={300000} position="bottom-right" />
            <Toaster position="bottom-center" />
          </EasterEggProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
