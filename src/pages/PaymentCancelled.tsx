import { Bot, ArrowRight, RotateCcw } from 'lucide-react';

export default function PaymentCancelled() {
  const returnToDiscord = () => {
    window.location.href = 'https://discord.com/channels/@me';
  };

  // This would need to be replaced with the actual premium subscription URL
  const tryAgain = () => {
    window.location.href = 'https://discord.com/channels/@me';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="max-w-md w-full bg-dark-card border border-dark-border shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Bot className="w-12 h-12 text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-4">Payment Cancelled</h1>
        <p className="text-gray-400 mb-6">
          Your subscription payment was not completed. Premium features are still waiting for you!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={tryAgain}
            className="button-gradient text-white px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2"
          >
            Try Again <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={returnToDiscord}
            className="bg-dark-button text-white px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2"
          >
            Return to Discord <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}