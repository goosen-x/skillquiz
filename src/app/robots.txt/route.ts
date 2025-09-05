import { siteConfig } from '@/config/site.config';

export function GET() {
  const siteUrl = siteConfig.url;

  return new Response(
    `User-agent: Yandex
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content
Host: ${siteUrl}

User-agent: Googlebot
Allow: /
Sitemap: ${siteUrl}/sitemap.xml

User-agent: *
Allow: /
Crawl-delay: 1
Sitemap: ${siteUrl}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
