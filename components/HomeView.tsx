
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, MessageSquare, FileText, Target, ArrowUpRight, 
  Sparkles, Send, Bot, Clock, Filter, Layers, BrainCircuit,
  ArrowRight, ShieldCheck, Zap, Info
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const HomeView: React.FC = () => {
  const [chatMode, setChatMode] = useState<'docs' | 'projects'>('docs');
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Bienvenue sur SIPOP, Honorable. Je suis votre assistant analytique. Choisissez un contexte de discussion pour commencer." }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contextPrompt = chatMode === 'docs' 
        ? "Tu es un assistant expert pour l'Assemblée Nationale du Sénégal. Réponds sur le PIP 2026-2028 et la SND 2025-2029."
        : "Tu es un analyste de suivi-évaluation. Réponds sur les projets d'infrastructures et leurs indicateurs de performance.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${contextPrompt} Question: ${userMsg}`,
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "Erreur de génération." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: "Connexion au moteur IA impossible." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="page-transition space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-state-900">
            Bonjour, <span className="text-emerald-700 italic">Hon. Mady Danfakha</span>
          </h2>
          <p className="text-[13px] text-slate-500 font-medium">Contrôle parlementaire & Orientation stratégique.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Prochaine Session</p>
            <p className="text-xs font-bold text-state-900">15 Janvier 2026</p>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
             <Clock size={16} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Rapide */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center">
               <Filter size={14} className="mr-2" /> Pilotage Rapide
            </h3>
            <div className="space-y-2">
              {[
                { label: "Rapport PIP 2026-2028", icon: FileText },
                { label: "Suivi des Alertes Projets", icon: Target },
                { label: "PRES 2025-2028", icon: Zap },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-all group border border-transparent hover:border-emerald-100">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm mr-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <item.icon size={16} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-900">{item.label}</span>
                  <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-emerald-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-state-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold opacity-10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-3">Vision Sénégal 2050</h3>
            <p className="text-xs leading-relaxed text-emerald-100 font-medium italic">
              "Assurer la transparence de l'investissement public pour une croissance endogène."
            </p>
            <div className="mt-6 flex items-center justify-between text-[11px]">
               <span className="font-medium text-slate-400">KPI Global</span>
               <span className="font-bold text-accent-gold">78% de conformité</span>
            </div>
          </div>
        </div>

        {/* Assistant IA Orienté */}
        <div className="lg:col-span-8 flex flex-col h-[580px] bg-white rounded-2xl border border-slate-200 shadow-premium overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center">
              <div className="w-9 h-9 bg-emerald-700 rounded-lg flex items-center justify-center text-white mr-3 shadow-sm">
                <BrainCircuit size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-state-900 uppercase tracking-tight">Assistant SIPOP</h3>
                <p className="text-[10px] text-slate-400 font-medium">Analyse contextuelle à temps réel</p>
              </div>
            </div>
            
            <div className="flex bg-white p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setChatMode('docs')}
                className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${chatMode === 'docs' ? 'bg-state-900 text-white' : 'text-slate-400 hover:text-state-900'}`}
              >
                Docs SND
              </button>
              <button 
                onClick={() => setChatMode('projects')}
                className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${chatMode === 'projects' ? 'bg-state-900 text-white' : 'text-slate-400 hover:text-state-900'}`}
              >
                Projets
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-700 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-700 border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-600 animate-pulse border border-emerald-100">
                   IA en réflexion...
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={chatMode === 'docs' ? "Une question sur le PIP ?" : "L'avancement d'un projet spécifique ?"}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm font-medium focus:border-emerald-600 transition-all outline-none"
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center hover:bg-emerald-800 transition-all shadow-md"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 text-center uppercase tracking-widest font-bold">
              Base de connaissance : PIP 2026-2028 | PAP Consolide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
