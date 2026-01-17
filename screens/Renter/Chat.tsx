
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getSuggestedReply } from '../../services/geminiService';

// FIX: Define a specific type for chat messages to ensure type compatibility with the geminiService.
interface ChatMessage {
  id: number;
  role: 'user' | 'owner';
  text: string;
}

export const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'owner', text: 'Hi Alex! Thanks for your interest in the Tuscan Villa. Would you like to schedule a virtual tour?' },
    { id: 2, role: 'user', text: 'Hi Sarah, yes I would love to! Is tomorrow at 2pm okay?' },
    { id: 3, role: 'owner', text: 'Tomorrow at 2pm works perfectly. I will send over the link shortly.' }
  ]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), role: 'user', text: input }]);
    setInput('');
  };

  const handleSuggestReply = async () => {
    setIsSuggesting(true);
    try {
      const suggestion = await getSuggestedReply(messages);
      setInput(suggestion);
    } catch (error) {
      console.error("Failed to get suggestion", error);
      setInput("I'm not sure what to say."); // Fallback
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="bg-background-light text-primary font-display h-screen flex flex-col overflow-hidden">
      <header className="flex-none flex items-center justify-between border-b border-primary/5 bg-white px-8 py-4 shadow-sm z-20">
        <Link to="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">forest</span>
          <h2 className="text-xl font-black uppercase tracking-tighter">TerraRent</h2>
        </Link>
        <Link to="/dashboard" className="text-sm font-bold text-accent">Back to Dashboard</Link>
      </header>
      
      <main className="flex-1 flex overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* Contact List */}
        <aside className="w-80 flex flex-col border-r border-primary/5 bg-white z-10 shrink-0">
          <div className="p-6 border-b border-primary/5 flex justify-between items-center">
            <h1 className="text-2xl font-black text-primary tracking-tighter">Messages</h1>
            <span className="material-symbols-outlined text-accent">edit_square</span>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border-l-4 border-primary cursor-pointer">
                <div 
                  className="size-14 rounded-2xl bg-cover bg-center shadow-sm shrink-0" 
                  style={{ backgroundImage: "url('https://picsum.photos/seed/sarah/200')" }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-black text-primary truncate">Sarah Jenkins</p>
                    <span className="text-[10px] text-text-muted font-bold">2m</span>
                  </div>
                  <p className="text-xs text-text-muted truncate font-medium">I will send over the link shortly.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-sand-light/20 cursor-pointer transition-all">
                <div 
                  className="size-14 rounded-2xl bg-cover bg-center opacity-60 shrink-0" 
                  style={{ backgroundImage: "url('https://picsum.photos/seed/mark/200')" }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-primary truncate">Mark Peterson</p>
                    <span className="text-[10px] text-text-muted font-bold">1h</span>
                  </div>
                  <p className="text-xs text-text-muted truncate font-medium">The deposit has been received...</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Chat Area */}
        <section className="flex-1 flex flex-col relative bg-sand-light/10">
          <div className="p-6 bg-white border-b border-primary/5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-primary text-white flex items-center justify-center font-black">SJ</div>
                <div>
                   <h3 className="font-black text-primary">Sarah Jenkins</h3>
                   <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                     <span className="size-1.5 rounded-full bg-green-600"></span> Online
                   </span>
                </div>
             </div>
             <div className="flex gap-4 text-primary/40">
                <span className="material-symbols-outlined cursor-pointer hover:text-accent">call</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-accent">videocam</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-accent">info</span>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-4 max-w-[75%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`size-10 rounded-xl flex-shrink-0 bg-cover bg-center ${m.role === 'user' ? 'bg-accent' : 'bg-primary'}`}></div>
                <div className={`p-5 rounded-3xl shadow-sm text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-primary border border-primary/5 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-8 bg-white border-t border-primary/5 space-y-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSuggestReply}
                disabled={isSuggesting}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/10 text-primary hover:bg-sand-light/30 transition-all text-xs font-bold disabled:opacity-60 disabled:cursor-wait"
              >
                <span className={`material-symbols-outlined text-sm ${isSuggesting ? 'animate-spin' : ''}`}>{isSuggesting ? 'progress_activity' : 'auto_awesome'}</span>
                {isSuggesting ? 'Suggesting...' : 'Suggest Reply'}
              </button>
            </div>
            <div className="bg-sand-light/20 border border-primary/5 rounded-[1.5rem] p-3 flex gap-3 items-center">
              <button className="size-10 flex items-center justify-center text-primary/30 hover:text-accent"><span className="material-symbols-outlined">attach_file</span></button>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium placeholder:text-primary/40" 
                placeholder={isSuggesting ? "AI is thinking..." : "Message Sarah..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="size-12 bg-primary text-white rounded-xl shadow-lg hover:bg-primary-hover flex items-center justify-center transition-all shrink-0"><span className="material-symbols-outlined">send</span></button>
            </div>
          </div>
        </section>
        
        {/* Right Info Rail */}
        <aside className="hidden xl:flex w-80 flex-col border-l border-primary/5 bg-white shrink-0 p-8 space-y-10">
          <div className="space-y-4">
            <h3 className="font-black uppercase text-xs tracking-[0.2em] text-accent">Active Property</h3>
            <div className="bg-white rounded-3xl border border-primary/5 overflow-hidden shadow-xl">
              <div 
                className="aspect-[4/3] bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000')" }}
              ></div>
              <div className="p-5">
                <h4 className="font-black text-primary">Tuscan Stone Villa</h4>
                <p className="text-accent font-black text-xl mt-2">$350 <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">/ night</span></p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
             <h3 className="font-black uppercase text-xs tracking-[0.2em] text-accent">Actions</h3>
             <Link to="/schedule" className="w-full bg-primary text-white font-black text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">Schedule Viewing</Link>
             <Link to="/application" className="w-full border-2 border-primary text-primary font-black text-sm py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-sand-light transition-all">Start Application</Link>
          </div>
        </aside>
      </main>
    </div>
  );
};
