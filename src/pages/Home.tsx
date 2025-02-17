import React, { useState } from 'react';
import { redirectToCheckout } from '../utils/stripe';
import { redirectToDiscordAuth } from '../utils/discord';
import {
  MessageCircle,
  Users,
  Book,
  Church,
  Crown,
  CheckCircle2,
  Bot,
  ArrowRight,
  BookOpen,
  ScrollText,
  Globe,
  Heart,
  X
} from 'lucide-react';

// Define your price IDs here
const PRICE_IDS = {
  COMMUNITY: 'price_1QtWxCLK64haKytl1k9Etklp',
  DISCIPLESHIP: 'price_1QtWxaLK64haKytlqnojtTEH',
  MINISTRY: 'price_1QtWxzLK64haKytlUKcIi2C0'
};

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (discordId: string) => void;
  tierName: string;
}

const DiscordModal: React.FC<DiscordModalProps> = ({ isOpen, onClose, onSubmit, tierName }) => {
  const [discordId, setDiscordId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordId.trim()) {
      setError('Please enter your Discord ID');
      return;
    }
    onSubmit(discordId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-card border border-dark-border rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">Enter Your Discord ID</h2>
        <p className="text-gray-400 mb-6">
          To continue with the {tierName} subscription, please enter your Discord ID.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            placeholder="Your Discord ID"
            className="w-full bg-dark border border-dark-border rounded-lg px-4 py-2 text-white mb-4 focus:outline-none focus:border-primary-500"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full button-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

const features = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Private Thread Conversations",
    description: "Create personal study spaces, explore Greek and Hebrew word meanings, and engage in deep scriptural exploration with context-aware AI."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Public Channel Engagement",
    description: "Start any message with \"Pastor\" for instant scholarly insight and foster group discussion around biblical themes."
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: "Multiple Theological Perspectives",
    description: "Choose from major denominational viewpoints, historical giants like Aquinas and C.S. Lewis, or critical scholarship perspectives."
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Daily Bread Studies",
    description: "Journey through Jesus' teachings with rich historical context, scholarly exegesis, and professional audio versions."
  },
  {
    icon: <Church className="w-6 h-6" />,
    title: "AI-Powered Bible Studies",
    description: "Transform your community with voice-enabled teaching, comprehensive scripture analysis, and interactive group discussions."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Digital Church Formation",
    description: "Build meaningful relationships and transform lives by creating spaces for genuine spiritual discussion and community growth."
  }
];

const impacts = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Deep Biblical Understanding",
    description: "Access seminary-level insights and scholarly perspectives"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Formation",
    description: "Build stronger spiritual bonds through shared learning"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Life Transformation",
    description: "Experience personal growth through Jesus' teachings"
  },
  {
    icon: <ScrollText className="w-6 h-6" />,
    title: "Accessible Education",
    description: "Learn at your own pace with expert guidance"
  }
];

const tiers = [
  {
    name: "Community",
    price: "Free",
    priceId: PRICE_IDS.COMMUNITY,
    features: [
      "Public channel interactions",
      "Basic Daily Bread access",
      "Community Bible study participation",
      "Standard response time"
    ]
  },
  {
    name: "Discipleship",
    price: "$9.99/mo",
    priceId: PRICE_IDS.DISCIPLESHIP,
    features: [
      "Private 1:1 pastoral conversations",
      "All denominational personas",
      "Priority response time",
      "Advanced Daily Bread features",
      "Audio teachings library"
    ]
  },
  {
    name: "Ministry",
    price: "$24.99/mo",
    priceId: PRICE_IDS.MINISTRY,
    features: [
      "Everything in Discipleship",
      "Custom church branding",
      "Unlimited Bible study sessions",
      "Advanced analytics",
      "Priority support",
      "Multiple channels support"
    ]
  }
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<{ name: string; priceId: string } | null>(null);

  const handleGetStarted = (tier: { name: string; priceId: string }) => {
    if (tier.priceId === PRICE_IDS.COMMUNITY) {
      // For free tier, redirect directly to Discord OAuth
      redirectToDiscordAuth();
    } else {
      // For paid tiers, show Discord ID modal first
      setSelectedTier(tier);
      setModalOpen(true);
    }
  };

  const handleDiscordSubmit = async (discordId: string) => {
    if (!selectedTier) return;

    try {
      await redirectToCheckout(selectedTier.priceId, discordId);
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="min-h-screen bg-dark text-gray-400">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Bot className="w-6 h-6" />
            <span className="font-bold">PastorBot</span>
          </div>
          <button className="button-gradient text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Contact Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Bot className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-primary-500">Biblical Understanding</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-500">AI-Powered</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
                Unlocking Biblical Scholarship
                <br />
                <span className="gradient-text">for Everyone</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                The Bible is more accessible than ever - yet truly understanding Scripture remains locked behind significant barriers. Until now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => redirectToDiscordAuth()}
                  className="button-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-glow"
                >
                  Add to Discord
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="https://discord.gg/dkJ6Y9Xjs8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-card text-white border border-dark-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center"
                >
                  Join Support Server
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-gray-500">Biblical Insights in Seconds</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-primary-500">$</span>
                    pastor explain doulos in Greek culture
                  </div>
                  <div className="pl-4 text-gray-500">Analyzing historical and cultural context...</div>
                  <div className="pl-4 text-gray-300">The term "doulos" in ancient Greek society...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Your Gateway to Biblical Scholarship</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-gradient p-8 rounded-xl">
                <div className="text-primary-500 bg-dark-card p-3 rounded-lg w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">The Vision: A Biblical Knowledge Revolution</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              By removing the bottleneck between people and biblical scholarship, we're enabling explosive growth in:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="gradient-card p-8 rounded-xl text-center">
                <div className="text-primary-500 mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-dark-card rounded-xl">
                  {impact.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{impact.title}</h3>
                <p className="text-gray-400">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 font-semibold text-sm mb-4">
              Pricing
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Community?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're starting a new digital ministry or enhancing an existing one, PastorBot provides the theological depth and accessibility your community deserves.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className="gradient-card rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>
                <p className="text-4xl font-bold text-primary-500 mb-8">{tier.price}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleGetStarted({ name: tier.name, priceId: tier.priceId })}
                  className="w-full button-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 text-lg text-gray-400">Bringing scholarly biblical understanding to communities worldwide, one server at a time.</p>
          <p className="text-sm text-gray-500">© 2024 PastorBot. All rights reserved.</p>
        </div>
      </footer>

      {/* Discord ID Modal */}
      <DiscordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleDiscordSubmit}
        tierName={selectedTier?.name || ''}
      />
    </div>
  );
}