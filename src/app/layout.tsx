import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SoundProvider, SoundToggle } from "@/components/animations/SoundEffects";
import { EasterEggProvider, TimeBasedEasterEgg } from "@/components/animations/EasterEggs";
import { EngagementNotification } from "@/components/animations/EngagementNotification";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PsyTest - Психологические тесты онлайн бесплатно | Узнать тип личности и профессию",
  description: "Пройдите бесплатные психологические тесты онлайн: тест на тип личности, тест на профессию, определение характера. Быстрые и точные результаты с расшифровкой.",
  keywords: "психологический тест, тест на личность, тест на профессию, психология, тип личности, профориентация, бесплатно, онлайн",
  authors: [{ name: "PsyTest Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "PsyTest - Психологические тесты онлайн бесплатно",
    description: "Узнайте свой тип личности и подходящую профессию с помощью наших бесплатных психологических тестов",
    type: "website",
    locale: "ru_RU",
    siteName: "PsyTest",
  },
  alternates: {
    canonical: "https://psytest.ru",
  },
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
        <meta name="yandex-verification" content="yandex_verification_code" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
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
