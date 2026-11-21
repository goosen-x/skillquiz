import './globals.css'
import type { Metadata, Viewport } from 'next'
import { ReactNode, Suspense } from 'react'
import { cn } from '@/lib/utils'
import { SiteFooter } from '@/components/layout'
import Header from '@/components/layout/Header/Header'
import YandexMetrika from '@/components/analytics/YandexMetrika'
import { ScrollToTop } from '@/components/global/ScrollToTop'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { NavigationProgress } from '@/components/ui/navigation-progress'
import { CookieConsent } from '@/components/global/CookieConsent'
import { ChunkErrorReload } from '@/components/global/ChunkErrorReload'
import { SiteStructuredData } from '@/components/seo/SiteStructuredData'
import { interFont, onestFont } from '@/lib/fonts/fonts'
import { SITE } from '@/lib/site'

const TITLE = 'SkillQuiz: психологические тесты онлайн с разбором результата'

export const metadata: Metadata = {
	metadataBase: new URL(SITE.url),
	title: {
		default: TITLE,
		template: '%s | SkillQuiz'
	},
	description: SITE.description,
	applicationName: SITE.name,
	creator: SITE.author,
	publisher: SITE.name,
	openGraph: {
		type: 'website',
		locale: SITE.locale,
		url: SITE.url,
		siteName: SITE.name,
		title: TITLE,
		description: SITE.description
	},
	twitter: {
		card: 'summary_large_image',
		title: TITLE,
		description: SITE.description
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' }
		],
		apple: [{ url: '/favicon-180x180.png', sizes: '180x180' }]
	},
	alternates: {
		canonical: '/',
		types: { 'application/rss+xml': `${SITE.url}/rss.xml` }
	},
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
	},
	manifest: '/manifest.json',
	formatDetection: { telephone: false },
	other: { 'mobile-web-app-capable': 'yes' }
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fcfbf9' },
		{ media: '(prefers-color-scheme: dark)', color: '#0e0c15' }
	]
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html
			lang='ru'
			data-scroll-behavior='smooth'
			className={cn('scroll-smooth scroll-pt-20', interFont.variable, onestFont.variable)}
			suppressHydrationWarning
		>
			<body className={cn('flex min-h-dvh flex-col bg-background font-sans antialiased', interFont.className)}>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					<Suspense fallback={null}>
						<NavigationProgress />
					</Suspense>
					<YandexMetrika />
					<ChunkErrorReload />
					<Header />
					<SiteStructuredData />
					<div className='flex-1'>{children}</div>
					<SiteFooter />
					<ScrollToTop />
					<Toaster />
					<CookieConsent />
				</ThemeProvider>
			</body>
		</html>
	)
}
