/**
 * Central SEO configuration for PastorBot website
 * Contains core metadata that can be used across all pages
 */

export const SEO_CONFIG = {
  titleTemplate: '%s | PastorBot',
  defaultTitle: 'PastorBot - Biblical Scholarship for Everyone',
  description: 'PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI. Ask any question about Christianity and receive scholarly insights.',
  siteUrl: 'https://pastorbot.app', // Explicitly using non-www format
  ogImage: '/images/pastorbot/pastorbot.png', // We'll use an existing image
  twitter: {
    cardType: 'summary_large_image',
    handle: '@pastorbot', // Replace with actual Twitter handle if available
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'discord bot, bible study, theological ai, biblical scholarship, pastor bot, bible bot, ai bible assistant, seminary, theological analysis, scripture study',
    },
  ],
};

// URL canonicalization helper function
export const getCanonicalUrl = (path: string) => {
  // Simple absolute URL formation without modifying the path
  // This prevents potential redirect loops from path manipulation
  if (path.startsWith('http')) {
    return path; // If it's already an absolute URL, don't modify it
  }

  // Ensure path starts with slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;

  return `${SEO_CONFIG.siteUrl}${formattedPath}`;
};

/**
 * SEO keyword clusters organized by topic
 * These can be used to optimize content and meta tags on specific pages
 */
export const SEO_KEYWORDS = {
  core: [
    'PastorBot',
    'Discord bot',
    'Bible study',
    'Biblical scholarship',
    'AI Bible assistant',
    'theological AI',
    'seminary-level insights',
  ],
  features: [
    'voice chat Bible study',
    'theological perspectives',
    'interactive Bible study',
    'Discord Bible bot',
    'audio Bible explanations',
    'historical context',
    'exegesis',
    'theological analysis',
  ],
  audience: [
    'Discord communities',
    'Bible study groups',
    'churches',
    'seminary students',
    'theology enthusiasts',
    'pastors',
    'biblical scholars',
    'community groups',
  ],
  intents: [
    'learn about the Bible',
    'understand scripture historically',
    'theological perspectives',
    'biblical interpretation',
    'seminary-level Bible teaching',
    'add Bible bot to Discord',
    'interactive Bible study',
  ],
};

/**
 * FAQ Schema for structured data
 * This helps search engines understand the common questions about PastorBot
 */
export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is PastorBot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PastorBot is an AI-powered biblical assistant for Discord that brings seminary-level biblical understanding directly to your community through the power of AI. It offers scholarly insights, historical context, and theological analysis."
      }
    },
    {
      "@type": "Question",
      "name": "Is PastorBot free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, PastorBot offers a free Community tier with daily Bible study teachings, audio for verses, and limited PastorBot conversations (5 queries per day). Premium tiers offer additional features and unlimited usage."
      }
    },
    {
      "@type": "Question",
      "name": "How do I add PastorBot to my Discord server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can add PastorBot to your Discord server by clicking the 'Add to Discord' button on our website, which will guide you through the authorization process to install the bot on your server."
      }
    },
    {
      "@type": "Question",
      "name": "What theological perspectives does PastorBot offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PastorBot provides multiple theological perspectives including Catholic, Orthodox, and Protestant viewpoints. It can also engage as historical figures like C.S. Lewis to provide diverse insights into biblical interpretation."
      }
    },
    {
      "@type": "Question",
      "name": "Can PastorBot join voice channels for Bible study?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, PastorBot has interactive voice capabilities and can join your Discord voice channels to participate in Bible studies, providing audio explanations of scripture, historical context, and theological insights."
      }
    }
  ]
};

export const getPageSchema = (page: string) => {
  const baseSchema = {
    "@context": "https://schema.org",
  };

  const schemas = {
    home: {
      ...baseSchema,
      "@type": "SoftwareApplication",
      "name": "PastorBot",
      "applicationCategory": "DiscordBot",
      "operatingSystem": "Discord",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": SEO_CONFIG.description,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "125"
      }
    },
    faq: FAQ_SCHEMA,
    privacy: {
      ...baseSchema,
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "PastorBot's privacy policy outlines how we handle your personal data, including Discord user information, conversation data, and subscription details."
    },
    terms: {
      ...baseSchema,
      "@type": "WebPage",
      "name": "Terms of Service",
      "description": "PastorBot's terms of service outline the conditions for using our AI-powered biblical assistant Discord bot."
    }
  };

  return schemas[page as keyof typeof schemas] || null;
};