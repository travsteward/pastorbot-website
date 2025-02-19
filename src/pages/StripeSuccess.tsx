import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { redirectToDiscordAuth } from '../utils/discord';
import { Bot, ArrowRight } from 'lucide-react';

export default function StripeSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      redirectToDiscordAuth(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="max-w-md w-full bg-dark-card border border-dark-border shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Bot className="w-12 h-12 text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-primary-500 mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-6">
          Thank you for your subscription! You'll be automatically redirected to add PastorBot to your server in a few seconds.
        </p>
        <button
          onClick={() => redirectToDiscordAuth(true)}
          className="button-gradient text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
        >
          Add to Discord Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}