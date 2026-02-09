import { Link } from 'react-router-dom';
import SEO from '../utils/SEO';
import { getPageSchema } from '../utils/seo-data';
import { allPosts } from '../utils/blog';
import { redirectToDiscordAuth } from '../utils/discord';

export default function BlogList() {
  const blogSchema = getPageSchema('blog');

  return (
    <div className="min-h-screen bg-dark text-gray-400">
      <SEO
        title="Blog"
        description="Bible study tips, Discord bot guides, and theological insights from the PastorBot team."
        path="/blog"
        schema={blogSchema}
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

      {/* Header */}
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">PastorBot Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Bible study tips, Discord bot guides, and theological insights.
          </p>
        </div>
      </div>

      {/* Post Grid */}
      <div className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {allPosts.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="gradient-card rounded-xl p-6 sm:p-8 block hover:shadow-glow transition-shadow duration-300"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.description}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>&middot;</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 pb-12 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-4 gap-y-2">
            <Link to="/" className="text-primary-500 hover:text-primary-400 text-sm">
              Home
            </Link>
            <span className="hidden md:inline text-gray-600">&bull;</span>
            <Link to="/privacy-policy" className="text-primary-500 hover:text-primary-400 text-sm">
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-gray-600">&bull;</span>
            <Link to="/terms-of-service" className="text-primary-500 hover:text-primary-400 text-sm">
              Terms of Service
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
