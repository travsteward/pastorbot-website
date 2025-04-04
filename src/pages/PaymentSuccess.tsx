import { useSearchParams } from 'react-router-dom';
import { Bot, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  // We log the session ID for debugging but don't require it for page display
  const sessionId = searchParams.get('session_id');
  console.log('Session ID:', sessionId);

  const returnToDiscord = () => {
    window.location.href = 'https://discord.com/channels/@me';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="max-w-md w-full bg-dark-card border border-dark-border shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Bot className="w-12 h-12 text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-primary-500 mb-4">Thank you for subscribing to PastorBot Premium!</h1>
        <p className="text-gray-400 mb-4">
          Your payment has been processed successfully. Our system is now linking your subscription to your Discord account.
        </p>
        <p className="text-gray-400 mb-6">
          You'll receive confirmation in Discord once your premium role has been assigned (this usually happens within a few minutes).
        </p>
        <button
          onClick={returnToDiscord}
          className="button-gradient text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
        >
          Return to Discord <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}