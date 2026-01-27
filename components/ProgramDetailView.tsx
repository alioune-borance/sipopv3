
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  PieChart as PieChartIcon, 
  ShieldAlert, 
  Globe, 
  Coins, 
  Target,
  BarChart3,
  List,
  LayoutDashboard,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  BarChart4
} from 'lucide-react';
import { Program, Project } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

interface ProgramDetailViewProps {
  program: Program;
  onBack: () => void;
}

const programProjects: Record<string, any[]> = {
  'P1': [
    { id: 'PRJ-P1-01', name: 'Géolocalisation des embarcations', source: 'État (BCI)', budget: '31.4 Mds', physical: 40, financial: 45, result: '20 000 pirogues équipées', indicator: 'Taux de couverture de la flotte' },
    { id: 'PRJ-P1-02', name: 'Aménagement des aires de transformation', source: 'BCI / UE', budget: '5.2 Mds', physical: 85, financial: 80, result: '12 sites modernisés', indicator: 'Nombre de femmes impactées' },
    { id: 'PRJ-P1-03', name: 'Développement de l’Aquaculture', source: 'BCI / FAO', budget: '8.8 Mds', physical: 25, financial: 30, result: '50 fermes pilotes', indicator: 'Tonnage produit' }
  ],
  'P2': [
    { id: 'PRJ-P2-01', name: 'Port de Ziguinchor (ORIO)', source: 'Hollande / BCI', budget: '10.9 Mds', physical: 35, financial: 50, result: 'Infrastructures de quai achevées', indicator: 'Linéaire de quai disponible' },
    { id: 'PRJ-P2-02', name: 'Liaison Dakar-Gorée', source: 'Corée / BCI', budget: '28.0 Mds', physical: 15, financial: 12, result: 'Navires neufs en service', indicator: 'Passagers transportés / an' }
  ],
  'P3': [
    { id: 'PRJ-P3-01', name: 'Réhabilitation des vedettes de surveillance', source: 'État', budget: '4.5 Mds', physical: 65, financial: 60, result: '6 vedettes opérationnelles', indicator: 'Nombre de patrouilles réalisées' }
  ]
};

const COLORS = ['#14532d', '#166534', '#15803d', '#d1d5db'];

