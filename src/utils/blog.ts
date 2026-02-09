export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  content: string;
  readingTime: number;
}

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, string | string[]> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (!kvMatch) continue;
    const [, key, value] = kvMatch;

    // Handle arrays like tags: [foo, bar]
    const arrayMatch = value.match(/^\[(.+)\]$/);
    if (arrayMatch) {
      data[key] = arrayMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    } else {
      data[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content };
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}

const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const allPosts: BlogPost[] = Object.entries(modules)
  .map(([filepath, raw]) => {
    const slug = filepath.split('/').pop()!.replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || '',
      date: (data.date as string) || '',
      author: (data.author as string) || 'PastorBot Team',
      tags: (Array.isArray(data.tags) ? data.tags : []) as string[],
      image: (data.image as string) || undefined,
      content,
      readingTime: calculateReadingTime(content),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(p => p.slug === slug);
}
