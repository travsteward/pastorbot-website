import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://pastorbot.app';
const blogDir = join(__dirname, '..', 'src', 'content', 'blog');
const outFile = join(__dirname, '..', 'public', 'sitemap.xml');

function getDateFromFrontmatter(raw) {
  const match = raw.match(/^---\r?\n[\s\S]*?date:\s*(\S+)[\s\S]*?\r?\n---/);
  return match ? match[1] : new Date().toISOString().split('T')[0];
}

const today = new Date().toISOString().split('T')[0];

// Static pages
const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE_URL}/blog`, lastmod: today, priority: '0.8', changefreq: 'weekly' },
];

// Blog posts
const files = readdirSync(blogDir).filter(f => f.endsWith('.md'));
for (const file of files) {
  const raw = readFileSync(join(blogDir, file), 'utf-8');
  const slug = file.replace(/\.md$/, '');
  const date = getDateFromFrontmatter(raw);
  urls.push({ loc: `${SITE_URL}/blog/${slug}`, lastmod: date, priority: '0.7', changefreq: 'monthly' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(outFile, xml, 'utf-8');
console.log(`Sitemap generated with ${urls.length} URLs: ${outFile}`);
