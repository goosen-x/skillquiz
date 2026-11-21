import { getAllPosts } from '@/lib/api'
import { SITE } from '@/lib/site'

const escapeXml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export const dynamic = 'force-static'

/** RSS блога: Яндекс узнаёт о новых статьях за часы, а не дни */
export function GET() {
	const posts = getAllPosts()
	const items = posts
		.map(
			p => `
		<item>
			<title>${escapeXml(p.title)}</title>
			<link>${SITE.url}/blog/${p.slug}</link>
			<guid isPermaLink="true">${SITE.url}/blog/${p.slug}</guid>
			<pubDate>${new Date(p.date).toUTCString()}</pubDate>
			<description>${escapeXml(p.excerpt)}</description>
			<enclosure url="${SITE.url}/blog/${p.slug}/opengraph-image" type="image/png" length="0"/>
		</item>`
		)
		.join('')

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>SkillQuiz: блог</title>
		<link>${SITE.url}/blog</link>
		<description>Статьи о психологии, привычках и самопознании</description>
		<language>ru</language>
		<atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>${items}
	</channel>
</rss>`
	return new Response(rss, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
