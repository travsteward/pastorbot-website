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

// Your existing features, impacts, and tiers arrays here...
const features = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Private Thread Conversations",
    description: "Create personal study spaces, explore Greek and Hebrew word meanings, and engage in deep scriptural exploration with context-aware AI."
  },
  // ... rest of your features
];

const impacts = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Deep Biblical Understanding",
    description: "Access seminary-level insights and scholarly perspectives"
  },
  // ... rest of your impacts
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
      {/* Your existing JSX structure */}
      {/* Update the pricing section to include the new handleGetStarted function */}
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