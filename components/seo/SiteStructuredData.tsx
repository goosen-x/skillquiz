import { SITE } from '@/lib/site'
import { JsonLd } from './JsonLd'

/**
 * Organization + WebSite на каждой странице. У узлов есть @id, поэтому
 * поисковики склеивают их с разметкой страниц (isPartOf, publisher).
 */
export function SiteStructuredData() {
	return (
		<JsonLd
			data={[
				{
					'@context': 'https://schema.org',
					'@type': 'Organization',
					'@id': `${SITE.url}#organization`,
					name: SITE.name,
					url: SITE.url,
					logo: {
						'@type': 'ImageObject',
						url: `${SITE.url}/favicon-512x512.png`,
						width: 512,
						height: 512
					},
					sameAs: [SITE.telegram]
				},
				{
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					'@id': `${SITE.url}#website`,
					url: SITE.url,
					name: SITE.name,
					description: SITE.description,
					publisher: { '@id': `${SITE.url}#organization` },
					inLanguage: 'ru'
				}
			]}
		/>
	)
}
