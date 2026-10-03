import React, { useState } from 'react';
import { useFoodLoop } from '../context/FoodLoopContext';
import { sound } from '../utils/sound';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAssistantView: React.FC = () => {
  const { currentUser } = useFoodLoop();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello! 👋 I'm **Loopie**, your FoodLoop Surplus Food Rescue Assistant!\n\nI can help you:\n• Assess whether surplus food meets redistribution guidelines\n• Recommend the right shelter or NGO for your food type\n• Calculate estimated meals and CO₂e environmental impact\n• Provide cold-chain safe handling and packaging reminders\n\n*Important Food Safety Notice: My advice is advisory. Food donors and authorized recipient staff are always responsible for final sensory inspection and compliance with local public health regulations.*`,
      timestamp: 'Just now',
    },
  ]);

  const quickQuestions = [
    '🥗 How long can cooked rice bowls be held before pickup?',
    '🚚 What temperature is required for dairy & plant milks?',
    '📊 How do you calculate meals from 25kg of pasta?',
    '🛡️ How does FoodLoop detect suspicious listings?',
  ];

  const handleSend = async (messageToSend?: string) => {
    const text = messageToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    sound.playPop(520);
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            userRole: currentUser.role,
            userOrg: currentUser.organizationName,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        sound.playNotification();
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          text: data.reply || 'I am ready to help with your food rescue questions!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API response failed');
      }
    } catch {
      sound.playNotification();
      const fallbackMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: `Here is the recommended guidance on your request:\n\n• **Temperature Controls**: Keep chilled items strictly at or below 4°C (40°F) in food-grade coolers. Keep hot prepared foods above 60°C (140°F).\n• **Packaging**: Clearly label containers with contents, preparation timestamp, and allergen notes.\n• **Receiver Pairing**: High-volume prepared dishes are ideally routed to evening shelters with immediate dining services.\n\n*Reminder: Final food safety verification must always be performed in person by the donor and receiver before distribution.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400 p-1 rounded-3xl shadow-sm">
        <div className="bg-white rounded-[22px] p-6 sm:p-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl">
              🦉
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Loopie AI Food Assistant
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Surplus safety estimation, cold-chain reminders, categorization & fraud detection.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Powered by Gemini 3.8 Flash</span>
          </div>
        </div>
      </div>

      {/* Mandatory Food Safety Disclaimer Banner */}
      <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-extrabold">Important Food Safety Policy:</strong>
          <span className="block mt-0.5 text-amber-800 leading-relaxed">
            AI recommendations are advisory estimates. The AI must never be treated as a medical guarantee of safety. Donors and authorized food safety organizations retain full legal responsibility for evaluating food suitability under local health codes.
          </span>
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {m.sender === 'user' ? currentUser.avatarEmoji : '🦉'}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <div
                  className={`text-[10px] text-right pt-1 opacity-70 ${
                    m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-base shrink-0">
                🦉
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 text-slate-600 border border-slate-200 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Loopie is analyzing surplus parameters...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex gap-2 overflow-x-auto">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-bold text-slate-700 bg-white hover:bg-amber-50 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-amber-200 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Loopie about surplus shelf life, packaging, or safe transport..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xs sm:text-sm font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputMessage.trim()}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold text-sm shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
