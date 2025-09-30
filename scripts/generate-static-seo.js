#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

// Import site config (we'll need to adjust this for Node.js)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skillquiz.ru';

// All available tests - you can expand this list
const testSlugs = [
  'personality-type',
  'emotional-intelligence',
  'temperament',
  'love-language',
  'impostor-syndrome',
  'mental-resilience',
  'dopamine-detox-need',
  'anxiety-level',
  'attachment-style',
  'communication-style',
  'creativity',
  'decision-making',
  'emotional-stability',
  'entrepreneurship',
  'learning-style',
  'management-style',
  'memory-type',
  'perfectionism',
  'procrastination',
  'sales-potential',
  'self-esteem',
  'social-intelligence',
  'time-management',
  'work-motivation',
  'leadership-style',
  'stress-management',
  'career-orientation',
  'conflict-resolution',
  'teamwork-skills',
  'motivation-type',
  'burnout-risk',
];

// Generate robots.txt content
function generateRobotsTxt() {
  return `# Robots.txt for ${siteUrl}
# Optimized for Yandex

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Crawl-delay: 1

User-agent: Yandex
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Crawl-delay: 0.5
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content&yclid

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Host for Yandex
Host: ${siteUrl.replace('https://', '')}`;
}

// Generate sitemap.xml content
function generateSitemap() {
  const currentDate = new Date().toISOString();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/tests</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

  // Add test pages
  testSlugs.forEach((slug) => {
    sitemap += `
  <url>
    <loc>${siteUrl}/tests/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add test categories
  const categories = ['psychology', 'career', 'lifestyle'];
  categories.forEach((category) => {
    sitemap += `
  <url>
    <loc>${siteUrl}/tests?category=${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Main function
async function generateStaticSeoFiles() {
  const publicDir = path.join(process.cwd(), 'public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Generate robots.txt
    const robotsContent = generateRobotsTxt();
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf8');
    console.log('✅ Generated static robots.txt');

    // Generate sitemap.xml
    const sitemapContent = generateSitemap();
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8');
    console.log('✅ Generated static sitemap.xml');

    console.log(`🚀 Static SEO files generated for: ${siteUrl}`);
  } catch (error) {
    console.error('❌ Error generating static SEO files:', error);
    process.exit(1);
  }
}

// Run the script
generateStaticSeoFiles();
