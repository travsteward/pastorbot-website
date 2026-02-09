import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SEO from '../utils/SEO';
import { getPostBySlug } from '../utils/blog';
import { SEO_CONFIG } from '../utils/seo-data';
import { redirectToDiscordAuth } from '../utils/discord';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Components } from 'react-markdown';

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-bold text-white mt-10 mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-4">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-3">{children}</h3>,
  h4: ({ children }) => <h4 className="text-lg font-semibold text-white mt-6 mb-2">{children}</h4>,
  p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">{children}</ol>,
  li: ({ children }) => <li className="text-gray-300">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-6 bg-dark-card/40 rounded-r-lg italic text-gray-300">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <pre className="bg-dark-card border border-dark-border rounded-lg p-4 overflow-x-auto mb-6">
          <code className="text-sm text-gray-300">{children}</code>
        </pre>
      );
    }
    return <code className="bg-dark-card text-primary-400 px-1.5 py-0.5 rounded text-sm">{children}</code>;
  },
  a: ({ href, children }) => (
    <a href={href} className="text-primary-400 hover:text-primary-300 underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse border border-dark-border text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-dark-card">{children}</thead>,
  th: ({ children }) => <th className="border border-dark-border px-4 py-2 text-left text-white font-semibold">{children}</th>,
  td: ({ children }) => <td className="border border-dark-border px-4 py-2 text-gray-300">{children}</td>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  hr: () => <hr className="border-dark-border my-8" />,
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "PastorBot",
      "logo": {
        "@type": "ImageObject",
        "url": `${SEO_CONFIG.siteUrl}/images/logo/pastorbot-avatar.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SEO_CONFIG.siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-dark text-gray-400">
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        schema={articleSchema}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo/pastorbot-avatar.png" alt="PastorBot" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-3xl text-white">PastorBot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-primary-500 hover:text-primary-400 text-sm font-semibold">
              Blog
            </Link>
            <button
              onClick={() => redirectToDiscordAuth(true)}
              className="button-gradient text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Add to Server
            </button>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-400 text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{post.author}</span>
              <span>&middot;</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>&middot;</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Post content */}
          <div className="prose-dark">
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-16 gradient-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to try PastorBot?</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Add PastorBot to your Discord server for free and experience seminary-level Bible study.
            </p>
            <button
              onClick={() => redirectToDiscordAuth(true)}
              className="button-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center gap-2 hover:shadow-glow"
            >
              Add to Discord
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="pt-8 pb-12 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-4 gap-y-2">
            <Link to="/" className="text-primary-500 hover:text-primary-400 text-sm">
              Home
            </Link>
            <span className="hidden md:inline text-gray-600">&bull;</span>
            <Link to="/blog" className="text-primary-500 hover:text-primary-400 text-sm">
              Blog
            </Link>
            <span className="hidden md:inline text-gray-600">&bull;</span>
            <Link to="/privacy-policy" className="text-primary-500 hover:text-primary-400 text-sm">
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-gray-600">&bull;</span>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} PastorBot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
