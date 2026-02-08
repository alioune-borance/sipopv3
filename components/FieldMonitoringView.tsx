import React, { useState } from 'react';
import { 
  Camera, ArrowLeft, Plus, MapPin, Clock, Sparkles, Loader2, Maximize2, Eye, ChevronRight, 
  CheckCircle2, AlertTriangle, MessageSquare, Info, ShieldCheck, Save, RefreshCcw,
  BrainCircuit
} from 'lucide-react';
import { Project, MonitoringVisit } from '../types';
import { GoogleGenAI } from "@google/genai";

const mockProjects: Project[] = [
  { id: 'MITA-AUT-01', name: "Autoroute Dakar-St Louis", ministry: "Infrastructures", program: "Réseau Autoroutier", status: 'On Track', progressPhysical: 28, progressFinancial: 35, costTotal: "1 250.6 Mds", source: "Multi-Bailleurs", description: "Construction de l'axe autoroutier majeur.", location: "Dakar - St Louis", monitoringVisits: [
    { id: 'V-01', date: '12 Nov 2025', author: 'Hon. M. Danfakha', status: 'Conforme', observation: 'Les travaux de terrassement sur le tronçon Tivaouane sont achevés. Déploiement des premières couches de bitume en cours.', analysis: 'Progression conforme au chronogramme validé par la commission.', media: [] }
  ] },
  { id: 'MHA-DES-01', name: "Désalement Eau de Mer", ministry: "Hydraulique", program: "Sécurisation Eau", status: 'On Track', progressPhysical: 42, progressFinancial: 48, costTotal: "137.3 Mds", source: "JICA / Japon", description: "Usine de dessalement pour pallier le déficit hydrique de Dakar.", location: "Mamelles, Dakar", monitoringVisits: [] }
];

