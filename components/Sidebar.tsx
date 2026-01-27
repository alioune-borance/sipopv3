
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
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-10">
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-2xl overflow-hidden p-1 border-2 border-accent-gold">
               <img src="https://flagcdn.com/w160/sn.png" alt="Senegal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-state-950"></div>
          </div>
          <div className="text-left">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white leading-none">SIPOP</h1>
            <p className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-widest mt-1">Sénégal • Excellence</p>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`w-full flex items-center px-5 py-4 rounded-2xl transition-all duration-300 group border border-transparent ${
                  active
                    ? 'bg-white/10 text-accent-gold shadow-lg shadow-black/20 border-white/5'
                    : 'text-emerald-100/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center w-full">
                  <Icon size={20} className={`mr-4 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-accent-gold' : 'text-emerald-800'}`} />
                  <span className={`text-[13px] font-bold tracking-wide text-left flex-1 ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                    {item.label}
                  </span>
                  {active && <ChevronRight size={14} className="text-accent-gold ml-2 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-8 border-t border-white/5">
        <div className="bg-emerald-900/20 rounded-2xl p-5 border border-emerald-50/10">
          <div className="flex items-center space-x-3 mb-4">
             <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-gold to-yellow-600 flex items-center justify-center text-state-950 font-black text-xs shrink-0">AD</div>
             <div className="text-left overflow-hidden">
               <p className="text-xs font-bold text-white tracking-tight truncate">Hon. Amadou Diop</p>
               <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest truncate">Rapporteur Budget</p>
             </div>
          </div>
          <button className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20 transition-all">
             Profil & Sécurité
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
