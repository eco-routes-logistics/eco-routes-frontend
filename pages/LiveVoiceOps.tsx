
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
// @ts-ignore
import { useNavigate } from 'react-router-dom';

const LiveVoiceOps: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [transcripts, setTranscripts] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      // @ts-ignore
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioCtxRef.current = outputCtx;

      let nextStartTime = 0;
      const sources = new Set<AudioBufferSourceNode>();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setIsActive(true);
            setIsConnecting(false);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscripts(prev => [...prev, { role: 'ai', text }]);
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const binary = atob(audioData);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
              
              const dataInt16 = new Int16Array(bytes.buffer);
              const frameCount = dataInt16.length;
              const buffer = outputCtx.createBuffer(1, frameCount, 24000);
              const channelData = buffer.getChannelData(0);
              for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i] / 32768.0;

              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              nextStartTime = Math.max(nextStartTime, outputCtx.currentTime);
              source.start(nextStartTime);
              nextStartTime += buffer.duration;
              sources.add(source);
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are the EcoRoute AI Dispatcher Assistant. You help human dispatchers manage a fleet in Lagos, Nigeria. You can provide updates on hub health, driver safety, and route optimization. You speak professionally, quickly, and clearly.',
          outputAudioTranscription: {},
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
  };

  return (
    <div className="h-full bg-[#050b1a] flex flex-col font-display text-white overflow-hidden selection:bg-primary">
      {/* Header */}
      <header className="h-20 border-b border-white/5 bg-[#050b1a]/80 backdrop-blur-xl px-8 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="size-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              Hands-Free Dispatch
              <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-widest ${isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`}>
                {isActive ? 'LIVE VOICE' : 'OFFLINE'}
              </span>
            </h1>
            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Lagos Ops • Audio Streaming v1.0</p>
          </div>
        </div>
        
        {!isActive ? (
          <button 
            disabled={isConnecting}
            onClick={startSession}
            className="px-8 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            {isConnecting ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="material-symbols-outlined">mic</span>}
            {isConnecting ? 'Initializing...' : 'Open Audio Channel'}
          </button>
        ) : (
          <button 
            onClick={stopSession}
            className="px-8 py-3 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">mic_off</span> Close Channel
          </button>
        )}
      </header>

      <main className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        {/* Animated Background Pulse */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/20 blur-[120px] rounded-full transition-opacity duration-1000 ${isActive ? 'opacity-30 animate-pulse' : 'opacity-0'}`}></div>

        {/* Console View */}
        <div className="flex-1 flex flex-col p-8 z-10">
           <div className="flex-1 bg-black/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 backdrop-blur-md overflow-hidden">
              <div className="flex justify-between items-center">
                 <h3 className="text-[10px] font-black uppercase text-white/40 tracking-widest">Real-time Transcription</h3>
                 <span className="material-symbols-outlined text-primary text-sm animate-bounce">auto_awesome</span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-4">
                 {transcripts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30 gap-4">
                       <span className="material-symbols-outlined text-6xl">graphic_eq</span>
                       <p className="text-sm font-bold uppercase tracking-widest max-w-xs leading-relaxed">System ready. Speak to ask about fleet status or hub performance.</p>
                    </div>
                 ) : (
                   transcripts.map((t, i) => (
                     <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-3xl ${t.role === 'user' ? 'bg-primary/20 border border-primary/20' : 'bg-white/5 border border-white/10'}`}>
                           <p className="text-sm font-medium leading-relaxed">{t.text}</p>
                        </div>
                     </div>
                   ))
                 )}
              </div>
              
              {/* Audio Waveform Visualization Simulation */}
              <div className="h-20 flex items-center justify-center gap-1.5 px-10">
                 {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                       key={i} 
                       className={`w-1 rounded-full bg-primary transition-all duration-150 ${isActive ? 'animate-waveform' : 'h-1 opacity-20'}`}
                       style={{ 
                         height: isActive ? `${Math.random() * 60 + 10}%` : '4px',
                         animationDelay: `${i * 0.05}s`
                       }}
                    ></div>
                 ))}
              </div>
           </div>
        </div>

        {/* Side Context Panel */}
        <aside className="w-full lg:w-96 bg-[#050b1a]/80 border-l border-white/5 p-8 flex flex-col gap-8 z-10">
           <section className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest">Global Status</h4>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-white/30 uppercase">Latency</p>
                    <p className="text-xl font-black text-primary">24ms</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-white/30 uppercase">Voice AI</p>
                    <p className="text-xl font-black text-green-500">Fast</p>
                 </div>
              </div>
           </section>

           <section className="flex-1 flex flex-col gap-4">
              <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest">Suggested Commands</h4>
              <div className="space-y-3">
                 {[
                   "Which hub has the most congestion right now?",
                   "List all available drivers in Lekki Phase 1.",
                   "What is our carbon offset for this morning?",
                   "Give me an executive summary of the Island Hub."
                 ].map((cmd, i) => (
                   <button 
                     key={i} 
                     className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-left text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 hover:border-primary/50 transition-all"
                   >
                     "{cmd}"
                   </button>
                 ))}
              </div>
           </section>

           <div className="p-6 bg-primary/10 rounded-3xl border border-primary/20 text-center space-y-3">
              <span className="material-symbols-outlined text-primary text-4xl">headphones</span>
              <p className="text-xs font-bold leading-tight">Use a headset for the best echo-cancellation experience.</p>
           </div>
        </aside>
      </main>
      
      <style>{`
        @keyframes waveform {
          0%, 100% { height: 10%; }
          50% { height: 70%; }
        }
        .animate-waveform {
          animation: waveform 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveVoiceOps;
