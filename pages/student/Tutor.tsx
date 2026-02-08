
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Trash2, StickyNote, Sparkles, HelpCircle, ChevronRight } from 'lucide-react';
import { geminiService } from '../../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Tutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Academic Tutor. How can I help you understand your coursework today? I can explain complex topics, help with code, or prepare you for exams.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.tutorChat(userMsg, "General Education Support");
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToNotebook = (content: string) => {
    const saved = JSON.parse(localStorage.getItem('notebook_doubts') || '[]');
    localStorage.setItem('notebook_doubts', JSON.stringify([{
      id: Date.now(),
      title: content.substring(0, 40).replace(/#/g, '') + '...',
      content,
      date: new Date().toLocaleDateString()
    }, ...saved]));
    alert("Insight archived to Neural Notebook (Doubt Notes)");
  };

  const formatContent = (text: string) => {
    // Basic markdown-like formatting for better organization
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-black text-indigo-900 mt-6 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black text-indigo-900 mt-8 mb-4">{line.replace('## ', '')}</h2>;
      if (line.match(/^\d+\./)) return <div key={i} className="flex gap-3 mb-2 ml-2"><span className="font-black text-indigo-500">{line.split('.')[0]}.</span><p className="font-medium text-gray-700">{line.split('.').slice(1).join('.')}</p></div>;
      if (line.startsWith('- ')) return <div key={i} className="flex gap-3 mb-2 ml-4"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div><p className="font-medium text-gray-700">{line.replace('- ', '')}</p></div>;
      return <p key={i} className="mb-4 text-gray-700 leading-relaxed font-medium">{line}</p>;
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="p-8 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <Sparkles size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Neural Tutor</h1>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em]">Cognitive Engine v4.0 Online</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            title="Erase History"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              msg.role === 'assistant' ? 'bg-indigo-900 text-white' : 'bg-white text-indigo-600 border-2 border-indigo-100'
            }`}>
              {msg.role === 'assistant' ? <Bot size={24} /> : <User size={24} />}
            </div>
            <div className={`max-w-[75%] space-y-4`}>
              <div className={`p-8 rounded-[40px] shadow-sm text-base leading-relaxed ${
                msg.role === 'assistant' ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none' : 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100'
              }`}>
                {msg.role === 'assistant' ? formatContent(msg.content) : msg.content}
              </div>
              {msg.role === 'assistant' && idx !== 0 && (
                <div className="flex gap-4 pl-4">
                  <button 
                    onClick={() => saveToNotebook(msg.content)}
                    className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm uppercase tracking-widest"
                  >
                    <StickyNote size={14} />
                    Sync to Notebook
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-50 transition-all shadow-sm uppercase tracking-widest">
                    <HelpCircle size={14}/> Clarify Part
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-6 animate-pulse">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl"></div>
            <div className="bg-white border border-gray-100 h-24 w-full max-w-md rounded-[40px] rounded-tl-none flex items-center justify-center gap-2">
               <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 md:p-12 bg-white border-t border-gray-100 shadow-2xl">
        <div className="max-w-5xl mx-auto flex gap-6 items-center">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inquire with Neural Tutor... (e.g. Compare Monolithic vs Microkernel with examples)"
              className="w-full px-10 py-6 bg-gray-50 border-none rounded-[32px] focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold text-lg shadow-inner group-hover:bg-gray-100"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300 uppercase tracking-widest pointer-events-none hidden md:block">
              Press Enter <ChevronRight size={14} className="inline ml-1" />
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-20 h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[28px] flex items-center justify-center shadow-3xl shadow-indigo-100 transition-all disabled:opacity-50 hover:-translate-y-1"
          >
            <Send size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
