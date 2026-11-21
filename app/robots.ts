import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

// /api/ — служебные ответы. Страницы результатов не закрываем: на них стоит
// noindex, а ботам соцсетей нужно забирать оттуда OG-картинку.
const DISALLOW = ['/api/']

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: '*', allow: '/', disallow: DISALLOW },
			{ userAgent: 'Yandex', allow: '/', disallow: DISALLOW },
			{ userAgent: 'Googlebot', allow: '/', disallow: DISALLOW }
		],
		sitemap: `${SITE.url}/sitemap.xml`,
		host: SITE.url
	}
}
