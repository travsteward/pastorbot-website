import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { redirectToDiscordAuth } from '../utils/discord';
import { ExternalLink, Bot } from 'lucide-react';

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
      redirectToDiscordAuth();
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
          Thank you for your subscription! You'll be automatically redirected to add PastorBot to your server.
        </p>
        <a
          href="https://discord.gg/dkJ6Y9Xjs8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors"
        >
          Join our Support Server <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}