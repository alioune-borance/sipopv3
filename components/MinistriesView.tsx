
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, BarChart3, ShieldCheck, TrendingUp, Anchor,
  ChevronRight, Target, LayoutGrid, List as ListIcon, 
  User, Globe, Users, Coins, Activity, Scale, Milestone, HardHat, Landmark, Clock, CheckCircle2, AlertTriangle,
  MapPin, PieChart as RechartsPieChart, Layers
} from 'lucide-react';
import { Ministry, Program, Project } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import ProgramDetailView from './ProgramDetailView';

const globalProjects: Project[] = [
  { id: 'MITA-AUT-01', name: "Autoroute Dakar-Tivaouane-Saint Louis", ministry: "Ministère des Infrastructures et des Transports terrestres", program: "Développement du Réseau Autoroutier", status: 'On Track', progressPhysical: 28, progressFinancial: 35, costTotal: "1 250.6 Mds", source: "Multi-Bailleurs", description: "Construction de l'axe autoroutier majeur.", location: "Dakar - Louga - St Louis" },
  { id: 'MPEM-POR-01', name: "Développement du Port de Ziguinchor", ministry: "Ministère des Pêches et de l’Économie maritime", program: "Infrastructures Maritimes", status: 'On Track', progressPhysical: 65, progressFinancial: 58, costTotal: "10.9 Mds", source: "ORIO (Hollande)", description: "Modernisation des infrastructures portuaires.", location: "Ziguinchor" }
];

