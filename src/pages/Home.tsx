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
          <div className="flex items-center gap-3">
            <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-3xl text-white">PastorBot</span>
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
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
                Unlocking Biblical Scholarship
                <br />
                <span className="gradient-text">for Discord</span>
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
              <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
                <div className="bg-dark border-b border-dark-border px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-6 h-6 rounded-full" />
                    <span className="text-white font-medium">PastorBot</span>
                    <span className="text-xs bg-primary-500/20 text-primary-500 px-2 py-0.5 rounded-full">AI Assistant</span>
                  </div>
                  <span className="text-gray-500 text-xs">Today at 10:15 AM</span>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="bg-dark-card/50 p-3 rounded-lg">
                        <p className="text-gray-300 text-sm">Hi there! I'm PastorBot, your AI-powered biblical assistant. What would you like to learn about today?</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 ml-1">10:15 AM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-dark-card/50 p-3 rounded-lg">
                        <p className="text-gray-300 text-sm">Can you explain Matthew 12:33-35 in historical context?</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 ml-1">10:16 AM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="bg-dark-card/50 p-3 rounded-lg">
                        <p className="text-gray-300 text-sm mb-2">In Matthew 12:33-35, Jesus uses tree imagery to confront the Pharisees. The phrase "offspring of vipers" recalls John the Baptist's condemnation.</p>
                        <p className="text-gray-300 text-sm">This teaching connects outward speech with inner character - revolutionary in a culture focused on ritual purity rather than heart condition.</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 ml-1">10:17 AM</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark border-t border-dark-border p-3">
                  <div className="bg-dark-card/30 rounded-full px-4 py-1.5 text-gray-400 text-sm">
                    Ask a question about the Bible...
                  </div>
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
              <h3 className="text-3xl font-semibold text-white mb-4">Daily Bread</h3>

              {/* Scripture Card moved to left side */}
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

              <p className="text-gray-400 leading-relaxed mb-6">
                Experience daily teachings from Jesus with rich scholarly analysis and cultural context.
                Each Daily Bread delivers red letter teachings with historical background and academic
                insights directly to your server, complete with professional-quality audio.
              </p>
            </div>
            <div className="lg:w-1/2 bg-dark-card border border-dark-border rounded-lg overflow-hidden">
              <div className="bg-dark border-b border-dark-border px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="/images/pastorbot/pastorbot.png" alt="PastorBot" className="w-6 h-6 rounded-full" />
                  <span className="text-white font-medium">PastorBot</span>
                  <span className="text-xs bg-primary-500/20 text-primary-500 px-2 py-0.5 rounded-full">Daily Bread</span>
                </div>
                <span className="text-gray-500 text-xs">Today at 9:00 AM</span>
              </div>

              <div className="p-4 space-y-5">
                {/* Audio attachment cards with LISTEN label */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-lg text-white font-bold py-1 px-4 bg-primary-500 rounded-md shadow-md">
                      LISTEN
                    </div>
                    <div className="flex-1 border-t border-dark-border"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-dark-card/30 rounded-lg overflow-hidden border border-dark-border/50">
                      <div className="p-3 flex items-center gap-3 border-b border-dark-border/50">
                        <div className="bg-primary-500/20 p-2 rounded-full flex-shrink-0">
                          <Book className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <h6 className="text-white font-medium text-sm">Historical Background</h6>
                          <p className="text-xs text-gray-500">Learn the cultural context behind Jesus' words</p>
                        </div>
                      </div>
                      <div className="px-3 py-2">
                        <audio controls className="w-full h-8" preload="none">
                          <source src="/audio/daily-bread/backstory_1740331021.mp3" type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>

                    <div className="bg-dark-card/30 rounded-lg overflow-hidden border border-dark-border/50">
                      <div className="p-3 flex items-center gap-3 border-b border-dark-border/50">
                        <div className="bg-primary-500/20 p-2 rounded-full flex-shrink-0">
                          <ScrollText className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <h6 className="text-white font-medium text-sm">Scholarly Exegesis</h6>
                          <p className="text-xs text-gray-500">Academic interpretation and analysis</p>
                        </div>
                      </div>
                      <div className="px-3 py-2">
                        <audio controls className="w-full h-8" preload="none">
                          <source src="/audio/daily-bread/exegesis_1740331021.mp3" type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>

                    <div className="bg-dark-card/30 rounded-lg overflow-hidden border border-dark-border/50">
                      <div className="p-3 flex items-center gap-3 border-b border-dark-border/50">
                        <div className="bg-primary-500/20 p-2 rounded-full flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <h6 className="text-white font-medium text-sm">Reflection Questions</h6>
                          <p className="text-xs text-gray-500">Deepen your understanding through reflection</p>
                        </div>
                      </div>
                      <div className="px-3 py-2">
                        <audio controls className="w-full h-8" preload="none">
                          <source src="/audio/daily-bread/questions_1740331021.mp3" type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discord reactions */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="bg-dark p-1 px-2 rounded-md flex items-center gap-1 text-xs cursor-pointer hover:bg-dark-card/80">
                    <span className="text-yellow-500">✨</span>
                    <span className="text-gray-400">12</span>
                  </div>
                  <div className="bg-dark p-1 px-2 rounded-md flex items-center gap-1 text-xs cursor-pointer hover:bg-dark-card/80">
                    <span className="text-red-500">❤️</span>
                    <span className="text-gray-400">8</span>
                  </div>
                  <div className="bg-dark p-1 px-2 rounded-md flex items-center gap-1 text-xs cursor-pointer hover:bg-dark-card/80">
                    <span className="text-primary-500">🙏</span>
                    <span className="text-gray-400">24</span>
                  </div>
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
        </div>
      </footer>
    </div>
  );
}