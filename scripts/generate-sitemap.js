import { writeFileSync } from 'fs'
import { resolve } from 'path'

const baseUrl = 'https://jezweb.github.io/vue-vs-react'

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/comparison', priority: '0.9', changefreq: 'weekly' },
  { path: '/comparison/components', priority: '0.8', changefreq: 'monthly' },
  { path: '/comparison/state-management', priority: '0.8', changefreq: 'monthly' },
  { path: '/comparison/lifecycle', priority: '0.8', changefreq: 'monthly' },
  { path: '/comparison/events', priority: '0.8', changefreq: 'monthly' },
  { path: '/comparison/conditional', priority: '0.8', changefreq: 'monthly' },
  { path: '/comparison/lists', priority: '0.8', changefreq: 'monthly' },
  { path: '/comparison/forms', priority: '0.8', changefreq: 'monthly' },
  { path: '/comparison/effects', priority: '0.8', changefreq: 'monthly' },
  { path: '/learn', priority: '0.9', changefreq: 'weekly' },
  { path: '/playground', priority: '0.8', changefreq: 'weekly' },
  { path: '/decision-helper', priority: '0.9', changefreq: 'weekly' },
]

const generateSitemap = () => {
  const date = new Date().toISOString().split('T')[0]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml')
  writeFileSync(outputPath, sitemap)
  console.log('✅ Sitemap generated successfully at:', outputPath)
}

generateSitemap()