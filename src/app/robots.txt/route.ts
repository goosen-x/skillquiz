export function GET() {
  return new Response(`User-agent: Yandex
Allow: /
Sitemap: https://psytest.ru/sitemap.xml
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content
Host: https://psytest.ru

User-agent: Googlebot
Allow: /
Sitemap: https://psytest.ru/sitemap.xml

User-agent: *
Allow: /
Crawl-delay: 1
Sitemap: https://psytest.ru/sitemap.xml`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}