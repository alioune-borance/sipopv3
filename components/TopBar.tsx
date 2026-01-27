
import React from 'react';
import { Search, Bell, Calendar, Settings } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="h-24 bg-white/50 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-20">
      <div className="flex items-center flex-1">
        <div className="relative group max-w-md w-full">
          <span className="absolute inset-y-0 left-5 flex items-center">
            <Search size={18} className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          </span>
          <input
            type="text"
            className="w-full py-4 pl-14 pr-6 text-sm font-bold text-state-900 bg-slate-100/50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/20 transition-all outline-none"
            placeholder="Rechercher un indicateur, un projet, une loi..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="hidden xl:flex items-center space-x-3 px-6 py-3 bg-state-900 rounded-xl border border-white/5 shadow-xl shadow-emerald-950/20">
           <Calendar size={16} className="text-accent-gold" />
           <span className="text-[10px] font-black text-white uppercase tracking-widest">Session Budgétaire 2026</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative group border border-transparent hover:border-emerald-100">
            <Bell size={22} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-emerald-600 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
          </button>
          
          <button className="p-3 text-slate-400 hover:text-state-900 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-200">
            <Settings size={22} />
          </button>
        </div>

        <div className="h-10 w-px bg-slate-100"></div>

        <div className="flex flex-col text-right">
             <span className="text-[10px] font-black text-state-950 uppercase tracking-[0.2em] leading-none">Assemblée Nationale</span>
             <span className="text-[9px] text-emerald-600 font-extrabold uppercase tracking-widest mt-1">République du Sénégal</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
