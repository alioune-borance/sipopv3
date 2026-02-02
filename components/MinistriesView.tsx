
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, BarChart3, ShieldCheck, TrendingUp, Anchor, Waves,
  ChevronRight, Target, AlertCircle, LayoutGrid, List as ListIcon, ShieldAlert,
  User, PieChart as PieChartIcon, Globe, Users, Briefcase, Gem, Coins, FileText,
  Activity, Scale, Milestone, HardHat, Landmark, Clock, CheckCircle2, AlertTriangle,
  MapPin, PieChart as RechartsPieChart, Layers
} from 'lucide-react';
import { Ministry, Program, Project } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import ProgramDetailView from './ProgramDetailView';

// Référentiel des projets pour le filtrage par ministère
const globalProjects: Project[] = [
  { 
    id: 'MITA-AUT-01', 
    name: "Autoroute Dakar-Tivaouane-Saint Louis", 
    ministry: "Ministère des Infrastructures et des Transports terrestres", 
    program: "Développement du Réseau Autoroutier",
    status: 'On Track', 
    progressPhysical: 28, 
    progressFinancial: 35, 
    costTotal: "1 250.6 Mds", 
    source: "Multi-Bailleurs",
    description: "Construction de l'axe autoroutier majeur.",
    location: "Dakar - Louga - St Louis"
  },
  { 
    id: 'MPEM-POR-01', 
    name: "Développement du Port de Ziguinchor", 
    ministry: "Ministère des Pêches et de l’Économie maritime", 
    program: "Infrastructures Maritimes",
    status: 'On Track', 
    progressPhysical: 65, 
    progressFinancial: 58, 
    costTotal: "10.9 Mds", 
    source: "ORIO (Hollande)",
    description: "Modernisation des infrastructures portuaires.",
    location: "Ziguinchor"
  },
  { 
    id: 'MPEM-PECH-02', 
    name: "Complexe Aquacole de Richard Toll", 
    ministry: "Ministère des Pêches et de l’Économie maritime", 
    program: "Développement de l'Aquaculture",
    status: 'On Track', 
    progressPhysical: 45, 
    progressFinancial: 30, 
    costTotal: "4.2 Mds", 
    source: "BCI",
    description: "Pôle de production aquacole pour la souveraineté alimentaire.",
    location: "Richard Toll"
  }
];

