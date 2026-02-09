import React, { useEffect } from 'react';
import { redirectToCheckout } from '../utils/stripe';
import { redirectToDiscordAuth } from '../utils/discord';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Heart,
  ScrollText,
} from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { Link } from 'react-router-dom';
import SEO from '../utils/SEO';
import { SEO_CONFIG, getPageSchema } from '../utils/seo-data';

// Define your price IDs here
const PRICE_IDS = {
  COMMUNITY: 'price_1QtWxCLK64haKytl1k9Etklp',
  DISCIPLESHIP: 'price_1QtWxaLK64haKytlqnojtTEH',
  MINISTRY: 'price_1QtWxzLK64haKytlUKcIi2C0'
};

const impacts = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "No Gatekeeper Required",
    description: "Any group can run a seminary-quality Bible study without a trained leader"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "No Single Interpreter's Bias",
    description: "24 theological perspectives ensure you see Scripture through multiple lenses, not one person's agenda"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Community, Not Isolation",
    description: "Built for groups studying together in Discord, not individuals reading alone"
  },
  {
    icon: <ScrollText className="w-6 h-6" />,
    title: "Depth Without Barriers",
    description: "Original languages, historical context, and typological analysis accessible to everyone"
  }
];

const tiers = [
  {
    name: "Community",
    price: "Free",
    priceId: PRICE_IDS.COMMUNITY,
    features: [
      "Weekly group Bible study — Life of Jesus theme (52 weeks)",
      "Automated Daily Bread scripture with context and audio",
      "PastorBot conversations (5 queries per day, all formats)",
      "Voice channel integration for immersive group study",
      "Historical context, exegesis, and discussion questions"
    ]
  },
  {
    name: "Discipleship",
    price: "$2.99/mo",
    priceId: PRICE_IDS.DISCIPLESHIP,
    features: [
      "Premium access for you — one user, full power",
      "All five Bible study themes (260+ curated passages)",
      "Create Your Own Study — any passage, full scholarly treatment",
      "24 theological personas from Augustine to N.T. Wright",
      "Unlimited conversations with conversational memory"
    ]
  },
  {
    name: "Ministry",
    price: "$12.99/mo",
    priceId: PRICE_IDS.MINISTRY,
    features: [
      "Everything in Discipleship — unlocked for EVERY member",
      "Your whole server gets premium, not just you",
      "Server-wide persona and voice configuration",
      "Unlimited Bible studies and pastoral conversations for all",
      "Ideal for churches and ministry organizations"
    ]
  }
];

