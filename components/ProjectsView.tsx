
import React, { useState } from 'react';
import { Project } from '../types';
import { 
  MapPin, Zap, CheckCircle2, Clock, ChevronRight, Search, Filter, 
  Truck, Droplets, AlertTriangle, Building2, LayoutDashboard, ChevronDown, X
} from 'lucide-react';

interface ExtendedProject extends Project {
  axis: string;
}

const mockProjects: ExtendedProject[] = [
  { id: 'MITA-AUT-01', name: "Autoroute Dakar-St Louis", ministry: "Infrastructures", axis: "Économie Compétitive", program: "Réseau Autoroutier", status: 'On Track', progressPhysical: 28, progressFinancial: 35, costTotal: "1 250.6 Mds", source: "BID, BADEA, BOAD", description: "Construction de l'axe autoroutier majeur reliant la capitale au pôle Nord.", location: "Dakar - St Louis" },
  { id: 'MHA-DES-01', name: "Désalement Eau de Mer", ministry: "Hydraulique", axis: "Aménagement Durable", program: "Sécurisation Eau", status: 'On Track', progressPhysical: 42, progressFinancial: 48, costTotal: "137.3 Mds", source: "JICA / Japon", description: "Usine de dessalement pour pallier le déficit hydrique de Dakar.", location: "Mamelles, Dakar" },
  { id: 'MSAS-HOS-04', name: "Hôpital de Niveau 3 - Bakel", ministry: "Santé", axis: "Capital Humain", program: "Infrastructures de Santé", status: 'Delayed', progressPhysical: 15, progressFinancial: 22, costTotal: "18.5 Mds", source: "État / BADEA", description: "Construction d'un complexe hospitalier moderne en zone frontalière.", location: "Bakel" }
];

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = { 'On Track': 'bg-emerald-100 text-emerald-900 border-emerald-200', 'Delayed': 'bg-amber-100 text-amber-900 border-amber-200', 'Critical': 'bg-red-100 text-red-900 border-red-200', 'Completed': 'bg-blue-100 text-blue-900 border-blue-200' };
  const icons = { 'On Track': CheckCircle2, 'Delayed': Clock, 'Critical': AlertTriangle, 'Completed': CheckCircle2 };
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[8px] font-black border ${styles[status]} uppercase tracking-widest`}>
      <Icon size={10} className="mr-1.5" />
      {status === 'On Track' ? 'SATISFAISANT' : status === 'Delayed' ? 'VIGILANCE' : status === 'Critical' ? 'CRITIQUE' : 'TERMINÉ'}
    </span>
  );
};

const ProjectsView: React.FC<{ onSelectProject: (project: Project) => void }> = ({ onSelectProject }) => {
  const [filterMinistry, setFilterMinistry] = useState("Tous");
  const [filterAxis, setFilterAxis] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinistry = filterMinistry === "Tous" || p.ministry === filterMinistry;
    const matchesAxis = filterAxis === "Tous" || p.axis === filterAxis;
    return matchesSearch && matchesMinistry && matchesAxis;
  });

  const getProjectIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('auto')) return <Truck size={20} />;
    if (n.includes('eau')) return <Droplets size={20} />;
    if (n.includes('hôpit')) return <Building2 size={20} />;
    return <Zap size={20} />;
  };

  return (
    <div className="page-transition space-y-8 pb-12">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div>
           <div className="flex items-center space-x-3 mb-3">
              <span className="px-3 py-1 bg-emerald-700 text-white rounded-full text-[9px] font-black uppercase tracking-widest">PIP 2026-2028</span>
              <span className="text-slate-400 font-bold text-[11px]">Portefeuille Prioritaire</span>
           </div>
           <h2 className="text-2xl font-serif font-bold text-state-900 tracking-tight">Projets <span className="text-emerald-600 italic">Stratégiques</span></h2>
           <p className="text-slate-500 mt-2 text-[13px] font-medium italic">Monitorage des investissements majeurs de la Nation.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl shadow-premium border border-slate-200">
          <div className="relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="bg-slate-50 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-black uppercase outline-none w-40"
            />
          </div>
          <div className="h-8 w-px bg-slate-100 mx-1"></div>
          <select 
            value={filterMinistry} 
            onChange={(e) => setFilterMinistry(e.target.value)}
            className="bg-white text-[10px] font-black uppercase tracking-widest py-2.5 px-4 rounded-xl border border-slate-100 focus:border-emerald-500 outline-none cursor-pointer"
          >
            <option value="Tous">Tous Ministères</option>
            <option value="Infrastructures">Infrastructures</option>
            <option value="Hydraulique">Hydraulique</option>
            <option value="Santé">Santé</option>
          </select>
          <select 
            value={filterAxis} 
            onChange={(e) => setFilterAxis(e.target.value)}
            className="bg-white text-[10px] font-black uppercase tracking-widest py-2.5 px-4 rounded-xl border border-slate-100 focus:border-emerald-500 outline-none cursor-pointer"
          >
            <option value="Tous">Tous les Axes</option>
            <option value="Économie Compétitive">Axe 1: Économie</option>
            <option value="Capital Humain">Axe 2: Capital Humain</option>
            <option value="Aménagement Durable">Axe 3: Aménagement</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} onClick={() => onSelectProject(project)} className="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="p-3 bg-slate-50 text-emerald-700 rounded-xl mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                    {getProjectIcon(project.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{project.id}</span>
                      <span className="text-[8px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">{project.axis}</span>
                    </div>
                    <h3 className="text-xl font-bold text-state-900 leading-tight">{project.name}</h3>
                  </div>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2 italic">"{project.description}"</p>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <div className="flex justify-between text-[9px] mb-2 uppercase font-black tracking-widest text-slate-400">
                    <span>Réalisation</span>
                    <span className="text-state-900">{project.progressPhysical}%</span>
                  </div>
                  <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-slate-100">
                    <div className="state-gradient h-full" style={{ width: `${project.progressPhysical}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] mb-2 uppercase font-black tracking-widest text-slate-400">
                    <span>Consommation</span>
                    <span className="text-state-900">{project.progressFinancial}%</span>
                  </div>
                  <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-slate-100">
                    <div className="bg-amber-500 h-full" style={{ width: `${project.progressFinancial}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Coût estimé: {project.costTotal}</span>
              <button className="flex items-center text-[10px] font-black text-emerald-700 uppercase tracking-widest hover:translate-x-1 transition-all">
                Fiche Projet <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-slate-200">
           <LayoutDashboard size={48} className="mx-auto text-slate-200 mb-6" />
           <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Aucun projet ne correspond à ces critères</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsView;
