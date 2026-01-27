
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, FileUp, Send, Loader2, CheckCircle2, BrainCircuit, Database, Sparkles,
  Table as TableIcon, ChevronRight, Zap, Info, X, FileSpreadsheet, FileText,
  Activity, ArrowRightLeft, RefreshCcw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIView: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [history, setHistory] = useState<{role: 'user' | 'ai', content: string, data?: any}[]>([
    { role: 'ai', content: "Bienvenue dans l'interface d'Intelligence Ingestive SIPOP. Je compare instantanément vos données soumises avec le référentiel SND 2025-2029 pour détecter les écarts critiques." }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatInput("");
    setHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      // Re-initialize for each request to ensure the latest API key is utilized
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Contexte: SIPOP Sénégal. Ingestion de données DPPD/PAP. L'utilisateur demande: "${userMessage}".`
      });

      if (userMessage.toLowerCase().match(/import|dppd|analys|fich|compar/)) {
        setTimeout(() => {
          const mockComparison = [
            { prog: 'P1: Pêche', budget: '14.5 Mds', ref: '12.2 Mds', delta: '+18.8%', status: 'Warning' },
            { prog: 'P2: Port', budget: '10.9 Mds', ref: '10.9 Mds', delta: '0%', status: 'Success' }
          ];
          setHistory(prev => [...prev, { 
            role: 'ai', 
            content: "Analyse comparative terminée. J'ai détecté une sur-allocation de 2.3 Mds sur le programme P1 par rapport au cadre triennal de référence.",
            data: mockComparison
          }]);
          setIsProcessing(false);
        }, 1800);
      } else {
        setHistory(prev => [...prev, { role: 'ai', content: response.text || "Analyse en cours..." }]);
        setIsProcessing(false);
      }
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-transition space-y-10 pb-16">
      <div className="max-w-3xl">
         <h2 className="text-6xl font-serif font-bold text-state-900 tracking-tight leading-none">IA <span className="text-emerald-600 italic">Ingestive</span></h2>
         <p className="text-slate-500 mt-6 text-xl font-medium">Contrôle de conformité sémantique et analyse des écarts budgétaires.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col h-[750px] bg-white rounded-[3.5rem] shadow-premium overflow-hidden border border-slate-100">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-6">
               <div className="w-14 h-14 state-gradient rounded-2xl flex items-center justify-center text-accent-gold shadow-2xl">
                  <Bot size={32} />
               </div>
               <div>
                  <h3 className="text-base font-black uppercase tracking-widest text-state-900">SIPOP-Intel Node v4.1</h3>
                  <div className="flex items-center text-[11px] text-emerald-600 font-black uppercase mt-1">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                    Moteur de comparaison actif
                  </div>
               </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 space-y-10" ref={scrollRef}>
             {history.map((msg, i) => (
               <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[85%] flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-6`}>
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border ${msg.role === 'user' ? 'bg-state-900 text-white border-state-800' : 'bg-white text-emerald-800 border-slate-100'}`}>
                      {msg.role === 'user' ? <span className="text-[11px] font-black">AD</span> : <Bot size={22} />}
                   </div>
                   <div className={`p-8 rounded-[2.5rem] leading-relaxed text-[15px] font-medium ${
                     msg.role === 'user' ? 'bg-state-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                   }`}>
                      {msg.content}
                      {msg.data && (
                        <div className="mt-10 space-y-6 animate-in zoom-in duration-500">
                           <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
                              <table className="w-full text-left text-[11px] font-black uppercase tracking-widest">
                                 <thead className="bg-slate-100 border-b border-slate-200">
                                    <tr>
                                       <th className="px-6 py-4 text-slate-500">Programme</th>
                                       <th className="px-6 py-4 text-slate-500">Saisie</th>
                                       <th className="px-6 py-4 text-slate-500">Réf. SND</th>
                                       <th className="px-6 py-4 text-slate-500 text-right">Delta</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                    {msg.data.map((row: any, idx: number) => (
                                      <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors">
                                         <td className="px-6 py-5 text-emerald-800">{row.prog}</td>
                                         <td className="px-6 py-5 text-state-900">{row.budget}</td>
                                         <td className="px-6 py-5 text-slate-400">{row.ref}</td>
                                         <td className={`px-6 py-5 text-right ${row.status === 'Warning' ? 'text-amber-600' : 'text-emerald-600'}`}>{row.delta}</td>
                                      </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                           <div className="flex gap-4">
                              <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center">
                                <CheckCircle2 size={16} className="mr-2" /> Valider l'insertion delta
                              </button>
                              <button className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-state-900 transition-all">
                                Rejeter
                              </button>
                           </div>
                        </div>
                      )}
                   </div>
                 </div>
               </div>
             ))}
             {isProcessing && (
               <div className="flex justify-start items-center space-x-4 animate-pulse">
                 <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                    <RefreshCcw size={20} className="text-emerald-500 animate-spin" />
                 </div>
                 <div className="bg-white border border-slate-100 px-8 py-4 rounded-full text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Comparaison avec le référentiel Vision 2050...
                 </div>
               </div>
             )}
          </div>

          <div className="p-10 bg-slate-50/50 border-t border-slate-100">
             <div className="relative flex items-center">
                <input 
                   type="text" 
                   value={chatInput}
                   onChange={(e) => setChatInput(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                   className="w-full bg-white border border-slate-200 rounded-3xl py-6 pl-8 pr-20 text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none shadow-premium"
                   placeholder="Posez une question sur le budget ou importez un rapport..."
                />
                <button 
                   onClick={handleSendMessage}
                   className="absolute right-4 w-14 h-14 state-gradient text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
                >
                   <Send size={24} />
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="bg-white rounded-[3rem] p-10 shadow-premium border border-slate-100">
              <h4 className="text-[11px] font-black text-state-900 uppercase tracking-[0.2em] mb-10 flex items-center">
                 <ArrowRightLeft size={18} className="mr-3 text-emerald-600" /> Flux de Comparaison
              </h4>
              <div className="space-y-6">
                 {[
                   { label: 'Indice de Souveraineté', val: '88%', col: 'emerald' },
                   { label: 'Efficience Budgétaire', val: '0.85', col: 'amber' },
                   { label: 'Taux Écart/SND', val: '4.2%', col: 'blue' },
                 ].map((s, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-end mb-3">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                         <span className={`text-xl font-serif font-bold text-${s.col}-700`}>{s.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                         <div className={`h-full bg-${s.col}-600 rounded-full`} style={{width: '75%'}}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="state-gradient rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent-gold mb-8">Contrôle LOLF Actif</h4>
              <p className="text-xs text-emerald-100 leading-relaxed font-medium italic">
                "Le moteur IA SIPOP garantit que chaque centime alloué s'inscrit dans les limites du cadre stratégique national voté par l'Assemblée."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIView;
