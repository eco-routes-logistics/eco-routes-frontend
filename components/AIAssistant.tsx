
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'EcoRoute Intelligence online. How can I optimize your fleet operations today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // @ts-ignore
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are EcoRoute AI, a specialized logistics expert for a dispatcher dashboard. You provide insights on fleet performance, route optimization (specifically in Lagos, Nigeria), and driver management. Keep responses concise, professional, and data-driven.",
          temperature: 0.7,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm having trouble analyzing the logistics data right now. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connectivity issues with the logistics hub. Please check your network." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 flex flex-col mb-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between bg-primary rounded-t-2xl text-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="font-bold text-sm uppercase tracking-widest">EcoRoute AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium shadow-sm
                  ${m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-200 border border-slate-100 dark:border-gray-700 rounded-tl-none'}
                `}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm flex gap-1">
                  <div className="size-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                  <div className="size-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-gray-800 flex gap-2">
            <input 
              className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-xs py-2 px-3 focus:ring-1 focus:ring-primary"
              placeholder="Ask about fleet optimization..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="size-8 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 
          ${isOpen ? 'bg-slate-800 dark:bg-slate-700 rotate-90' : 'bg-primary'}
        `}
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'auto_awesome'}
        </span>
      </button>
    </div>
  );
};

export default AIAssistant;
