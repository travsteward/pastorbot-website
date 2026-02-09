import React, { useEffect } from 'react';
import { redirectToCheckout } from '../utils/stripe';
import { redirectToDiscordAuth } from '../utils/discord';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  Book,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  ScrollText,
  Heart,
  Volume2
} from 'lucide-react';
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
          <div className="flex items-center gap-3">
            <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-3xl text-white">PastorBot</span>
          </div>
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

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
                <span>Bible Study So Good</span><br />
                <span>Anyone Can Lead It.</span><br />
                <span className="gradient-text">On Discord.</span>
              </h1>
              <p className="text-xl mb-6 leading-relaxed">
                Deep Bible study has always required a pastor or seminary-trained leader — locking millions out of Scripture's full depth. PastorBot delivers the scholarship, so any group can go deep on their own. No gatekeeper. No single interpreter's agenda. Just the Word.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleGetStarted()}
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
              <h3 className="text-white text-xl font-semibold mb-4 text-center lg:text-left">Example Interaction</h3>
              <div className="bg-dark-card border border-primary-500/20 rounded-xl overflow-hidden shadow-lg shadow-primary-500/5">
                <div className="bg-dark/70 border-b border-primary-500/30 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-7 h-7 rounded-full border border-primary-500/30" />
                    <span className="text-white font-medium">PastorBot</span>
                  </div>
                  <span className="text-gray-500 text-xs">Today at 10:15 AM</span>
                </div>
                <div className="p-5 space-y-5 bg-gradient-to-b from-dark-card to-dark-card/80">
                  <div className="flex items-start gap-4">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-9 h-9 rounded-full flex-shrink-0 mt-1 border border-primary-500/20 shadow-sm" />
                    <div className="flex-1">
                      <div className="bg-dark/50 p-4 rounded-lg border border-primary-500/10 shadow-sm">
                        <p className="text-gray-300 text-sm">Hi there! I'm PastorBot, your AI-powered biblical assistant. What would you like to learn about today?</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5 ml-1">10:15 AM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-blue-500/20 shadow-sm">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-dark/50 p-4 rounded-lg border border-blue-500/10 shadow-sm">
                        <p className="text-gray-300 text-sm">Can you explain Matthew 12:33-35 in historical context?</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5 ml-1">10:16 AM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-9 h-9 rounded-full flex-shrink-0 mt-1 border border-primary-500/20 shadow-sm" />
                    <div className="flex-1">
                      <div className="bg-dark/50 p-4 rounded-lg border border-primary-500/10 shadow-sm">
                        <p className="text-gray-300 text-sm mb-3">In Matthew 12:33-35, Jesus uses tree imagery to confront the Pharisees. The phrase "offspring of vipers" recalls John the Baptist's condemnation.</p>
                        <p className="text-gray-300 text-sm">This teaching connects outward speech with inner character - revolutionary in a culture focused on ritual purity rather than heart condition.</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5 ml-1">10:17 AM</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark/80 border-t border-primary-500/20 p-4">
                  <div className="bg-dark/70 rounded-full px-5 py-2.5 text-gray-400 text-sm border border-primary-500/10 shadow-inner flex items-center gap-2">
                    <span className="text-primary-400 text-xs">→</span>
                    Ask a question about the Bible...
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 -left-3 h-10 bg-gradient-to-t from-dark to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - Reduce top padding */}
      <div className="pt-12 pb-0 gradient-section border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-6">Your Weekly Bible Study, Handled</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Type /study and PastorBot creates a complete, interactive Bible study for your group — five curated themes spanning the entire biblical narrative, or study any passage you choose.
            </p>
          </div>

          {/* Feature 1: Rich Bible Studies - Reduce bottom margin */}
          <div className="mb-8 flex flex-col lg:flex-row items-start gap-0 lg:gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-semibold text-white mb-4">One Command. A Full Bible Study.</h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                Type /study, pick a theme — Life of Jesus, the Prophets, Wisdom Literature, Old Testament Foundations, or Letters to the Church — and PastorBot generates a complete study session in a dedicated thread. Historical backstory, scholarly exegesis, typological patterns across all of Scripture, discussion questions, a facilitator guide, and prayers. 52 weeks of curated passages per theme, all pre-generated and ready before your group sits down.
              </p>

              {/* Add heading for scripture passage */}
              <h4 className="text-white text-lg font-semibold mb-3">Example Bible Study Passage</h4>

              {/* Scripture Card moved below paragraph */}
              <div className="border-l-4 border-primary-500 pl-4 py-1 mb-6 bg-dark-card/40 rounded-r-lg">
                <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Book className="w-4 h-4 text-primary-500" />
                  Matthew 12:33-35
                </h5>
                <div className="p-3 rounded-lg">
                  <div className="text-gray-300 italic leading-relaxed text-sm">
                    <p className="mb-2">"Either make the tree good and its fruit good, or make the tree corrupt and its fruit corrupt; for the tree is known by its fruit.</p>
                    <p className="mb-2"><span>You offspring of vipers</span>, how can you, being evil, speak good things? For out of the abundance of the heart, the mouth speaks.</p>
                    <p>The good man out of his good treasure brings out good things, and the evil man out of his evil treasure brings out evil things."</p>
                  </div>
                </div>
              </div>

              {/* Heading for audio on small screens (below passage) - Revert top margin */}
              <h4 className="text-white text-lg font-semibold mb-3 mt-6 lg:hidden">Example Bible Study Audio</h4>

            </div>
            {/* Wrapper for right column to place heading above the card */}
            <div className="lg:w-1/2 w-full">
              {/* Heading for audio on large screens (above card) - Revert margin change */}
              <h4 className="text-white text-lg font-semibold mb-3 hidden lg:block">Example Bible Study Audio</h4>
              {/* Audio Card */}
              <div className="bg-dark-card border border-primary-500/20 rounded-xl overflow-hidden shadow-lg shadow-primary-500/5">
                {/* Removed the internal heading */}
                <div className="bg-dark/70 border-b border-primary-500/30 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-7 h-7 rounded-full border border-primary-500/30" />
                    <span className="text-white font-medium">PastorBot</span>
                  </div>
                  <span className="text-gray-500 text-xs">Today at 9:00 AM</span>
                </div>

                {/* Revert padding-top change */}
                <div className="p-5 space-y-5 bg-gradient-to-b from-dark-card to-dark-card/80">
                  {/* Audio attachment cards with LISTEN label */}
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <div className="text-base text-white font-bold py-1.5 px-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg shadow-md">
                        PLAY AUDIO
                      </div>
                      <div className="flex-1 border-t border-primary-500/20"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-dark/40 rounded-xl overflow-hidden border border-primary-500/20 shadow-md hover:bg-dark/60 transition-colors duration-200">
                        <div className="p-4 flex items-center gap-4 border-b border-dark-border/50">
                          <div className="bg-primary-500/15 p-3 rounded-lg flex-shrink-0">
                            <Book className="w-5 h-5 text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h6 className="text-white font-medium text-sm">Historical Background</h6>
                              <Volume2 className="w-4 h-4 text-primary-400/70" />
                            </div>
                            <p className="text-xs text-gray-400">Learn the cultural context behind Jesus' words</p>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-dark/30">
                          <audio controls className="w-full h-12 rounded" preload="none">
                            <source src="/audio/daily-bread/backstory_1740331021.mp3" type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <p className="text-xs text-gray-500 text-center pt-2">Click the play button above to listen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Feature: Interactive Voice and Audio - Reduce top padding */}
          <div className="mb-12 flex flex-col-reverse lg:flex-row items-center gap-12 border-t border-dark-border pt-8">
            <div className="lg:w-1/2 bg-dark-card border border-primary-500/20 rounded-xl overflow-hidden shadow-lg shadow-primary-500/5">
              <div className="bg-dark border-b border-dark-border p-0">
                <img src="/images/pastorbot/pastorbot_voice1.png" alt="PastorBot in Discord Voice Channel" className="w-full" />
                <p className="text-center text-sm text-gray-500 py-3 px-2 bg-dark/70">PastorBot can join and speak in voice channels</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-semibold text-white mb-4">It Doesn't Just Type. It Speaks.</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                PastorBot joins your Discord voice channel and speaks — Scripture read with reverence, historical context delivered with warmth, exegesis with scholarly precision, prayers with intimacy. Choose from five voice personas, and PastorBot adjusts its delivery for every type of content automatically.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Joins your voice channel and speaks directly to your group</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Content-aware delivery — reverent for Scripture, analytical for exegesis, intimate for prayer</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Five voice personas to match your community's preference</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Full audio for every section of every study</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2: Deep Theology & Exegesis - Reduce top padding */}
          <div className="mb-12 flex flex-col lg:flex-row items-start gap-0 lg:gap-12 border-t border-dark-border pt-8">
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-semibold text-white mb-4">Deeper Than Any Devotional You've Ever Read</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Surface-level devotionals leave you with a nice feeling and nothing to think about by lunch. PastorBot goes where most study tools won't — original Hebrew and Greek word analysis, first-century cultural context, connections to passages written centuries apart, and honest engagement with difficult texts. This is the depth you'd get from a seminary classroom, delivered in your Discord server.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Original-language analysis from Hebrew and Greek sources</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">First-century historical and cultural context</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Typological patterns connecting Old and New Testaments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Honest engagement with difficult and contested passages</span>
                </li>
              </ul>

              {/* Add heading for audio on small screens */}
              <h4 className="text-white text-lg font-semibold mb-3 mt-6 lg:hidden">Example Exegesis Audio</h4>
            </div>
            {/* Wrapper for right column */}
            <div className="lg:w-1/2 w-full">
              {/* Add heading for audio on large screens */}
              <h4 className="text-white text-lg font-semibold mb-3 hidden lg:block">Example Exegesis Audio</h4>
              {/* Card for Exegesis Audio */}
              <div className="bg-dark-card border border-primary-500/20 rounded-xl overflow-hidden shadow-lg shadow-primary-500/5">
                <div className="bg-dark/70 border-b border-primary-500/30 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-7 h-7 rounded-full border border-primary-500/30" />
                    <span className="text-white font-medium">PastorBot</span>
                  </div>
                  <span className="text-gray-500 text-xs">Today at 10:30 AM</span>
                </div>

                <div className="p-5 space-y-5 bg-gradient-to-b from-dark-card to-dark-card/80">
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <div className="text-base text-white font-bold py-1.5 px-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg shadow-md">
                        PLAY AUDIO
                      </div>
                      <div className="flex-1 border-t border-primary-500/20"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-dark/40 rounded-xl overflow-hidden border border-primary-500/20 shadow-md hover:bg-dark/60 transition-colors duration-200">
                        <div className="p-4 flex items-center gap-4 border-b border-dark-border/50">
                          <div className="bg-primary-500/15 p-3 rounded-lg flex-shrink-0">
                            <ScrollText className="w-5 h-5 text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h6 className="text-white font-medium text-sm">Scholarly Exegesis</h6>
                              <Volume2 className="w-4 h-4 text-primary-400/70" />
                            </div>
                            <p className="text-xs text-gray-400">Academic interpretation and analysis</p>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-dark/30">
                          <audio controls className="w-full h-12 rounded" preload="none">
                            <source src="/audio/daily-bread/exegesis_1740331021.mp3" type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <p className="text-xs text-gray-500 text-center pt-2">Click the play button above to listen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Scholarly Insights - Reduce top padding */}
          <div className="mb-12 flex flex-col-reverse lg:flex-row items-start gap-0 lg:gap-12 border-t border-dark-border pt-8">
            {/* Left column (chat example) */}
            <div className="lg:w-1/2 w-full">
              {/* Add heading above chat example */}
              <h4 className="text-white text-lg font-semibold mb-3">Example Scholarly Insight</h4>
              <div className="bg-dark-card border border-primary-500/20 rounded-xl overflow-hidden shadow-lg shadow-primary-500/5">
                <div className="bg-dark/70 border-b border-primary-500/30 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-7 h-7 rounded-full border border-primary-500/30" />
                    <span className="text-white font-medium">PastorBot</span>
                  </div>
                  <span className="text-gray-500 text-xs">Today at 2:45 PM</span>
                </div>
                <div className="p-5 space-y-5 bg-gradient-to-b from-dark-card to-dark-card/80">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-blue-500/20 shadow-sm">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-dark/50 p-4 rounded-lg border border-blue-500/10 shadow-sm">
                        <p className="text-gray-300 text-sm">Pastor, is "God helps those who help themselves" in the Bible? I hear it quoted all the time.</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5 ml-1">2:45 PM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-9 h-9 rounded-full flex-shrink-0 mt-1 border border-primary-500/20 shadow-sm" />
                    <div className="flex-1">
                      <div className="bg-dark/50 p-4 rounded-lg border border-primary-500/10 shadow-sm">
                        <p className="text-gray-300 text-sm mb-3">This phrase isn't found in scripture. It originates from Benjamin Franklin's "Poor Richard's Almanack" (1736) and reflects Enlightenment thinking.</p>
                        <p className="text-gray-300 text-sm">The Bible teaches the opposite - God helping the helpless. In Romans 5:8, <span className="text-primary-400">"While we were still sinners, Christ died for us."</span> Salvation is God's initiative, not our effort (Ephesians 2:8-9).</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5 ml-1">2:47 PM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-blue-500/20 shadow-sm">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-dark/50 p-4 rounded-lg border border-blue-500/10 shadow-sm">
                        <p className="text-gray-300 text-sm">Wow, I had no idea! Are there other common "biblical" sayings that aren't actually in the Bible?</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1.5 ml-1">2:48 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right column (explanation) */}
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-semibold text-white mb-5">Ask Anything. Get a Real Answer.</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                You've had questions about the Bible that Google couldn't answer well and you didn't want to ask your pastor. PastorBot gives you seminary-level answers with full context — in public, in a private thread, or in a completely confidential DM. No question is too basic. No question is too hard.
              </p>

              <div className="mb-6 border-l-4 border-primary-500/50 pl-4 py-2 italic">
                <p className="text-gray-300 text-sm">"PastorBot helped our Bible study group understand difficult passages by providing historical context and theological perspectives we would never have discovered on our own."</p>
                <p className="text-primary-400 text-sm mt-2">— Pastor Michael, Community Church</p>
              </div>

              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Say "Pastor" in any channel for a public answer</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">/pastor opens a private thread only you can see</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">/discreet opens a fully confidential DM conversation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Crisis-aware — surfaces emergency resources when needed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 4: Multiple Personas - Reduce top padding */}
          <div className="mb-12 flex flex-col-reverse lg:flex-row-reverse items-center gap-12 border-t border-dark-border pt-8">
            <div className="lg:w-1/2 bg-dark-card border border-primary-500/20 rounded-xl overflow-hidden shadow-lg shadow-primary-500/5">
              <div className="p-0">
                <img src="/images/pastorbot/personas2.png" alt="Christian Thinkers Through History" className="w-full rounded-lg shadow-md" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-semibold text-white mb-4">Study Through Augustine's Eyes. Or C.S. Lewis's. Or 22 Others.</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every pastor brings their own lens to Scripture. That's not a flaw — it's how theology works. But with a human leader, you only get one. PastorBot offers 24 theological perspectives — from the Church Fathers to modern scholars, across Catholic, Orthodox, Reformed, Anglican, and more. Your community picks the lens. Or switches between them.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Historical figures: Augustine, Aquinas, C.S. Lewis, Spurgeon</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Denominational perspectives across the entire Christian tradition</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Critical and academic scholarship viewpoints</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Compare how different traditions read the same passage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section - Reduce top padding */}
      <div className="pt-12 pb-8 gradient-section border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              The Bible, Unlocked
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              For centuries, the full depth of Scripture required a seminary-educated guide. PastorBot removes that barrier — permanently.
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

      {/* Pricing Section - Reduce top padding */}
      <div className="pt-6 pb-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 font-semibold text-sm mb-4">
              Pricing
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Free to Start. Built to Go Deep.</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
              Add PastorBot to your server now and run your first Bible study today. Premium unlocks every theme, every persona, and unlimited conversations — upgrade anytime with <code>/subscription</code> in Discord.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className="gradient-card rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>
                <p className="text-4xl font-bold text-primary-500 mb-8">{tier.price}</p>
                <ul className="space-y-4 mb-6">
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

      {/* Footer - Reduce top padding */}
      <footer className="pt-8 pb-12 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-400">Seminary-depth Bible study for every community. No seminary required.</p>
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