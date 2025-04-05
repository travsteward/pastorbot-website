import React, { useEffect } from 'react';
import { redirectToCheckout } from '../utils/stripe';
import { redirectToDiscordAuth } from '../utils/discord';
import { useSearchParams } from 'react-router-dom';
import {
  MessageCircle,
  Users,
  Book,
  Crown,
  CheckCircle2,
  Bot,
  ArrowRight,
  BookOpen,
  ScrollText,
  Heart
} from 'lucide-react';

// Define your price IDs here
const PRICE_IDS = {
  COMMUNITY: 'price_1QtWxCLK64haKytl1k9Etklp',
  DISCIPLESHIP: 'price_1QtWxaLK64haKytlqnojtTEH',
  MINISTRY: 'price_1QtWxzLK64haKytlUKcIi2C0'
};

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
      "Daily Bread - daily teachings from Jesus with scholarly analysis",
      "Audio TTS of verses, historical background, and exegesis",
      "Limited access to PastorBot (5 queries per day)",
      "Basic Bible study tools"
    ]
  },
  {
    name: "Discipleship",
    price: "$9.99/mo",
    priceId: PRICE_IDS.DISCIPLESHIP,
    features: [
      "Unlimited PastorBot conversations (public, private threads, discreet DMs)",
      "Full access to Bible study tools and weekly studies",
      "Multiple denominational perspectives and historical personas",
      "Conversational memory for in-depth discussions",
      "Complete privacy for sensitive spiritual questions"
    ]
  },
  {
    name: "Ministry",
    price: "$24.99/mo",
    priceId: PRICE_IDS.MINISTRY,
    features: [
      "SERVER-WIDE premium access for all members",
      "All Discipleship tier features for everyone",
      "Public, private, and discreet PastorBot access",
      "Unlimited Bible studies and Pastor commands",
      "Ideal for churches and ministry organizations"
    ]
  }
];

export default function Home() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check for Discord ID in URL after OAuth
    const discordId = searchParams.get('discord_id');
    const selectedTierName = searchParams.get('tier');

    if (discordId && selectedTierName) {
      const tier = tiers.find(t => t.name === selectedTierName);
      if (tier) {
        redirectToCheckout(tier.priceId, discordId);
      }
    }
  }, [searchParams]);

  const handleGetStarted = () => {
    // For all tiers, redirect to Discord bot installation
    redirectToDiscordAuth(true);
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
          <button
            onClick={() => redirectToDiscordAuth(true)}
            className="button-gradient text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Add to Server
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

      {/* Features Grid - Replacing with Feature Showcase Sections */}
      <div className="py-16 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Your Gateway to Biblical Scholarship</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI.
            </p>
          </div>

          {/* Feature 1: Daily Bread */}
          <div className="mb-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="text-primary-500 bg-dark-card p-3 rounded-lg w-fit mb-6">
                <Book className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">Daily Bread</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Experience daily teachings from Jesus with rich scholarly analysis and cultural context. Each Daily Bread creates a dedicated thread featuring red letter teachings of Jesus.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Scripture verses with historical and cultural context</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Professional-quality audio you can listen to anywhere</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Rich scholarly exegesis with academic insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Experience Jesus' teachings like never before</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 bg-dark-card border border-dark-border rounded-lg p-5">
              <div className="aspect-video bg-dark rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Book className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <p className="text-gray-400">Daily Bread Visualization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Scholarly Biblical Conversations */}
          <div className="mb-24 flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 bg-dark-card border border-dark-border rounded-lg p-5">
              <div className="aspect-video bg-dark rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <p className="text-gray-400">Scholarly Conversations Visualization</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="text-primary-500 bg-dark-card p-3 rounded-lg w-fit mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">Scholarly Biblical Conversations</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Ask any question about Christianity and receive seminary-level insights with nuanced theological context. Get answers that reflect academic scholarship, not oversimplified explanations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Public channel interactions - just start with "Pastor"</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Private thread discussions with the /pastor command</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Completely private DM conversations with /discreet</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Ask sensitive questions with total confidentiality</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3: Interactive Voice Bible Studies */}
          <div className="mb-24 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="text-primary-500 bg-dark-card p-3 rounded-lg w-fit mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">Interactive Voice Bible Studies</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Transform your community's Bible study experience with PastorBot joining your voice channel, providing spoken teachings and analysis like a real pastor leading your study.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">PastorBot joins voice channels and speaks scripture</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Delivers historical context and scholarly analysis vocally</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Functions like a digital pastor guiding your study</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Makes scholarly Bible study accessible for everyone</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 bg-dark-card border border-dark-border rounded-lg p-5">
              <div className="aspect-video bg-dark rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Users className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <p className="text-gray-400">Voice Bible Studies Visualization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Multiple Theological Perspectives */}
          <div className="mb-12 flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 bg-dark-card border border-dark-border rounded-lg p-5">
              <div className="aspect-video bg-dark rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Crown className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <p className="text-gray-400">Theological Perspectives Visualization</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="text-primary-500 bg-dark-card p-3 rounded-lg w-fit mb-6">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">Multiple Theological Perspectives</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Explore Christianity through different denominational lenses and historical viewpoints. Get answers from the perspective of your own tradition or learn how others interpret the same passage.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Various denominational perspectives (Catholic, Orthodox, Protestant)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Historical theological figures like C.S. Lewis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Critical scholarship perspectives</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Understand different interpretations and theological approaches</span>
                </li>
              </ul>
            </div>
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
              Add PastorBot to your server for free and experience premium features through the <code>/subscription</code> command directly in Discord.
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
                  onClick={() => handleGetStarted()}
                  className="w-full button-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow"
                >
                  Add to Server
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
    </div>
  );
}