const FieldMonitoringView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingVisit, setIsAddingVisit] = useState(false);
  const [newVisit, setNewVisit] = useState({ observation: '', status: 'Conforme' as any });
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Use Gemini to analyze field observations for parliamentary control
  const handleGenerateAI = async () => {
    if (!newVisit.observation) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `En tant qu'analyste parlementaire SIPOP, analyse cette observation de terrain et structure une recommandation de contrôle : "${newVisit.observation}"`
      });
      setAiAnalysis(response.text || "Analyse non disponible.");
    } catch (e) {
      setAiAnalysis("Erreur lors de l'analyse IA. Veuillez vérifier votre connexion.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (selectedProject) {
    return (
      <div className="page-transition space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <button onClick={() => setSelectedProject(null)} className="flex items-center text-[10px] font-black text-state-900 bg-white px-6 py-3 rounded-xl border border-slate-200 transition-all shadow-sm uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" /> Retour à la liste
          </button>
          {!isAddingVisit && (
            <button onClick={() => setIsAddingVisit(true)} className="flex items-center px-6 py-3 state-gradient text-white rounded-xl text-[10px] font-black shadow-lg uppercase tracking-widest">
              <Plus size={16} className="mr-2" /> Rapport de mission
            </button>
          )}
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium">
           <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[9px] font-black uppercase tracking-widest">{selectedProject.id}</span>
              <span className="flex items-center text-slate-400 text-[11px] font-bold italic"><MapPin size={14} className="mr-1.5" /> {selectedProject.location}</span>
           </div>
           <h2 className="text-2xl font-serif font-bold text-state-900 tracking-tight">{selectedProject.name}</h2>
        </div>

        {isAddingVisit ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-6 duration-500">
             <div className="lg:col-span-7 space-y-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-premium">
                   <h3 className="text-xl font-serif font-bold text-state-900 mb-8">Nouveau Rapport de Terrain</h3>
                   
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date de Mission</label>
                            <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-state-900 outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Évaluation Directe</label>
                            <select 
                              value={newVisit.status} 
                              onChange={(e) => setNewVisit({...newVisit, status: e.target.value as any})}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-state-900 outline-none"
                            >
                               <option value="Conforme">CONFORME</option>
                               <option value="Alerte">ALERTE / VIGILANCE</option>
                               <option value="Critique">DÉPASSEMENT / CRITIQUE</option>
                            </select>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observations & Faits Marquant</label>
                            <button onClick={handleGenerateAI} disabled={!newVisit.observation || isAnalyzing} className="flex items-center text-[9px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-all disabled:opacity-50">
                               {isAnalyzing ? <Loader2 size={12} className="mr-1.5 animate-spin" /> : <Sparkles size={12} className="mr-1.5 text-accent-gold" />}
                               Analyse IA
                            </button>
                         </div>
                         <textarea 
                           rows={6}
                           value={newVisit.observation}
                           onChange={(e) => setNewVisit({...newVisit, observation: e.target.value})}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-[13px] font-medium text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all italic"
                           placeholder="Décrivez les avancées ou blocages constatés sur site..."
                         ></textarea>
                      </div>

                      <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center group cursor-pointer hover:border-emerald-300 transition-all">
                         <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-300 group-hover:text-emerald-600 shadow-sm transition-all mb-4">
                            <Camera size={24} />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attacher des preuves visuelles (Photos/Vidéos)</p>
                      </div>
                   </div>

                   <div className="mt-10 flex space-x-4">
                      <button onClick={() => setIsAddingVisit(false)} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Annuler</button>
                      <button className="flex-2 py-4 state-gradient text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center px-12 group">
                         <Save size={16} className="mr-2" /> Enregistrer le rapport
                      </button>
                   </div>
                </div>
             </div>

             <div className="lg:col-span-5 space-y-8">
                <div className="bg-state-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden h-full">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-gold mb-10 flex items-center">
                      <BrainCircuit size={18} className="mr-3" /> Analyse de Conformité IA
                   </h4>
                   
                   {isAnalyzing ? (
                     <div className="flex flex-col items-center justify-center h-48 space-y-4">
                        <RefreshCcw size={40} className="text-emerald-500 animate-spin" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-emerald-100">Traitement sémantique...</p>
                     </div>
                   ) : aiAnalysis ? (
                     <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-[13px] leading-relaxed text-emerald-50">
                           {aiAnalysis}
                        </div>
                        <div className="bg-emerald-950/50 p-6 rounded-2xl border border-emerald-800 flex items-start">
                           <ShieldCheck size={20} className="text-emerald-400 mr-3 shrink-0" />
                           <p className="text-[10px] font-bold text-emerald-200 leading-relaxed uppercase tracking-wide">
                              Cette analyse est générée pour faciliter le contrôle parlementaire. Elle doit être validée par le rapporteur de commission.
                           </p>
                        </div>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center justify-center h-48 text-center px-10">
                        <Sparkles size={32} className="text-emerald-500/30 mb-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">En attente de saisie pour analyse contextuelle</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-6">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Historique des Missions Terrain</h3>
             {selectedProject.monitoringVisits && selectedProject.monitoringVisits.length > 0 ? (
               <div className="space-y-4">
                 {selectedProject.monitoringVisits.map((visit) => (
                   <div key={visit.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium flex flex-col md:flex-row gap-8">
                      <div className="md:w-48 shrink-0">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{visit.date}</div>
                         <div className="text-[11px] font-bold text-state-900 mb-4">{visit.author}</div>
                         <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                            visit.status === 'Conforme' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                         }`}>
                            {visit.status.toUpperCase()}
                         </span>
                      </div>
                      <div className="flex-1 space-y-4">
                         <div className="flex items-start">
                            <MessageSquare size={16} className="mr-3 text-slate-300 mt-1 shrink-0" />
                            <p className="text-[13px] text-slate-600 leading-relaxed font-medium italic">"{visit.observation}"</p>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start">
                            <ShieldCheck size={16} className="mr-3 text-emerald-600 mt-0.5 shrink-0" />
                            <p className="text-[11px] font-bold text-slate-500 uppercase leading-relaxed tracking-wide">{visit.analysis}</p>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-slate-200">
                  <Camera size={48} className="mx-auto text-slate-200 mb-6" />
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Aucune mission terrain répertoriée pour ce projet</p>
               </div>
             )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page-transition space-y-10 pb-12">
      <div className="max-w-2xl">
         <h2 className="text-2xl font-serif font-bold text-state-900 tracking-tight leading-tight">Missions <span className="text-emerald-600 italic">de Terrain</span></h2>
         <p className="text-slate-500 mt-3 text-[13px] font-medium italic">Audit visuel et contrôle direct de l'exécution des chantiers stratégiques.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProjects.map(project => (
          <div key={project.id} onClick={() => setSelectedProject(project)} className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-premium hover:shadow-xl transition-all cursor-pointer">
             <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                   <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[9px] font-black uppercase tracking-widest">{project.id}</span>
                   <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">{project.ministry}</span>
                </div>
                <h3 className="text-lg font-bold text-state-900 group-hover:text-emerald-700 transition-colors leading-tight">{project.name}</h3>
             </div>
             <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                   <Camera size={12} className="mr-2 text-emerald-600" /> {project.monitoringVisits?.length || 0} Missions
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldMonitoringView;