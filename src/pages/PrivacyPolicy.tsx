import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../utils/SEO';
import { SEO_CONFIG, getPageSchema } from '../utils/seo-data';

export default function PrivacyPolicy() {
  const privacySchema = getPageSchema('privacy');

  return (
    <div className="bg-dark min-h-screen">
      <SEO
        title="Privacy Policy"
        description="PastorBot's privacy policy outlines how we handle your personal data, including Discord user information, conversation data, and subscription details."
        path="privacy-policy"
        image={SEO_CONFIG.ogImage}
        type="article"
        schema={privacySchema}
        noindex={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-white">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-4">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">1. Introduction</h2>
          <p className="text-gray-400 mb-4">
            Welcome to PastorBot ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Discord bot and website.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">2. Information We Collect</h2>
          <h3 className="text-lg font-medium mb-2 text-white">2.1 Personal Information</h3>
          <p className="text-gray-400 mb-4">
            When you use our services, we may collect:
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-400">
            <li>Discord user ID</li>
            <li>Discord server ID (for servers where PastorBot is installed)</li>
            <li>Subscription status and tier</li>
            <li>Payment information (processed securely through Stripe)</li>
          </ul>

          <h3 className="text-lg font-medium mb-2 text-white">2.2 Conversation Data</h3>
          <p className="text-gray-400 mb-4">
            We store a limited conversation history (maximum of 10 recent messages) solely for the purpose of providing context-aware responses during active conversations. This data is not permanently stored or used for any other purpose.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
          <p className="text-gray-400 mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-400">
            <li>Provide and maintain our services</li>
            <li>Process payments and manage subscriptions</li>
            <li>Provide context-aware responses in conversations</li>
            <li>Improve and personalize user experience</li>
            <li>Communicate with you about your account or services</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 text-white">4. Data Sharing and Disclosure</h2>
          <p className="text-gray-400 mb-4">
            We do not sell or rent your personal information. We may share information with:
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-400">
            <li>Stripe (for payment processing)</li>
            <li>Discord (as necessary for bot functionality)</li>
            <li>Service providers who help us operate our services</li>
            <li>When required by law or to protect our rights</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 text-white">5. Data Security</h2>
          <p className="text-gray-400 mb-4">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">6. Your Rights</h2>
          <p className="text-gray-400 mb-4">
            Depending on your location, you may have rights to:
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-400">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your information</li>
            <li>Object to or restrict processing of your information</li>
            <li>Data portability</li>
          </ul>
          <p className="text-gray-400 mb-4">
            To exercise these rights, please contact us.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">7. Subscription Management</h2>
          <p className="text-gray-400 mb-4">
            You can easily upgrade, downgrade, or cancel your subscription at any time with a single button click using the <code>/subscription</code> command directly in Discord.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">8. Children's Privacy</h2>
          <p className="text-gray-400 mb-4">
            Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">9. Changes to This Policy</h2>
          <p className="text-gray-400 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website and updating the "Last Updated" date.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">10. Contact Us</h2>
          <p className="text-gray-400 mb-4">
            If you have questions about this Privacy Policy, please contact us at: support@pastorbot.app
          </p>
        </div>
      </div>
    </div>
  );
}