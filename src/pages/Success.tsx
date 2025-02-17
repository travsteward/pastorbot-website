import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { redirectToDiscordAuth } from '../utils/discord';

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Processing...');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const code = searchParams.get('code');

    if (code) {
      // Discord OAuth success
      setMessage('Bot added successfully! You can now close this window and start using PastorBot in your server.');
    } else if (sessionId) {
      // Stripe checkout success
      setMessage('Thank you for your subscription! Please proceed to add PastorBot to your Discord server.');
      // After showing the message for a few seconds, redirect to Discord OAuth
      const timer = setTimeout(() => {
        redirectToDiscordAuth();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setMessage('Invalid session. Please try again.');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="max-w-md w-full bg-dark-card border border-dark-border shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-primary-500 mb-4">Success!</h1>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
}