
import React from 'react';
import { Home, LayoutDashboard, Building2, HardHat, FilePlus2, Camera, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'dashboard', label: 'Synthèse Nationale', icon: LayoutDashboard },
    { id: 'ministries', label: 'Ministères', icon: Building2 },
    { id: 'projects', label: 'Projets Stratégiques', icon: HardHat },
    { id: 'field-monitoring', label: 'Missions Terrain', icon: Camera },
    { id: 'ingestion', label: 'Insertion Données', icon: FilePlus2 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-state-900 text-white flex flex-col z-30 border-r border-white/5">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-2xl overflow-hidden p-1 border-2 border-accent-gold">
               <img src="/logo/logoAN.jpg" alt="Senegal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-state-950"></div>
          </div>
          <div className="text-left">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white leading-none">SIPOP</h1>
            <p className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-widest mt-1">Sénégal • Excellence</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`w-full flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                  active
                    ? 'bg-emerald-800 text-white shadow-sm border border-emerald-700/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={`mr-3 ${active ? 'text-accent-gold' : 'text-slate-500'}`} />
                <span className="text-[11px] font-semibold tracking-wide uppercase">
                  {item.label}
                </span>
                {active && <ChevronRight size={12} className="ml-auto text-accent-gold opacity-50" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-emerald-950/50 rounded-2xl p-4 border border-emerald-900/50">
          <div className="flex items-center space-x-3">
             <div className="h-10 w-10 rounded-xl bg-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-600 shadow-sm shrink-0">MD</div>
             <div className="overflow-hidden">
               <p className="text-[13px] font-bold truncate leading-tight">Hon. M. DANFAKHA</p>
               <p className="text-[9px] text-emerald-400 uppercase font-black tracking-widest">Rapporteur</p>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
