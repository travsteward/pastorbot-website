import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from './seo-data';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown>;
  noindex?: boolean;
}

const SEO = ({
  title = 'PastorBot - Biblical Scholarship for Everyone',
  description = 'PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI. Ask any question about Christianity and receive scholarly insights.',
  canonical,
  path,
  image = '/images/pastorbot/pastorbot.png',
  type = 'website',
  schema,
  noindex = false
}: SEOProps) => {
  const fullTitle = title === 'PastorBot - Biblical Scholarship for Everyone'
    ? title
    : `${title} | PastorBot`;

  // Determine canonical URL using helper if path is provided, otherwise use provided canonical
  const canonicalUrl = path ? getCanonicalUrl(path) : canonical;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots directive */}
      {noindex && <meta name="robots" content="noindex,follow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1536" />
      <meta property="og:image:height" content="1024" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data / JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;