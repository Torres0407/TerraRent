
import React, { useState, useRef, useEffect } from 'react';
import { getTravelPlanAdviceStream } from '../services/geminiService';

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Welcome to TerraRent. I am your AI concierge. How can I help you find your next sanctuary today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Placeholder for AI message that will be updated via stream
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    await getTravelPlanAdviceStream(userMessage, (updatedText) => {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { role: 'ai', text: updatedText };
        return newMessages;
      });
      setIsLoading(false);
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="flex flex-col w-80 sm:w-96 h-[550px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-primary/5 overflow-hidden transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-4">
          <div className="p-5 bg-primary text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] animate-pulse">auto_awesome</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm uppercase tracking-widest">AI Concierge</span>
                <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Always Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="size-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background-light no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-text-main border border-primary/5 rounded-tl-none font-medium'
                }`}>
                  {m.text || (isLoading && i === messages.length - 1 ? <span className="flex gap-1 items-center"><span className="size-1 bg-primary/20 rounded-full animate-bounce"></span><span className="size-1 bg-primary/20 rounded-full animate-bounce delay-100"></span><span className="size-1 bg-primary/20 rounded-full animate-bounce delay-200"></span></span> : '')}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-5 border-t bg-white">
            <div className="flex gap-3 bg-sand-light/20 p-2 rounded-2xl border border-primary/5 focus-within:border-accent/30 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Find me a cozy cabin..."
                className="flex-1 bg-transparent border-none text-sm focus:ring-0 placeholder:text-primary/30 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="size-10 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary-hover disabled:opacity-30 transition-all shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl hover:scale-105 hover:bg-primary-hover transition-all group border border-white/10"
        >
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">auto_awesome</span>
          <span className="font-black text-sm uppercase tracking-widest">Ask Concierge</span>
        </button>
      )}
    </div>
  );
};
