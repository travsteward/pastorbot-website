import React from 'react';
import {
  MessageCircle,
  Users,
  Book,
  Headphones,
  Church,
  Crown,
  CheckCircle2,
  Bot,
  ArrowRight,
  BookOpen,
  ScrollText,
  Globe,
  Heart
} from 'lucide-react';

const challenges = [
  "Who can explain what \"doulos\" really meant in ancient Greek culture?",
  "How do we trace the deep connections between Old Testament prophecies and their New Testament fulfillment?",
  "What were the social dynamics of 1st century Palestine that give context to Jesus' parables?",
  "Where can we find unbiased, scholarly insights without years of seminary education?",
  "How can small communities access high-quality Bible study leadership?"
];

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

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="relative z-10">
            <Bot className="w-16 h-16 mx-auto mb-8 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Unlocking Biblical Scholarship for Everyone
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The Bible is more accessible than ever - yet truly understanding Scripture remains locked behind significant barriers. Until now.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                Add to Discord
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
                Join Support Server
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The Challenge Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Modern Bible Study Challenge</h2>
          </div>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-800 text-lg">{challenge}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These knowledge bottlenecks have limited our ability to fully grasp God's word. But what if we could remove these barriers completely?
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Gateway to Biblical Scholarship</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Vision: A Biblical Knowledge Revolution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              By removing the bottleneck between people and biblical scholarship, we're enabling explosive growth in:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center">
                <div className="text-blue-600 mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                  {impact.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{impact.title}</h3>
                <p className="text-gray-600">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Community?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're starting a new digital ministry or enhancing an existing one, PastorBot provides the theological depth and accessibility your community deserves.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{tier.price}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p className="mb-4">Bringing scholarly biblical understanding to communities worldwide, one server at a time.</p>
          <p>© 2024 PastorBot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;