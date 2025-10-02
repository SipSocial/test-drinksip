import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = new URL(request.url).origin;
  
  // Static pages
  const staticPages = [
    '',
    '/collections/all',
    '/collections/core-series',
    '/collections/refresher-series',
    '/collections/artist-series',
    '/search',
    '/pages/about',
    '/pages/where-to-buy',
    '/pages/partners'
  ];

  // Product pages (mock data - replace with real product fetching)
  const productPages = [
    '/products/hazy-ipa',
    '/products/watermelon-refresher',
    '/products/blood-orange-refresher',
    '/products/lemon-lime-refresher',
    '/products/311-hazy-ipa',
    '/products/deftones-tone-zero-lager'
  ];

  const allPages = [...staticPages, ...productPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => {
  const url = `${baseUrl}${page}`;
  const priority = page === '' ? '1.0' : page.startsWith('/products/') ? '0.8' : '0.7';
  const changefreq = page === '' ? 'daily' : page.startsWith('/products/') ? 'weekly' : 'monthly';
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
}
