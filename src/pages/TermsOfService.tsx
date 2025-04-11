import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../utils/SEO';
import { SEO_CONFIG, getPageSchema } from '../utils/seo-data';

export default function TermsOfService() {
  const termsSchema = getPageSchema('terms');

  return (
    <div className="bg-dark min-h-screen">
      <SEO
        title="Terms of Service"
        description="PastorBot's terms of service outline the conditions for using our AI-powered biblical assistant Discord bot, including usage guidelines and subscription terms."
        canonical="https://pastorbot.app/terms-of-service"
        image={SEO_CONFIG.ogImage}
        type="article"
        schema={termsSchema}
        noindex={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-white">Terms of Service</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-4">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
          <p className="text-gray-400 mb-4">
            By using PastorBot Discord bot and website (collectively, the "Service"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use the Service.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">2. Description of Service</h2>
          <p className="text-gray-400 mb-4">
            PastorBot is an AI-powered Discord bot that provides biblical understanding and scholarly analysis through various features including Daily Bread, scholarly conversations, interactive Bible studies, and theological perspectives.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">3. Use of Service</h2>
          <h3 className="text-lg font-medium mb-2 text-white">3.1 Eligibility</h3>
          <p className="text-gray-400 mb-4">
            You must be at least 13 years old to use the Service. By using the Service, you represent and warrant that you meet the eligibility requirements.
          </p>

          <h3 className="text-lg font-medium mb-2 text-white">3.2 User Conduct</h3>
          <p className="text-gray-400 mb-4">
            You agree not to use the Service to:
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-400">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Send spam or unsolicited messages</li>
            <li>Distribute malware or other harmful content</li>
            <li>Attempt to interfere with or disrupt the Service</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 text-white">4. Subscription and Payment</h2>
          <h3 className="text-lg font-medium mb-2 text-white">4.1 Subscription Tiers</h3>
          <p className="text-gray-400 mb-4">
            We offer the following subscription tiers:
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-400">
            <li><strong>Free Tier:</strong> Limited access to PastorBot features</li>
            <li><strong>Discipleship Tier ($2.99/month):</strong> Premium individual access</li>
            <li><strong>Ministry Tier ($24.99/month):</strong> Server-wide premium access</li>
          </ul>

          <h3 className="text-lg font-medium mb-2 text-white">4.2 Payment</h3>
          <p className="text-gray-400 mb-4">
            Payments are processed securely through Stripe. By subscribing to a paid tier, you authorize us to charge your payment method for the subscription fee on a recurring basis until your subscription is canceled.
          </p>

          <h3 className="text-lg font-medium mb-2 text-white">4.3 Subscription Management</h3>
          <p className="text-gray-400 mb-4">
            You can upgrade, downgrade, or cancel your subscription at any time with a single button click using the <code>/subscription</code> command in Discord. Cancellations will take effect at the end of the current billing period.
          </p>

          <h3 className="text-lg font-medium mb-2 text-white">4.4 Refund Policy</h3>
          <p className="text-gray-400 mb-4">
            If you are not satisfied with our Service, you may request a refund within 7 days of your initial subscription purchase. For subsequent billing cycles, refunds are generally not provided for partial subscription periods. Please contact us at support@pastorbot.app for refund requests.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">5. Intellectual Property Rights</h2>
          <p className="text-gray-400 mb-4">
            The Service and its contents, including but not limited to text, graphics, logos, and software, are owned by or licensed to us and are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">6. Limitation of Liability</h2>
          <p className="text-gray-400 mb-4">
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use or inability to use the Service.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">7. Disclaimer of Warranties</h2>
          <p className="text-gray-400 mb-4">
            The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">8. Termination</h2>
          <p className="text-gray-400 mb-4">
            We reserve the right to terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">9. Changes to Terms</h2>
          <p className="text-gray-400 mb-4">
            We may modify these Terms at any time. If we make material changes, we will notify you by posting a notice on our website or through other appropriate communication channels. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
          </p>

          <h2 className="text-xl font-semibold mb-4 text-white">10. Contact Information</h2>
          <p className="text-gray-400 mb-4">
            If you have any questions about these Terms, please contact us at support@pastorbot.app.
          </p>
        </div>
      </div>
    </div>
  );
}