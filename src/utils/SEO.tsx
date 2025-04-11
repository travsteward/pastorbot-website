import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown>;
}

const SEO = ({
  title = 'PastorBot - Biblical Scholarship for Everyone',
  description = 'PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI. Ask any question about Christianity and receive scholarly insights.',
  canonical = 'https://pastorbot.app',
  image = '/images/pastorbot/pastorbot_og.png',
  type = 'website',
  schema
}: SEOProps) => {
  const fullTitle = title === 'PastorBot - Biblical Scholarship for Everyone'
    ? title
    : `${title} | PastorBot`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
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