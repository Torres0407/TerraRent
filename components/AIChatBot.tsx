
import React, { useState } from 'react';
import { getTravelPlanAdvice } from '../services/geminiService';

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hi! I am your TerraRent AI concierge. What kind of sanctuary are you looking for today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const aiResponse = await getTravelPlanAdvice(userMessage);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || "Sorry, I couldn't process that." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="flex flex-col w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="font-bold">AI Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-accent">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sand-light/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-text-main border border-primary/5 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-white text-text-main border border-primary/5 rounded-2xl rounded-tl-none animate-pulse text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for a cozy villa..."
                className="flex-1 rounded-full border-gray-200 text-sm focus:ring-primary focus:border-primary"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="size-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-hover transition-colors"
              >
                <span className="material-symbols-outlined" style={{fontSize: '20px'}}>send</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group"
        >
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">auto_awesome</span>
          <span className="font-bold text-sm">AI Assistant</span>
        </button>
      )}
    </div>
  );
};
