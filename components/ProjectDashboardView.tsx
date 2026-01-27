
import React from 'react';
import { Project } from '../types';
import { 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck,
  ChevronRight,
  Clock,
  ExternalLink,
  Activity,
  Layers,
  FileText,
  Scale,
  Zap
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

interface ProjectDashboardViewProps {
  project: Project;
  onBack: () => void;
}

const ProjectDashboardView: React.FC<ProjectDashboardViewProps> = ({ project, onBack }) => {
  const timeline = [
    { date: "Janv 2025", event: "Lancement des Appels d'Offres", status: "Completed" },
    { date: "Mars 2025", event: "Attribution des Marchés", status: "Completed" },
    { date: "Juin 2025", event: "Démarrage des Travaux de Refonte", status: "InProgress" },
    { date: "Oct 2025", event: "Première Livraison Technique", status: "Upcoming" },
  ];

  const executionData = [
    { month: 'Jan', physical: 5, financial: 10 },
    { month: 'Fév', physical: 15, financial: 22 },
    { month: 'Mar', physical: 30, financial: 35 },
    { month: 'Avr', physical: 45, financial: 52 },
    { month: 'Mai', physical: project.progressPhysical, financial: project.progressFinancial },
  ];

  // Helper for radial progress charts
  const renderRadialGauge = (value: number, color: string, label: string, icon: React.ReactNode) => {
    const data = [
      { name: 'Progress', value: value },
      { name: 'Remaining', value: 100 - value }
    ];
    
    return (
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium flex flex-col items-center group hover:scale-[1.02] transition-transform">
        <div className="flex items-center space-x-3 mb-6 w-full px-2">
           <div className={`p-2 rounded-lg bg-slate-50 text-slate-500`}>{icon}</div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
        </div>
        <div className="relative h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                startAngle={90}
                endAngle={450}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={color} />
                <Cell fill="#f1f5f9" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-black text-state-900">{value}%</span>
          </div>
        </div>
      </div>
    );
  };

  const gap = project.progressFinancial - project.progressPhysical;
  const efficiency = (project.progressPhysical / (project.progressFinancial || 1)).toFixed(2);

  return (
    <div className="page-transition space-y-10 pb-20">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-[10px] font-black text-state-900 bg-white hover:bg-slate-50 px-8 py-4 rounded-2xl border border-slate-200 transition-all shadow-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-1 transition-transform text-emerald-700" /> 
          Retour aux Projets
        </button>
        <div className="flex space-x-3">
          <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-700 flex items-center hover:bg-slate-50 transition-all uppercase tracking-widest">
            <ExternalLink size={16} className="mr-2 text-emerald-700" /> Fiche Technique
          </button>
          <button className="px-8 py-4 state-gradient text-white rounded-2xl text-[10px] font-black shadow-xl hover:scale-105 transition-all uppercase tracking-widest">
            Audit de Performance
          </button>
        </div>
      </div>

      {/* Main Dashboard Header */}
      <div className="bg-white rounded-[3.5rem] shadow-premium border border-slate-100 overflow-hidden">
        <div className="p-12 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5">
             <Target size={180} className="text-emerald-900" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
             <div className="max-w-3xl">
                <div className="flex items-center space-x-4 mb-6">
                   <span className="px-4 py-1.5 bg-emerald-700 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em]">PROJET ID: {project.id}</span>
                   <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-xl border border-emerald-100 uppercase tracking-widest">{project.ministry}</span>
                </div>
                <h1 className="text-5xl font-serif font-bold text-state-900 tracking-tight leading-tight">{project.name}</h1>
                <p className="mt-6 text-slate-500 text-lg font-medium leading-relaxed italic">{project.description}</p>
             </div>
             
             {/* Key Metrics Summary */}
             <div className="flex flex-col gap-4 min-w-[280px]">
                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm text-center">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Score de Performance</div>
                   <div className="text-7xl font-serif font-bold text-state-900">84%</div>
                   <div className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded-full border border-emerald-100 uppercase tracking-widest inline-block">Souveraineté : 90%</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-state-900 text-white rounded-[2rem] text-center">
                      <div className="text-[8px] font-black uppercase opacity-50 mb-1">Efficience</div>
                      <div className="text-2xl font-bold">{efficiency}</div>
                   </div>
                   <div className={`p-6 rounded-[2rem] text-center ${gap > 10 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                      <div className="text-[8px] font-black uppercase opacity-50 mb-1">Écart Fin/Phy</div>
                      <div className="text-2xl font-bold">+{gap}%</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-slate-100">
           {[
             { icon: Calendar, label: "Période", val: `${project.startDate || '2025'} - ${project.endDate || '2027'}`, color: "blue" },
             { icon: MapPin, label: "Localisation", val: project.location || 'Sénégal', color: "amber" },
             { icon: Users, label: "Impact Social", val: project.beneficiariesCount || 'Multi-acteurs', color: "emerald" },
             { icon: ShieldCheck, label: "Audit AN", val: "Conforme", color: "state" },
           ].map((item, idx) => (
             <div key={idx} className="p-10 flex items-center space-x-5">
                <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 flex items-center justify-center text-${item.color === 'state' ? 'emerald-700' : item.color + '-600'}`}>
                   <item.icon size={24} />
                </div>
                <div>
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</div>
                   <div className="text-sm font-bold text-state-900">{item.val}</div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Prominent Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {renderRadialGauge(project.progressPhysical, '#059669', "Progrès Physique", <Zap size={18} />)}
         {renderRadialGauge(project.progressFinancial, '#fbbf24', "Exécution Financière", <Activity size={18} />)}
         
         {/* Strategic Metrics / Endogeneity */}
         <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-premium flex flex-col justify-between">
            <div>
               <div className="flex items-center space-x-3 mb-8 w-full">
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-500"><Scale size={18} /></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Indicateurs Stratégiques</span>
               </div>
               <div className="space-y-6">
                  {[
                    { label: "Endogénéité (RI/RE)", val: "65%", p: 65, col: "emerald" },
                    { label: "Équité Territoriale", val: "78%", p: 78, col: "blue" },
                    { label: "Absorption BCI", val: "42%", p: 42, col: "amber" },
                  ].map((stat, i) => (
                    <div key={i}>
                       <div className="flex justify-between items-end mb-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</span>
                          <span className={`text-sm font-black text-${stat.col === 'emerald' ? 'emerald' : stat.col}-700`}>{stat.val}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div className={`h-full ${stat.col === 'emerald' ? 'bg-emerald-600' : 'bg-' + stat.col + '-500'}`} style={{width: `${stat.p}%`}}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
               Mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Analytics Column */}
         <div className="lg:col-span-8 space-y-10">
            <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-premium">
               <h3 className="text-2xl font-serif font-bold text-state-900 mb-10 flex items-center">
                  <TrendingUp size={24} className="mr-4 text-emerald-700" /> Dynamique d'Exécution Mensuelle
               </h3>
               <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={executionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                        <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.1)'}} />
                        <Line type="monotone" name="Physique (%)" dataKey="physical" stroke="#059669" strokeWidth={5} dot={{r:6, fill:'#022c22'}} />
                        <Line type="monotone" name="Financier (%)" dataKey="financial" stroke="#fbbf24" strokeWidth={5} dot={{r:6, fill:'#022c22'}} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center text-xs font-medium text-slate-500 italic">
                  <Activity size={18} className="mr-3 text-emerald-600" />
                  Note d'Analyse : Le décaissement financier anticipe la réalisation physique de {gap}%, ce qui reste dans les marges acceptables de pré-financement logistique pour ce type d'infrastructure maritime.
               </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-premium">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-serif font-bold text-state-900 flex items-center">
                     <FileText size={24} className="mr-4 text-emerald-700" /> Journal d'Audit & Risques
                  </h3>
                  <button className="text-[10px] font-black uppercase text-emerald-700 hover:underline tracking-widest">Tout voir</button>
               </div>
               <div className="space-y-6">
                  {[
                    { title: "Risque de Retard (Vedette 4)", prob: "Moyen", impact: "Élevé", action: "Révision calendrier", col: "amber" },
                    { title: "Conformité Ingestion Données", prob: "Nulle", impact: "Nul", action: "Vérifié", col: "emerald" },
                  ].map((risk, i) => (
                    <div key={i} className={`flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all border-l-8 border-l-${risk.col}-600`}>
                       <div className="flex items-center space-x-5">
                          <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-${risk.col}-700 shadow-sm`}>
                             <ShieldCheck size={24} />
                          </div>
                          <div>
                             <h4 className="font-bold text-state-900">{risk.title}</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Impact : {risk.impact} • Action : {risk.action}</p>
                          </div>
                       </div>
                       <ChevronRight size={20} className="text-slate-300" />
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Timeline Column */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-premium h-full">
               <h3 className="text-2xl font-serif font-bold text-state-900 mb-10 flex items-center">
                  <Clock size={24} className="mr-4 text-emerald-700" /> Jalons de Livraison
               </h3>
               <div className="relative space-y-12">
                  <div className="absolute left-6 top-2 bottom-2 w-px bg-slate-100"></div>
                  {timeline.map((item, i) => (
                    <div key={i} className="relative flex items-start space-x-6 pl-2">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center relative z-10 shadow-lg ${
                         item.status === 'Completed' ? 'bg-emerald-600 text-white' : 
                         item.status === 'InProgress' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'
                       }`}>
                          {item.status === 'Completed' ? <ShieldCheck size={20} /> : <Clock size={20} />}
                       </div>
                       <div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.date}</div>
                          <h4 className="text-sm font-bold text-state-900 leading-tight">{item.event}</h4>
                          <span className={`text-[9px] font-black uppercase mt-2 inline-block ${
                            item.status === 'Completed' ? 'text-emerald-700' : 
                            item.status === 'InProgress' ? 'text-amber-600' : 'text-slate-400'
                          }`}>
                            {item.status === 'Completed' ? 'Terminé' : item.status === 'InProgress' ? 'En cours' : 'À venir'}
                          </span>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-16 p-8 state-gradient rounded-[2.5rem] text-white text-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-accent-gold">Étape Critique Suivante</div>
                  <h4 className="font-bold text-lg mb-6 leading-tight">Validation Commission de Surveillance</h4>
                  <div className="px-6 py-3 bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase inline-block">
                    Prévu : 15 Nov 2025
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProjectDashboardView;