const ProgramDetailView: React.FC<ProgramDetailViewProps> = ({ program, onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'macro' | 'projects' | 'performance'>('macro');

  const projects = programProjects[program.id] || [];

  // Macro Metrics
  const avgPhysical = Math.round(projects.reduce((acc, p) => acc + p.physical, 0) / (projects.length || 1));
  const avgFinancial = Math.round(projects.reduce((acc, p) => acc + p.financial, 0) / (projects.length || 1));
  const totalBudget = projects.reduce((acc, p) => acc + parseFloat(p.budget), 0);

  return (
    <div className="page-transition space-y-8 pb-16">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-black text-state-900 bg-white hover:bg-gray-50 px-6 py-3 rounded-2xl border border-gray-200 transition-all shadow-sm group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform text-emerald-700" /> 
          Retour au Ministère
        </button>
        <div className="flex space-x-3">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-700 flex items-center hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-widest">
            <FileSpreadsheet size={18} className="mr-2 text-emerald-700" /> Export Excel
          </button>
          <button className="px-5 py-3 state-gradient text-white rounded-2xl text-[10px] font-black shadow-xl hover:scale-105 transition-all flex items-center uppercase tracking-widest">
            <Activity size={18} className="mr-2 text-accent-gold" /> Audit Performance
          </button>
        </div>
      </div>

      {/* Navigation Onglets Interne */}
      <div className="bg-white p-2 rounded-[2rem] border border-slate-200 flex space-x-2 shadow-premium max-w-2xl">
        {[
          { id: 'macro', label: 'Synthèse Macro', icon: LayoutDashboard },
          { id: 'projects', label: 'Portefeuille Projets', icon: List },
          { id: 'performance', label: 'Objectifs & KPIs', icon: Target },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${
              activeSubTab === tab.id 
                ? 'state-gradient text-white shadow-xl' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} className={`mr-2 ${activeSubTab === tab.id ? 'text-accent-gold' : ''}`} />
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {activeSubTab === 'macro' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-premium col-span-1 lg:col-span-3">
              <div className="flex justify-between items-start mb-12">
                 <div>
                    <h3 className="text-4xl font-serif font-bold text-state-900 tracking-tight">{program.name}</h3>
                    <p className="text-slate-400 mt-2 font-medium text-lg italic">Rapport d'analyse macro-budgétaire consolidée • Exercice 2026</p>
                 </div>
                 <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <div className="text-right">
                       <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Responsable LOLF</div>
                       <div className="text-sm font-bold text-state-900">{program.manager}</div>
                    </div>
                    <div className="w-12 h-12 state-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                       <User size={20} />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="p-8 bg-emerald-50/30 rounded-[2rem] border border-emerald-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <TrendingUp size={48} className="text-emerald-700" />
                    </div>
                    <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-4">Absorption CP</div>
                    <div className="text-5xl font-black text-state-900">{avgFinancial}%</div>
                    <div className="mt-4 flex items-center text-[10px] font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full w-fit">
                       +5.2% VS 2025
                    </div>
                 </div>
                 <div className="p-8 bg-blue-50/30 rounded-[2rem] border border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Layers size={48} className="text-blue-700" />
                    </div>
                    <div className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-4">Taux Physique</div>
                    <div className="text-5xl font-black text-state-900">{avgPhysical}%</div>
                    <div className="mt-4 flex items-center text-[10px] font-black text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full w-fit">
                       -2.1% ÉCART FIN.
                    </div>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <BarChart4 size={48} className="text-slate-700" />
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Volume BCI</div>
                    <div className="text-5xl font-black text-state-900">{totalBudget.toFixed(1)} <span className="text-xl opacity-30">Mds</span></div>
                    <div className="mt-4 flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       VALEUR CUMULÉE (BCI)
                    </div>
                 </div>
              </div>
            </div>

            <div className="state-gradient text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               <div className="relative z-10">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-accent-gold mb-10 flex items-center">
                    <ShieldAlert size={18} className="mr-3" /> Score Santé
                  </h4>
                  <div className="text-7xl font-serif font-bold text-center mb-6 drop-shadow-2xl">
                    82%
                  </div>
                  <p className="text-xs text-center text-emerald-100 font-medium leading-relaxed px-2">
                    Le programme affiche une performance robuste malgré des risques modérés identifiés sur le P2.
                  </p>
               </div>
               <button className="relative z-10 w-full py-4 mt-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center group">
                  Rapport Macro PDF <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-premium">
                <h4 className="font-serif font-bold text-2xl mb-10 flex items-center text-state-900">
                   <BarChart3 size={24} className="mr-4 text-emerald-700" /> Corrélation Phys./Fin.
                </h4>
                <div className="h-72 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projects}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="id" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                         <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                         <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                         <Bar name="Physique" dataKey="physical" fill="#022c22" radius={[6,6,0,0]} barSize={20} />
                         <Bar name="Financier" dataKey="financial" fill="#fbbf24" radius={[6,6,0,0]} barSize={20} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
             <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-premium">
                <h4 className="font-serif font-bold text-2xl mb-10 flex items-center text-state-900">
                   <Activity size={24} className="mr-4 text-emerald-700" /> Tendance Ingestion
                </h4>
                <div className="h-72 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[{n:'T1',v:20},{n:'T2',v:45},{n:'T3',v:65},{n:'T4',v:88}]}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                         <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                         <Tooltip />
                         <Line type="monotone" dataKey="v" stroke="#059669" strokeWidth={5} dot={{fill:'#022c22',r:6, strokeWidth: 3, stroke: '#fff'}} />
                      </LineChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeSubTab === 'projects' && (
        <div className="bg-white rounded-[3rem] shadow-premium border border-slate-200 overflow-hidden animate-in fade-in duration-300">
          <div className="p-12 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <h3 className="font-serif font-bold text-3xl text-state-900">Portefeuille des Projets Publics</h3>
             <span className="px-6 py-2 state-gradient text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
               {projects.length} Unités de Gestion Actives
             </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-100/30 border-b border-slate-200">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Projet / Financement</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Exécution Phys.</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Exécution Fin.</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Indicateur de Performance</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-all group">
                    <td className="px-10 py-8">
                      <div className="font-bold text-state-900 group-hover:text-emerald-800 transition-colors text-base">{proj.name}</div>
                      <div className="flex items-center mt-2">
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg mr-3 border border-emerald-100 uppercase tracking-widest">{proj.source}</span>
                        <span className="text-[11px] font-bold text-slate-400">{proj.budget} CFA</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <div className="flex flex-col items-center">
                          <div className="w-28 bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3 shadow-inner">
                             <div className="h-full bg-emerald-600 rounded-full shadow-lg shadow-emerald-900/10" style={{width: `${proj.physical}%`}}></div>
                          </div>
                          <span className="text-[11px] font-black text-state-900">{proj.physical}%</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <div className="flex flex-col items-center">
                          <div className="w-28 bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3 shadow-inner">
                             <div className={`h-full rounded-full shadow-lg ${proj.financial > proj.physical + 10 ? 'bg-red-500 shadow-red-900/20' : 'state-gradient'}`} style={{width: `${proj.financial}%`}}></div>
                          </div>
                          <span className={`text-[11px] font-black ${proj.financial > proj.physical + 10 ? 'text-red-600' : 'text-state-900'}`}>{proj.financial}%</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="text-xs font-bold text-slate-800 leading-relaxed mb-1.5">{proj.result}</div>
                       <div className="text-[10px] text-slate-400 font-medium italic">Objectif : {proj.indicator}</div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button className="p-3 bg-slate-50 text-slate-400 hover:text-state-900 hover:bg-white border border-slate-100 rounded-xl transition-all shadow-sm">
                          <ExternalLink size={20} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in duration-300">
           {program.kpis.map((kpi, idx) => (
             <div key={idx} className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-premium hover:shadow-2xl transition-all border-b-[10px] border-b-state-900">
                <div className="flex justify-between items-start mb-10">
                   <div className="p-5 bg-emerald-50 rounded-[1.5rem] border border-emerald-100">
                      <Target size={36} className="text-emerald-700" />
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Statut Cible 2026</div>
                      <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black border border-emerald-200 uppercase tracking-widest">
                        En Progression
                      </span>
                   </div>
                </div>
                <h4 className="text-2xl font-bold text-state-900 mb-8 leading-snug">{kpi.label}</h4>
                <div className="flex items-end justify-between mb-6">
                   <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Réalisation Actuelle</div>
                      <div className="text-5xl font-black text-state-900">{kpi.value} <span className="text-base font-bold text-slate-300">{kpi.unit}</span></div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cible Fin de PAP</div>
                      <div className="text-3xl font-bold text-slate-400 font-serif italic">{kpi.target}</div>
                   </div>
                </div>
                <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-50">
                  <div 
                    className="h-full state-gradient rounded-full transition-all duration-1000 shadow-lg relative" 
                    style={{ width: `${(Number(kpi.value) / Number(kpi.target)) * 100}%` }}
                  >
                     <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  </div>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default ProgramDetailView;