const allMinistries: Ministry[] = [
  { id: 1, name: "Ministère des Pêches et de l’Économie maritime", minister: "Dr. Fatou Diouf", totalBudgetTriennal: 102.6, budget2026: 32.54, investmentShare: 44, executionRate: 78.5, physicalRate: 62.0, programs: [
    { id: 'P1', name: "Développement de la Pêche et de l'Aquaculture", manager: "Ismaila NDIAYE", budget2026: { ae: 11.78, cp: 11.53, year: 2026 }, weight: "35%", status: 'On Track', kpis: [{ label: "Production Aquacole", value: "2074", target: "3300", unit: "tonnes" }] }
  ]},
  { id: 2, name: "Ministère de l'Éducation nationale", minister: "M. Moustapha Guirassy", totalBudgetTriennal: 450.8, budget2026: 145.2, investmentShare: 35, executionRate: 88.0, physicalRate: 85.0, programs: [] },
  { id: 3, name: "Ministère des Infrastructures", minister: "M. El Malick Ndiaye", totalBudgetTriennal: 1250.6, budget2026: 410.2, investmentShare: 72, executionRate: 82.0, physicalRate: 79.5, programs: [] }
];

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = { 'On Track': 'bg-emerald-100 text-emerald-900 border-emerald-200', 'Delayed': 'bg-amber-100 text-amber-900 border-amber-200', 'Critical': 'bg-red-100 text-red-900 border-red-200', 'Completed': 'bg-blue-100 text-blue-900 border-blue-200' };
  const icons = { 'On Track': CheckCircle2, 'Delayed': Clock, 'Critical': AlertTriangle, 'Completed': CheckCircle2 };
  const Icon = icons[status || 'On Track'];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black border ${styles[status || 'On Track']} uppercase tracking-widest`}>
      <Icon size={12} className="mr-1.5" />
      {status === 'On Track' ? 'CONFORME' : status === 'Delayed' ? 'VIGILANCE' : status === 'Critical' ? 'CRITIQUE' : 'TERMINÉ'}
    </span>
  );
};

const MinistriesView: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeTab, setActiveTab] = useState<'programs' | 'projects' | 'performance'>('programs');

  if (selectedProgram) return <ProgramDetailView program={selectedProgram} onBack={() => setSelectedProgram(null)} />;

  if (selectedMinistry) {
    const ministryProjects = globalProjects.filter(p => p.ministry === selectedMinistry.name);
    return (
      <div className="space-y-8 animate-in slide-in-from-right duration-300 pb-12">
        <button onClick={() => setSelectedMinistry(null)} className="flex items-center text-state-900 font-bold hover:bg-slate-50 transition-colors bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 text-[10px] uppercase tracking-widest">
          <ArrowLeft size={16} className="mr-3 text-emerald-700" /> Annuaire des Ministères
        </button>

        <div className="bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden">
          <div className="state-gradient p-10 text-white relative">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative z-10">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mr-6 border border-white/20">
                  <Anchor size={40} className="text-accent-gold" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif font-bold tracking-tight">{selectedMinistry.name}</h1>
                  <div className="flex items-center mt-3 text-emerald-100 text-sm font-medium italic">
                    <ShieldCheck size={18} className="mr-2 text-accent-gold" />
                    Responsable : {selectedMinistry.minister}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 min-w-[280px]">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center">
                   <div className="text-[8px] uppercase font-black tracking-widest text-accent-gold mb-1">Budget 2026</div>
                   <div className="text-xl font-serif font-bold">{selectedMinistry.budget2026} <span className="text-xs opacity-30 italic">Mds</span></div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center">
                   <div className="text-[8px] uppercase font-black tracking-widest text-accent-gold mb-1">Exéc Phys.</div>
                   <div className="text-xl font-serif font-bold">{selectedMinistry.physicalRate}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="flex space-x-8 mb-10 border-b border-slate-100">
              {[ { id: 'programs', label: 'Programmes', icon: ListIcon }, { id: 'projects', label: 'Projets', icon: HardHat }, { id: 'performance', label: 'Performance', icon: Target } ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-4 flex items-center ${activeTab === tab.id ? 'border-emerald-600 text-state-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
                  <tab.icon size={14} className="mr-2" /> {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ministryProjects.map(project => (
                  <div key={project.id} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{project.id}</span>
                          <h4 className="text-lg font-bold text-state-900 group-hover:text-emerald-700 transition-colors leading-tight">{project.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-2 font-medium"><MapPin size={10} className="inline mr-1" /> {project.location}</p>
                       </div>
                       <StatusBadge status={project.status} />
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                       <div className="text-[10px] font-black text-state-900 uppercase">Coût: {project.costTotal}</div>
                       <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
                          Détails <ChevronRight size={14} className="ml-1" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'programs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {selectedMinistry.programs.map(program => (
                  <div key={program.id} onClick={() => setSelectedProgram(program)} className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-premium hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-[9px] font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg inline-block mb-3 uppercase tracking-widest border border-emerald-100">{program.id}</div>
                        <h3 className="text-xl font-bold text-state-900 leading-snug">{program.name}</h3>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                        <ListIcon size={24} />
                      </div>
                    </div>
                    <div className="flex items-center text-[10px] font-black text-state-900 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                       Analyse Programme <ArrowRight size={14} className="ml-2 text-accent-gold" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition space-y-10 pb-12">
      <div className="max-w-2xl">
         <h2 className="text-2xl font-serif font-bold text-state-900 tracking-tight">Analyse <span className="text-emerald-600 italic">Parlementaire</span></h2>
         <p className="text-slate-500 mt-3 text-[13px] font-medium italic">Contrôle consolidé des Départements Ministériels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Budget 2026", value: "1 824.0", unit: "Mds", icon: TrendingUp },
          { label: "Exéc. Physique", value: "65.4", unit: "%", icon: Milestone },
          { label: "Exéc. Budgétaire", value: "75.6", unit: "%", icon: Coins },
          { label: "Performance", value: "82", unit: "%", icon: Target }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-premium group hover:shadow-xl transition-all">
             <div className="w-12 h-12 bg-slate-50 text-state-900 rounded-xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
               <kpi.icon size={24} />
             </div>
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</div>
             <div className="text-2xl font-black text-state-900">{kpi.value} <span className="text-[10px] font-bold text-slate-300 ml-1">{kpi.unit}</span></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
           <h3 className="font-serif font-bold text-xl text-state-900">Annuaire des Départements</h3>
           <div className="flex space-x-2">
              <button className="p-3 bg-white text-slate-300 rounded-xl border border-slate-200 hover:text-state-900 transition-all"><LayoutGrid size={18}/></button>
              <button className="p-3 state-gradient text-white rounded-xl shadow-lg"><ListIcon size={18}/></button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ministère</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Budget 2026</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Physique</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allMinistries.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => setSelectedMinistry(m)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                       <div className="w-12 h-12 state-gradient text-white rounded-xl flex items-center justify-center font-serif font-bold text-xl mr-5 shadow-lg group-hover:scale-110 transition-transform">
                         {m.name.charAt(0)}
                       </div>
                       <div>
                          <div className="font-bold text-state-900 text-[15px] group-hover:text-emerald-800 transition-colors leading-tight mb-1">{m.name}</div>
                          <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic">{m.minister}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="text-xl font-serif font-bold text-state-900">{m.budget2026} <span className="text-[9px] font-sans font-black text-slate-300 uppercase ml-1">Mds</span></div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-4 py-2 rounded-xl text-[9px] font-black border border-emerald-100 bg-emerald-50 text-emerald-800 uppercase tracking-widest">
                      {m.physicalRate}%
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-slate-200 group-hover:text-emerald-700 transition-colors group-hover:bg-white rounded-xl shadow-sm">
                      <ChevronRight size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MinistriesView;
