import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../utils/SEO';
import { SEO_CONFIG } from '../utils/seo-data';

export default function NotFound() {
  return (
    <div className="bg-dark min-h-screen flex flex-col items-center justify-center text-center px-4">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to the PastorBot homepage to explore our AI-powered biblical assistant for Discord."
        canonical="https://pastorbot.app/404"
        noindex={true}
        image={SEO_CONFIG.ogImage}
      />

      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link to="/" className="button-gradient text-white px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 hover:shadow-glow">
          <ArrowLeft className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}