const allMinistries: Ministry[] = [
  {
    id: 1,
    name: "Ministère des Pêches et de l’Économie maritime",
    minister: "Dr. Fatou Diouf",
    totalBudgetTriennal: 102.6,
    budget2026: 32.54,
    investmentShare: 44,
    executionRate: 78.5,
    physicalRate: 62.0,
    programs: [
      {
        id: 'P1',
        name: "Développement de la Pêche et de l'Aquaculture",
        manager: "Ismaila NDIAYE",
        budget2026: { ae: 11.78, cp: 11.53, year: 2026 },
        weight: "35%",
        status: 'On Track',
        kpis: [
          { label: "Production Aquacole", value: "2074", target: "3300", unit: "tonnes" },
          { label: "Production Halieutique", value: "480000", target: "550000", unit: "tonnes" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Ministère de l'Éducation nationale",
    minister: "M. Moustapha Guirassy",
    totalBudgetTriennal: 450.8,
    budget2026: 145.2,
    investmentShare: 35,
    executionRate: 88.0,
    physicalRate: 85.0,
    programs: []
  },
  {
    id: 3,
    name: "Ministère des Infrastructures",
    minister: "M. Déthie Fall",
    totalBudgetTriennal: 1250.6,
    budget2026: 410.2,
    investmentShare: 72,
    executionRate: 82.0,
    physicalRate: 79.5,
    programs: []
  }
];

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = {
    'On Track': 'bg-emerald-100 text-emerald-900 border-emerald-200',
    'Delayed': 'bg-amber-100 text-amber-900 border-amber-200',
    'Critical': 'bg-red-100 text-red-900 border-red-200',
    'Completed': 'bg-blue-100 text-blue-900 border-blue-200',
  };
  const icons = {
    'On Track': CheckCircle2,
    'Delayed': Clock,
    'Critical': AlertTriangle,
    'Completed': CheckCircle2,
  };
  const Icon = icons[status || 'On Track'];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[8px] font-black border ${styles[status || 'On Track']} uppercase tracking-widest`}>
      <Icon size={12} className="mr-1.5" />
      {status === 'On Track' ? 'CONFORME' : status === 'Delayed' ? 'VIGILANCE' : status === 'Critical' ? 'CRITIQUE' : 'TERMINÉ'}
    </span>
  );
};

const MinistriesView: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeTab, setActiveTab] = useState<'programs' | 'projects' | 'performance'>('programs');

  if (selectedProgram) {
    return <ProgramDetailView program={selectedProgram} onBack={() => setSelectedProgram(null)} />;
  }

  if (selectedMinistry) {
    const ministryProjects = globalProjects.filter(p => p.ministry === selectedMinistry.name);

    return (
      <div className="space-y-10 animate-in slide-in-from-right duration-300 pb-16">
        <button 
          onClick={() => setSelectedMinistry(null)}
          className="flex items-center text-state-900 font-bold hover:bg-slate-100 transition-colors bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 text-[11px] uppercase tracking-widest"
        >
          <ArrowLeft size={18} className="mr-3 text-emerald-700" /> Annuaire des Ministères
        </button>

        <div className="bg-white rounded-[3.5rem] shadow-premium border border-slate-100 overflow-hidden">
          <div className="state-gradient p-14 text-white relative">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 relative z-10">
              <div className="flex items-center">
                <div className="w-28 h-28 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mr-10 border border-white/20 shadow-2xl">
                  <Anchor size={56} className="text-accent-gold" />
                </div>
                <div>
                  <h1 className="text-5xl xl:text-6xl font-serif font-bold tracking-tight leading-none">{selectedMinistry.name}</h1>
                  <div className="flex items-center mt-6 text-emerald-100 text-xl font-medium italic">
                    <ShieldCheck size={24} className="mr-3 text-accent-gold" />
                    Responsable : {selectedMinistry.minister}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 min-w-[320px]">
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 text-center">
                   <div className="text-[9px] uppercase font-black tracking-widest text-accent-gold mb-1">Budget Consolidé</div>
                   <div className="text-3xl font-serif font-bold">{selectedMinistry.budget2026} <span className="text-sm opacity-30 italic">Mds</span></div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 text-center">
                   <div className="text-[9px] uppercase font-black tracking-widest text-accent-gold mb-1">Moy. Exéc Phys.</div>
                   <div className="text-3xl font-serif font-bold">{selectedMinistry.physicalRate}%</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
              <Anchor size={400} />
            </div>
          </div>

          <div className="p-14">
            <div className="flex space-x-10 mb-14 border-b border-slate-100">
              {[
                { id: 'programs', label: 'Programmes LOLF', icon: ListIcon },
                { id: 'projects', label: 'Projets Stratégiques', icon: HardHat },
                { id: 'performance', label: 'Dashboard Stratégique', icon: Target }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-6 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-4 flex items-center ${activeTab === tab.id ? 'border-emerald-600 text-state-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <tab.icon size={14} className="mr-3" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'projects' && (
              <div className="animate-in fade-in duration-500">
                {ministryProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ministryProjects.map((project) => (
                      <div key={project.id} className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 hover:border-emerald-200 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{project.id}</span>
                              <h4 className="text-2xl font-bold text-state-900 group-hover:text-emerald-700 transition-colors leading-tight">{project.name}</h4>
                              <p className="text-xs text-slate-500 mt-2 font-medium"><MapPin size={12} className="inline mr-1" /> {project.location}</p>
                           </div>
                           <StatusBadge status={project.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                           <div className="space-y-2">
                              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                 <span>Exéc. Physique</span>
                                 <span>{project.progressPhysical}%</span>
                              </div>
                              <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                                 <div className="h-full state-gradient" style={{width: `${project.progressPhysical}%`}}></div>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                 <span>Exéc. Fin.</span>
                                 <span>{project.progressFinancial}%</span>
                              </div>
                              <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                                 <div className={`h-full ${project.progressFinancial > project.progressPhysical + 10 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{width: `${project.progressFinancial}%`}}></div>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                           <div className="text-[10px] font-black text-state-900 uppercase">Coût: {project.costTotal}</div>
                           <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
                              Fiche Projet <ChevronRight size={14} className="ml-1" />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
                        <HardHat size={32} />
                     </div>
                     <h3 className="text-xl font-bold text-state-900 mb-2">Aucun projet stratégique répertorié</h3>
                     <p className="text-sm text-slate-400 max-w-sm mx-auto">Ce ministère ne contient pas encore de projets d'investissement majeurs dans le référentiel SIPOP.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in duration-500">
                {selectedMinistry.programs.length > 0 ? selectedMinistry.programs.map(program => (
                  <div key={program.id} onClick={() => setSelectedProgram(program)} className="group bg-white border border-slate-200 rounded-[2.5rem] p-10 hover:shadow-premium hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <div className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full inline-block mb-4 uppercase tracking-widest border border-emerald-100">ID: {program.id}</div>
                        <h3 className="text-3xl font-bold text-state-900 group-hover:text-emerald-700 transition-colors leading-snug">{program.name}</h3>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                        <ListIcon size={32} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-10">
                       <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-50">
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Moy. Exéc. Phys.</div>
                          <div className="text-2xl font-black text-state-900">{selectedMinistry.physicalRate}%</div>
                       </div>
                       <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-50">
                          <div className="text-[9px] font-black text-emerald-800 uppercase tracking-widest mb-1">Moy. Exéc. Budg.</div>
                          <div className="text-2xl font-black text-state-900">{selectedMinistry.executionRate}%</div>
                       </div>
                    </div>
                    <div className="flex items-center text-[10px] font-black text-state-900 uppercase tracking-widest group-hover:translate-x-3 transition-transform">
                       Analyse de performance programme <ArrowRight size={16} className="ml-3 text-accent-gold" />
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                     <p className="text-sm text-slate-400">Aucun programme DPPD défini.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                   {[
                     { label: 'Efficacité Budg.', val: '84%', icon: Activity, color: 'emerald' },
                     { label: 'Efficience Coût', val: '92%', icon: Scale, color: 'blue' },
                     { label: 'Progrès Physique', val: '+5.4%', icon: Milestone, color: 'amber' },
                     { label: 'Équité Territ.', val: '88%', icon: Globe, color: 'purple' },
                     { label: 'Endogénéité Fin.', val: '65%', icon: Landmark, color: 'slate' },
                   ].map((kpi, i) => (
                     <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
                        <div className={`w-14 h-14 bg-slate-50 text-state-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform`}>
                           <kpi.icon size={28} />
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</div>
                        <div className="text-2xl font-black text-state-900">{kpi.val}</div>
                     </div>
                   ))}
                </div>

                {/* Section Analyse RH & Masse Salariale */}
                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-premium">
                  <div className="flex flex-col lg:flex-row gap-16">
                    {/* Indicateurs clés RH */}
                    <div className="lg:w-1/3 space-y-8">
                      <h4 className="text-2xl font-serif font-bold text-state-900 mb-8 flex items-center">
                        <Users size={28} className="mr-4 text-[#004D40]" />
                        Analyse RH & Masse Salariale
                      </h4>
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 transition-all hover:border-[#004D40]/30 shadow-sm">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Masse Salariale Précise</div>
                          <div className="text-5xl font-black text-[#004D40]">
                            12.45 <span className="text-sm font-bold opacity-40 ml-1 italic">Mds CFA</span>
                          </div>
                        </div>
                        <div className="bg-[#004D40]/5 p-8 rounded-[2.5rem] border border-[#004D40]/10 transition-all hover:bg-[#004D40]/10 shadow-sm">
                          <div className="text-[10px] font-black text-[#004D40]/60 uppercase tracking-[0.2em] mb-4">Part du Budget Global</div>
                          <div className="text-5xl font-black text-[#004D40]">38.2%</div>
                          <div className="h-1.5 w-full bg-white/50 rounded-full mt-6 overflow-hidden">
                             <div className="h-full bg-[#004D40] w-[38.2%] rounded-full shadow-[0_0_10px_rgba(0,77,64,0.3)]"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Graphique de répartition RH */}
                    <div className="flex-1 bg-slate-50/30 p-10 rounded-[2.5rem] border border-slate-100">
                      <div className="flex justify-between items-center mb-10">
                        <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Répartition par Hiérarchie</h5>
                        <div className="px-4 py-2 bg-white rounded-xl text-[9px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest shadow-sm">Statut au 31 Déc. 2025</div>
                      </div>
                      <div className="space-y-10">
                        {[
                          { label: 'Hiérarchie A', val: 45 },
                          { label: 'Hiérarchie B', val: 25 },
                          { label: 'Hiérarchie C', val: 20 },
                          { label: 'Hiérarchie D', val: 10 },
                        ].map((item, i) => (
                          <div key={i} className="group">
                            <div className="flex justify-between items-end mb-3">
                              <span className="text-[11px] font-black text-state-900 uppercase tracking-[0.1em]">{item.label}</span>
                              <span className="text-sm font-black text-[#004D40]">{item.val}%</span>
                            </div>
                            <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner p-[2px]">
                              <div 
                                className="h-full bg-[#004D40] rounded-full transition-all duration-1000 relative shadow-lg" 
                                style={{ width: `${item.val}%` }}
                              >
                                 <div className="absolute inset-0 bg-white/10 group-hover:opacity-100 opacity-0 transition-opacity"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Répartition du budget par titres */}
                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-premium">
                   <div className="flex items-center justify-between mb-12">
                      <div>
                         <h4 className="text-2xl font-serif font-bold text-state-900 flex items-center">
                            <Layers size={28} className="mr-4 text-[#004D40]" />
                            Répartition du budget selon les types de titres
                         </h4>
                         <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">Structure budgétaire DPPD 2026-2028</p>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-700">
                         <RechartsPieChart size={24} />
                      </div>
                   </div>

                   <div className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100">
                      <div className="grid grid-cols-1 gap-12">
                        {[
                          { label: 'Titre I (Personnel)', val: 42, color: '#004D40' },
                          { label: 'Titre II (Fonct.)', val: 18, color: '#00695C' },
                          { label: 'Titre III (Transf.)', val: 12, color: '#00796B' },
                          { label: 'Titre IV (Invest. Etat)', val: 20, color: '#00897B' },
                          { label: 'Titre V (Invest. Ext)', val: 8, color: '#009688' },
                        ].map((item, i) => (
                          <div key={i} className="group relative">
                             <div className="flex justify-between items-end mb-4 px-2">
                                <div className="flex items-center space-x-3">
                                   <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                   <span className="text-xs font-black text-state-950 uppercase tracking-widest">{item.label}</span>
                                </div>
                                <div className="text-sm font-black text-[#004D40] bg-white px-4 py-1.5 rounded-xl shadow-sm border border-slate-100">{item.val}%</div>
                             </div>
                             <div className="h-6 w-full bg-slate-200 rounded-full overflow-hidden p-1 shadow-inner relative border border-slate-200">
                                <div 
                                  className="h-full rounded-full transition-all duration-[1.5s] ease-out shadow-lg" 
                                  style={{ 
                                    width: `${item.val}%`, 
                                    backgroundColor: item.color 
                                  }}
                                >
                                   <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap justify-center gap-8">
                         <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#004D40]"></div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fonctionnement</span>
                         </div>
                         <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#00897B]"></div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Investissement</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition space-y-12 pb-16">
      <div className="max-w-3xl">
         <h2 className="text-6xl font-serif font-bold text-state-900 tracking-tight leading-none">Analyse <span className="text-emerald-600 italic">Parlementaire</span></h2>
         <p className="text-slate-500 mt-6 text-xl font-medium">Contrôle consolidé des Départements Ministériels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          { label: "Budget Consolidé", value: "1 824.0", unit: "Mds", icon: TrendingUp, color: "emerald" },
          { label: "Moy. Exéc. Physique", value: "65.4", unit: "%", icon: Milestone, color: "blue" },
          { label: "Moy. Exéc. Budgétaire", value: "75.6", unit: "%", icon: Coins, color: "amber" },
          { label: "Score Performance", value: "82", unit: "%", icon: Target, color: "purple" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-premium group hover:shadow-2xl transition-all">
             <div className={`w-16 h-16 bg-slate-50 text-state-900 rounded-[1.5rem] flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform`}>
               <kpi.icon size={32} />
             </div>
             <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{kpi.label}</div>
             <div className="text-4xl font-black text-state-900 leading-none">{kpi.value} <span className="text-sm font-bold text-slate-300 ml-1">{kpi.unit}</span></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3.5rem] shadow-premium border border-slate-100 overflow-hidden">
        <div className="p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
           <h3 className="font-serif font-bold text-3xl text-state-900">Annuaire des Départements</h3>
           <div className="flex space-x-3">
              <button className="p-4 bg-white text-slate-300 rounded-2xl border border-slate-200 hover:text-state-900 transition-all"><LayoutGrid size={24}/></button>
              <button className="p-4 state-gradient text-white rounded-2xl shadow-xl"><ListIcon size={24}/></button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Département Ministère</th>
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Performance %</th>
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Crédits 2026</th>
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Score Phys.</th>
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allMinistries.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => setSelectedMinistry(m)}>
                  <td className="px-12 py-10">
                    <div className="flex items-center">
                       <div className="w-16 h-16 state-gradient text-white rounded-3xl flex items-center justify-center font-serif font-bold text-3xl mr-8 shadow-2xl group-hover:scale-110 transition-transform">
                         {m.name.charAt(0)}
                       </div>
                       <div>
                          <div className="font-bold text-state-900 text-xl group-hover:text-emerald-800 transition-colors leading-tight mb-2">{m.name}</div>
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">{m.minister}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-12 py-10 text-center">
                    <div className="flex flex-col items-center">
                       <div className="w-48 bg-slate-100 h-3 rounded-full overflow-hidden mb-4 shadow-inner border border-slate-50">
                         <div className="h-full state-gradient shadow-lg" style={{width: `${m.executionRate}%`}}></div>
                       </div>
                       <span className="text-[10px] font-black text-state-900 tracking-widest uppercase">{m.executionRate}% BUDGET</span>
                    </div>
                  </td>
                  <td className="px-12 py-10 text-right font-serif font-bold text-state-900 text-3xl">
                    {m.budget2026} <span className="text-[11px] font-sans font-black text-slate-300 uppercase block mt-2">Mds CFA</span>
                  </td>
                  <td className="px-12 py-10 text-center">
                    <span className="px-6 py-3 rounded-2xl text-[10px] font-black border border-emerald-100 bg-emerald-50 text-emerald-800 uppercase tracking-widest shadow-sm">
                      {m.physicalRate}% PHYSIQUE
                    </span>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <button className="p-4 text-slate-200 group-hover:text-emerald-700 transition-colors group-hover:bg-white rounded-[1.5rem] shadow-sm">
                      <ChevronRight size={32} />
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
