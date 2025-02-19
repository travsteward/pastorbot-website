import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Book, MessageSquare, ExternalLink } from 'lucide-react';

export default function BotSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 30000); // Longer timeout to allow reading the resources
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-6">
      <div className="max-w-2xl w-full bg-dark-card border border-dark-border shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <Bot className="w-12 h-12 text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-primary-500 mb-4 text-center">
          PastorBot Successfully Added!
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          PastorBot is now ready to use in your server. Here are some resources to help you get started:
        </p>

        <div className="grid gap-6 mb-8">
          <div className="feature-gradient p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold">Basic Commands</h3>
            </div>
            <p className="text-gray-400">
              Start with <code className="bg-dark px-2 py-1 rounded">/ask</code> to ask questions about the Bible or
              <code className="bg-dark px-2 py-1 rounded ml-1">/verse</code> to look up specific passages.
            </p>
          </div>

          <div className="feature-gradient p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Book className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold">Study Features</h3>
            </div>
            <p className="text-gray-400">
              Use <code className="bg-dark px-2 py-1 rounded">/study</code> for in-depth analysis and
              <code className="bg-dark px-2 py-1 rounded ml-1">/compare</code> to examine different translations.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://discord.gg/dkJ6Y9Xjs8"
            target="_blank"
            rel="noopener noreferrer"
            className="button-gradient px-6 py-3 rounded-lg inline-flex items-center gap-2"
          >
            Join Support Server <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}