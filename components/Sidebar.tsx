
import React from 'react';
import { LayoutDashboard, Building2, HardHat, DatabaseZap, ShieldCheck, ChevronRight, FilePlus2, Camera } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Synthèse Nationale', icon: LayoutDashboard },
    { id: 'ministries', label: 'Ministères', icon: Building2 },
    { id: 'projects', label: 'Projets Stratégiques', icon: HardHat },
    { id: 'field-monitoring', label: 'Mission de terrain', icon: Camera },
    { id: 'ingestion', label: 'Insertion Données', icon: FilePlus2 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-state-950 text-white flex flex-col z-30 border-r border-white/5 shadow-2xl">
      {/* SECTION LOGO INSTITUTIONNEL */}
      <div className="p-8">
        <div className="bg-white rounded-[2.5rem] p-5 shadow-2xl border border-white/10 mb-8 overflow-hidden group">
          <img 
            src="https://www.assemblee-nationale.sn/sites/default/files/logo_an_0.png" 
            alt="Assemblée Nationale du Sénégal" 
            className="w-full h-auto object-contain max-h-24 transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Fallback vers un visuel générique si le lien officiel expire
              e.currentTarget.src = "https://flagcdn.com/w160/sn.png";
              e.currentTarget.className = "w-16 h-10 object-contain mx-auto opacity-40";
            }}
          />
        </div>

        <div className="px-2 mb-10 border-l-2 border-accent-gold pl-6">
          <h1 className="font-serif text-4xl font-bold tracking-tighter text-white leading-none">SIPOP</h1>
          <p className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.4em] mt-3">Excellence Étatique</p>
        </div>

        {/* NAVIGATION MENU */}
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`w-full flex items-center px-6 py-4 rounded-2xl transition-all duration-300 group border border-transparent ${
                  active
                    ? 'bg-white/10 text-accent-gold shadow-lg shadow-black/20 border-white/5'
                    : 'text-emerald-100/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center w-full">
                  <Icon size={18} className={`mr-4 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-accent-gold' : 'text-emerald-800'}`} />
                  <span className={`text-[12px] font-black tracking-widest text-left flex-1 uppercase ${active ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                    {item.label}
                  </span>
                  {active && <ChevronRight size={14} className="text-accent-gold ml-2 shrink-0 animate-pulse" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION PROFIL UTILISATEUR (BAS) */}
      <div className="mt-auto p-8">
        <div className="bg-gradient-to-br from-emerald-950 to-state-950 rounded-[2.5rem] p-6 border border-white/5 shadow-inner">
          <div className="flex items-center space-x-4 mb-5">
             {/* AVATAR UTILISATEUR */}
             <div className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-accent-gold/40 shadow-2xl shrink-0 group cursor-pointer relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                  alt="Avatar Utilisateur" 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 filter saturate-[0.8]"
                />
                <div className="absolute inset-0 bg-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
             <div className="text-left overflow-hidden">
               <p className="text-xs font-black text-white tracking-tight truncate">Hon. Mady DANFAKHA</p>
               <p className="text-[8px] text-accent-gold font-bold uppercase tracking-widest truncate mt-1">Rapporteur Budget</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
             <button className="py-2.5 bg-white/5 hover:bg-white/10 text-[8px] font-black uppercase text-emerald-100/60 hover:text-white rounded-xl border border-white/5 transition-all active:scale-95">
                Profil
             </button>
             <button className="py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-[8px] font-black uppercase text-emerald-400 rounded-xl border border-emerald-500/10 transition-all active:scale-95">
                Sortir
             </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
