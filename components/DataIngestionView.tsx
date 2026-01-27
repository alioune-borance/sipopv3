
import React, { useState } from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Save,
  ShieldCheck,
  CloudUpload,
  ArrowRight,
  Loader2,
  RefreshCcw,
  Clock,
  UserCheck,
  XCircle,
  Eye,
  Search,
  CheckCircle,
  // Added missing ChevronRight to imports
  ChevronRight
} from 'lucide-react';

const DataIngestionView: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'input' | 'validation'>('input');

  const pendingValidations = [
    { id: 'INS-001', ministere: 'MPEM', programme: 'P1: Pêche Artisanale', user: 'Chef Bureau PAP', date: 'Aujourd\'hui, 09:15', status: 'pending', amount: '12.4 Mds' },
    { id: 'INS-002', ministere: 'Santé', programme: 'P2: Infra Hospitalière', user: 'Direction Finances', date: 'Hier, 16:40', status: 'pending', amount: '45.0 Mds' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadProgress(0);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setUploadProgress(prog);
      if (prog >= 100) clearInterval(interval);
    }, 40);
  };

  return (
    <div className="page-transition space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-serif font-bold text-state-900 tracking-tight leading-tight">Insertion <span className="text-emerald-600 italic">& Workflow</span></h2>
          <p className="text-slate-500 mt-4 text-lg font-medium">Saisie structurée des données budgétaires et circuit de validation parlementaire.</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-premium">
           <button 
             onClick={() => setActiveWorkflowTab('input')}
             className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeWorkflowTab === 'input' ? 'state-gradient text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
           >
             Nouvelle Saisie
           </button>
           <button 
             onClick={() => setActiveWorkflowTab('validation')}
             className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${activeWorkflowTab === 'validation' ? 'state-gradient text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
           >
             Validations <span className="ml-2 bg-emerald-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[8px] border border-white/20">2</span>
           </button>
        </div>
      </div>

      {activeWorkflowTab === 'input' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
          <div className="lg:col-span-2 space-y-10">
            <div 
              className={`group relative bg-white rounded-[3rem] p-16 border-4 border-dashed transition-all flex flex-col items-center justify-center text-center shadow-premium ${
                dragActive ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]' : 'border-slate-100 hover:border-emerald-200'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 transition-all ${dragActive ? 'bg-emerald-500 text-white scale-110' : 'bg-slate-50 text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 shadow-inner'}`}>
                 <CloudUpload size={48} className={dragActive ? 'animate-bounce' : ''} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-state-900 mb-3 tracking-tight">Importation par Lot</h3>
              <p className="text-slate-500 max-sm mb-10 font-medium leading-relaxed">Téléchargez vos rapports d'exécution PAP ou fichiers de programmation DPPD consolidés.</p>
              
              <div className="flex space-x-4">
                 <button className="px-10 py-5 state-gradient text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                   Parcourir les fichiers
                 </button>
              </div>

              {uploadProgress !== null && (
                <div className="w-full max-w-lg mt-12 bg-white p-8 rounded-[2rem] shadow-xl border border-emerald-50 animate-in zoom-in duration-300">
                  <div className="flex justify-between text-[11px] font-black text-state-900 mb-4 uppercase tracking-[0.2em]">
                    <span className="flex items-center text-emerald-700"><Loader2 size={14} className="mr-2 animate-spin" /> Ingestion sémantique en cours...</span>
                    <span className="text-emerald-600 font-black">{uploadProgress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                    <div className="h-full state-gradient transition-all duration-300" style={{width: `${uploadProgress}%`}}></div>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Analyse des structures LOLF...</p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-[3rem] p-12 shadow-premium border border-slate-100">
               <div className="flex justify-between items-center mb-10">
                 <div>
                    <h3 className="text-2xl font-serif font-bold text-state-900 tracking-tight">Saisie Structurée</h3>
                    <p className="text-sm text-slate-400 font-medium">Insertion manuelle d'ajustements ou de nouveaux programmes.</p>
                 </div>
                 <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100">
                    <Plus size={28} />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ministère Bénéficiaire</label>
                     <div className="relative">
                        <select className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-state-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none appearance-none cursor-pointer">
                           <option>Pêches et Économie Maritime (MPEM)</option>
                           <option>Santé et Action Sociale</option>
                           <option>Éducation Nationale</option>
                        </select>
                        <ChevronRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dotation Crédits (CP) - Mds CFA</label>
                     <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-state-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none" placeholder="ex: 32.54" />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Libellé du Programme ou de la Réforme</label>
                     <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-state-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none" placeholder="ex: Modernisation de la pêche artisanale..." />
                  </div>
               </div>

               <div className="mt-12 p-6 bg-slate-50/50 rounded-[1.5rem] border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <ShieldCheck size={18} className="mr-3 text-emerald-600" /> Validation requise par : <span className="text-state-900 ml-2">Hon. Rapporteur Budget</span>
                  </div>
                  <button className="flex items-center px-10 py-4 state-gradient text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all group">
                     Soumettre au Workflow <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-all" />
                  </button>
               </div>
            </div>
          </div>

          <div className="space-y-10">
             <div className="glass-card rounded-[3rem] p-10 border border-emerald-50 shadow-premium">
                <h4 className="text-[11px] font-black text-state-900 uppercase tracking-[0.2em] mb-8 flex items-center">
                   <Clock size={18} className="mr-3 text-emerald-600" /> Dernières Insertions
                </h4>
                <div className="space-y-4">
                   {[
                     { name: "DPPD MPEM 2026", status: "Validé", time: "12h ago", color: "emerald" },
                     { name: "Ajustement P2 Santé", status: "En attente", time: "2h ago", color: "amber" },
                     { name: "PAP Education", status: "Brouillon", time: "Just now", color: "slate" }
                   ].map((item, i) => (
                     <div key={i} className="p-5 bg-white border border-slate-100 rounded-3xl hover:shadow-lg transition-all flex items-center justify-between">
                        <div>
                           <div className="text-[11px] font-black text-state-900 tracking-tight uppercase">{item.name}</div>
                           <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">{item.time}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-${item.color}-50 text-${item.color}-700 border border-${item.color}-100`}>
                           {item.status}
                        </span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-state-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent-gold mb-6">Sécurité Ingestion</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-8">
                   Chaque insertion manuelle est tracée avec signature numérique et IP. La validation parlementaire est obligatoire pour l'affichage public.
                </p>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-bold py-3 border-b border-white/5 uppercase">
                      <span className="opacity-50 tracking-widest">Audit Blockchain</span>
                      <span className="text-emerald-400">Actif</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-bold py-3 border-b border-white/5 uppercase">
                      <span className="opacity-50 tracking-widest">Rôle</span>
                      <span className="text-emerald-400">Éditeur</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-premium border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
             <div>
                <h3 className="text-2xl font-serif font-bold text-state-900">Validations en Attente</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Flux de contrôle pour approbation finale</p>
             </div>
             <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Rechercher une saisie..." className="bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-6 text-xs font-bold text-state-900 outline-none w-64 focus:ring-4 focus:ring-emerald-500/5 transition-all" />
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Référence / Date</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Origine / Programme</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Montant Impacté</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingValidations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-10 py-8">
                       <div className="text-sm font-black text-state-900">{item.id}</div>
                       <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{item.date}</div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="text-sm font-bold text-state-900 leading-none">{item.ministere}</div>
                       <div className="text-[10px] text-emerald-700 font-black uppercase tracking-widest mt-2">{item.programme}</div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="text-lg font-serif font-bold text-state-900">{item.amount}</div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end space-x-3 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 bg-white text-slate-400 hover:text-state-900 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                             <Eye size={18} />
                          </button>
                          <button className="px-5 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest border border-red-100 transition-all flex items-center">
                             <XCircle size={14} className="mr-2" /> Rejeter
                          </button>
                          <button className="px-5 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-100 transition-all flex items-center shadow-sm">
                             <CheckCircle size={14} className="mr-2" /> Approuver
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-10 bg-slate-50/50 border-t border-slate-100 text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Fin de liste • Toutes les actions sont archivées</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataIngestionView;