export default function Home() {
  const [searchParams] = useSearchParams();

  // Get homepage schemas from centralized config
  const homeSchema = getPageSchema('home');
  const faqSchema = getPageSchema('faq');

  // Combine schemas for improved SEO
  const combinedSchemas = [homeSchema, faqSchema];

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
    if (typeof gtag === 'function') {
      gtag('event', 'add_to_server', { event_category: 'conversion' });
    }
    redirectToDiscordAuth(true);
  };

  return (
    <div className="min-h-screen bg-dark text-gray-400">
      {/* Apply both schemas */}
      {combinedSchemas.map((schema, index) => (
        schema && <SEO
          key={index}
          title={SEO_CONFIG.defaultTitle}
          description={SEO_CONFIG.description}
          canonical="https://pastorbot.app"
          image={SEO_CONFIG.ogImage}
          schema={schema}
        />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
            <span className="font-bold text-lg sm:text-xl text-white">PastorBot</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/blog" className="text-primary-500 hover:text-primary-400 text-xs sm:text-sm font-semibold">
              Blog
            </Link>
            <button
              onClick={() => redirectToDiscordAuth(true)}
              className="button-gradient text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold">
              Add to Server
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 min-h-[480px] sm:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/pastorbot/hero-image.png"
            alt=""
            className="w-full h-full object-cover object-[calc(100%+15px)] sm:object-right"
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B14] via-[#0B0B14]/80 to-transparent hidden sm:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B14] via-transparent to-[#0B0B14]/40"></div>
          {/* Extra mobile overlay for readability over image */}
          <div className="absolute inset-0 bg-[#0B0B14]/40 sm:bg-transparent"></div>
        </div>
        {/* Text content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-white">
              <span>Bible Study So Good</span><br />
              <span>Anyone Can Lead It.</span><br />
              <span className="gradient-text">On Discord.</span>
            </h1>
            <p className="text-base sm:text-xl mb-6 leading-relaxed text-gray-300">
              Seminary-depth Bible study for your Discord community — no trained leader required. Just type a command and go deep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleGetStarted()}
                className="button-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 hover:shadow-glow"
              >
                Add to Discord
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="https://discord.gg/dkJ6Y9Xjs8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-card/80 backdrop-blur-sm text-white border border-dark-border px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center"
              >
                Join Support Server
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - Reduce top padding */}
      <div className="pt-12 pb-0 gradient-section border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Your Weekly Bible Study, Handled</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
              Type <code className="text-primary-400">/study</code> and PastorBot creates a complete, interactive Bible study for your group — five curated themes spanning the entire biblical narrative, or study any passage you choose.
            </p>
          </div>

          {/* Feature 1: Rich Bible Studies */}
          <div className="mb-8 sm:mb-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4">One Command. A Full Bible Study.</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
                Type <code className="text-primary-400 text-xs sm:text-sm">/study</code>, pick a theme, and PastorBot generates a complete study session — historical backstory, scholarly exegesis, typological patterns, discussion questions, a facilitator guide, and prayers. 52 weeks of curated passages per theme, pre-generated and ready before your group sits down.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Five themes: Life of Jesus, Prophets, Wisdom, OT Foundations, Letters</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">52 curated passages per theme covering the full arc</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Full audio for every section — listen or read together</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400"><code className="text-primary-400 text-xs sm:text-sm">/study custom</code> — study any passage you choose</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary-500/25 via-primary-600/15 to-transparent rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/10 bg-[#2b2d31]">
                  <img
                    src="/images/pastorbot/theme-select-embed.png"
                    alt="PastorBot theme selection showing five Bible study themes with dropdown selector in Discord"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature: Interactive Voice and Audio */}
          <div className="mb-8 sm:mb-12 flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-12 border-t border-dark-border pt-8 sm:pt-12">
            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary-500/25 via-primary-600/15 to-transparent rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/10 bg-[#2b2d31]">
                  <img src="/images/pastorbot/pastorbot_voice1.png" alt="PastorBot in Discord Voice Channel" className="w-full" />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4">It Doesn't Just Type. It Speaks.</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
                PastorBot joins your Discord voice channel and speaks — Scripture read with reverence, historical context delivered with warmth, exegesis with scholarly precision, prayers with intimacy. Choose from five voice personas, and PastorBot adjusts its delivery for every type of content automatically.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Joins your voice channel and speaks directly to your group</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Content-aware delivery — reverent for Scripture, analytical for exegesis, intimate for prayer</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Five voice personas to match your community's preference</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Full audio for every section of every study</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2: Deep Theology & Exegesis */}
          <div className="mb-8 sm:mb-12 flex flex-col lg:flex-row items-start gap-6 lg:gap-12 border-t border-dark-border pt-8 sm:pt-12">
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4">Deeper Than Any Devotional You've Ever Read</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
                Surface-level devotionals leave you with a nice feeling and nothing to think about by lunch. PastorBot goes where most study tools won't — original Hebrew and Greek word analysis, first-century cultural context, connections to passages written centuries apart, and honest engagement with difficult texts. This is the depth you'd get from a seminary classroom, delivered in your Discord server.
              </p>

              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Original-language analysis from Hebrew and Greek sources</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">First-century historical and cultural context</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Typological patterns connecting Old and New Testaments</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Honest engagement with difficult and contested passages</span>
                </li>
              </ul>

              {/* Add heading for scripture + audio on small screens */}
              <h4 className="text-white text-base sm:text-lg font-semibold mb-3 mt-4 sm:mt-6 lg:hidden">Example Study Passage</h4>
            </div>
            {/* Wrapper for right column */}
            <div className="lg:w-1/2 w-full space-y-3 sm:space-y-4">
              {/* Scripture passage card */}
              <div className="rounded-xl border border-white/10 bg-[#1a1a2e] p-4 sm:p-6">
                <p className="text-xs uppercase tracking-widest text-primary-400 mb-2 sm:mb-3">Matthew 12:33-35</p>
                <blockquote className="text-gray-300 leading-relaxed text-xs sm:text-[15px] italic border-l-2 border-primary-500/40 pl-3 sm:pl-4">
                  "Either make the tree good and its fruit good, or make the tree bad and its fruit bad, for the tree is known by its fruit. You brood of vipers! How can you speak good, when you are evil? For out of the abundance of the heart the mouth speaks. The good person out of his good treasure brings forth good, and the evil person out of his evil treasure brings forth evil."
                </blockquote>
                <p className="text-xs text-gray-500 mt-2 sm:mt-3">English Standard Version</p>
              </div>
              {/* Audio player */}
              <AudioPlayer
                src="/audio/daily-bread/exegesis_1740331021.mp3"
                title="Scholarly Exegesis"
                subtitle="Matthew 12:33-35 — Academic interpretation and analysis"
              />
            </div>
          </div>

          {/* Feature 3: Ask Anything */}
          <div className="mb-8 sm:mb-12 flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-12 border-t border-dark-border pt-8 sm:pt-12">
            {/* Left column (embed screenshot) */}
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary-500/25 via-primary-600/15 to-transparent rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/10 bg-[#2b2d31]">
                  <img
                    src="/images/pastorbot/pastor-embed.png"
                    alt="PastorBot answering a question in Discord with scholarly sourcing and historical context"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            {/* Right column (explanation) */}
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-5">Ask Anything. Get a Real Answer.</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
                You've had questions about the Bible that Google couldn't answer well and you didn't want to ask your pastor. PastorBot gives you seminary-level answers with full context — in public, in a private thread, or in a completely confidential DM. No question is too basic. No question is too hard.
              </p>

              <ul className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Say "Pastor" in any channel for a public answer</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">/pastor opens a private thread only you can see</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">/discreet opens a fully confidential DM conversation</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Crisis-aware — surfaces emergency resources when needed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 4: Multiple Personas */}
          <div className="mb-8 sm:mb-12 flex flex-col-reverse lg:flex-row-reverse items-center gap-6 lg:gap-12 border-t border-dark-border pt-8 sm:pt-12">
            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary-500/25 via-primary-600/15 to-transparent rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/10">
                  <img src="/images/pastorbot/personas2.png" alt="Christian Thinkers Through History" className="w-full" />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-3 sm:mb-4">Study Through Augustine's Eyes. Or C.S. Lewis's. Or 22 Others.</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
                Every pastor brings their own lens to Scripture. That's not a flaw — it's how theology works. But with a human leader, you only get one. PastorBot offers 24 theological perspectives — from the Church Fathers to modern scholars, across Catholic, Orthodox, Reformed, Anglican, and more. Your community picks the lens. Or switches between them.
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Historical figures: Augustine, Aquinas, C.S. Lewis, Spurgeon</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Denominational perspectives across the entire Christian tradition</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Critical and academic scholarship viewpoints</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">Compare how different traditions read the same passage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="pt-10 sm:pt-16 pb-8 gradient-section border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              The Bible, Unlocked
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
              For centuries, the full depth of Scripture required a seminary-educated guide. PastorBot removes that barrier — permanently.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="gradient-card p-4 sm:p-8 rounded-xl text-center">
                <div className="text-primary-500 mx-auto mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-dark-card rounded-xl">
                  {impact.icon}
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-white mb-1 sm:mb-2">{impact.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pt-10 sm:pt-16 pb-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/10 text-primary-500 font-semibold text-xs sm:text-sm mb-3 sm:mb-4">
              Pricing
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Free to Start. Built to Go Deep.</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto mb-4 sm:mb-6">
              Add PastorBot to your server now and run your first Bible study today. Premium unlocks every theme, every persona, and unlimited conversations — upgrade anytime with <code>/subscription</code> in Discord.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className="gradient-card rounded-xl p-5 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">{tier.name}</h3>
                <p className="text-2xl sm:text-4xl font-bold text-primary-500 mb-4 sm:mb-8">{tier.price}</p>
                <ul className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleGetStarted()}
                  className="w-full button-gradient text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-glow"
                >
                  Add to Server
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Reduce top padding */}
      <footer className="pt-8 pb-12 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 text-center">
            <p className="text-sm sm:text-base lg:text-lg text-gray-400">Seminary-depth Bible study for every community. No seminary required.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-x-4 gap-y-2">
            <Link to="/blog" className="text-primary-500 hover:text-primary-400 text-sm">
              Blog
            </Link>
            <span className="hidden md:inline text-gray-600">•</span>
            <Link to="/privacy-policy" className="text-primary-500 hover:text-primary-400 text-sm">
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-gray-600">•</span>
            <Link to="/terms-of-service" className="text-primary-500 hover:text-primary-400 text-sm">
              Terms of Service
            </Link>
            <span className="hidden md:inline text-gray-600">•</span>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} PastorBot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}