
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, Landmark, Globe, Wallet, Zap, Heart, TrendingUp, Scale, Coins, Receipt, UserPlus, Flame, Users, LayoutDashboard, MapPin, Layers, Info, Download, Calendar
} from 'lucide-react';

const DashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'impact' | 'macro' | 'keys' | 'pap'>('impact');
  const [papView, setPapView] = useState<'axes' | 'territories' | 'sectors'>('axes');

  // DONNÉES IMPACT SOCIO-ÉCONOMIQUE
  const impactData = [
    { label: "RNB / Habitant (Atlas US$)", initial: 1660, initialYear: 2023, current: 1820, target: 2468, targetYear: 2029, icon: Wallet, unit: "$", source: "B. Mondiale" },
    { label: "Exportation (% PIB)", initial: 23.0, initialYear: 2023, current: 23.8, target: 25.6, targetYear: 2029, icon: TrendingUp, unit: "%", source: "DGPPE" },
    { label: "Ratio Dette (% PIB)", initial: 99.7, initialYear: 2023, current: 89.4, target: 75.3, targetYear: 2029, icon: Landmark, unit: "%", source: "DGPPE" },
    { label: "IDH", initial: 0.511, initialYear: 2022, current: 0.528, target: 0.581, targetYear: 2029, icon: Heart, unit: "", source: "PNUD" },
    { label: "Accès Électricité (%)", initial: 86.0, initialYear: 2022, current: 91.2, target: 100, targetYear: 2029, icon: Zap, unit: "%", source: "Énergie" },
    { label: "Énergie Renouvelable (Mix)", initial: 30.0, initialYear: 2022, current: 31.8, target: 36.1, targetYear: 2029, icon: Zap, unit: "%", source: "Énergie" },
  ];

  // DONNÉES MACRO-BUDGÉTAIRES
  const macroIndicatorsData = [
    { label: "Taux de Croissance réelle", initial: 4.1, initialYear: 2023, current: 9.7, target: 6.4, targetYear: 2029, icon: TrendingUp, unit: "%", source: "DGPPE" },
    { label: "Déficit Budgétaire / PIB", initial: 4.9, initialYear: 2023, current: 3.0, target: 3.0, targetYear: 2029, icon: Scale, unit: "%", source: "DGPPE" },
    { label: "Pression Fiscale", initial: 18.2, initialYear: 2023, current: 20.5, target: 22.6, targetYear: 2029, icon: Landmark, unit: "%", source: "DGPPE" },
    { label: "Dépenses d'Investissement Public", initial: 1850, initialYear: 2023, current: 2123.4, target: 3140.2, targetYear: 2029, icon: Coins, unit: " Mds", source: "DGPPE" },
  ];

  // DONNÉES AUTRES INDICATEURS
  const otherIndicatorsData = [
    { label: "Croissance des recettes fiscales", initial: 8.5, initialYear: 2023, current: 12.4, target: 15.0, targetYear: 2029, icon: Receipt, unit: "%", source: "DGPPE" },
    { label: "DONS / PIB", initial: 2.1, initialYear: 2023, current: 1.8, target: 1.2, targetYear: 2030, icon: Wallet, unit: "%", source: "DGPPE" },
    { label: "Croissance de la masse salariale", initial: 14.2, initialYear: 2023, current: 9.8, target: 7.0, targetYear: 2029, icon: Users, unit: "%", source: "DGPPE" },
    { label: "Croissance des effectifs", initial: 5.4, initialYear: 2023, current: 4.1, target: 3.0, targetYear: 2029, icon: UserPlus, unit: "%", source: "DGPPE" },
    { label: "Subvention à l'énergie / PIB", initial: 4.5, initialYear: 2023, current: 3.2, target: 1.5, targetYear: 2029, icon: Flame, unit: "%", source: "DGPPE" },
    { label: "Déficit Budgétaire / PIB", initial: 4.9, initialYear: 2023, current: -3.0, target: -3.0, targetYear: 2029, icon: Scale, unit: "%", source: "DGPPE" },
  ];

  const dataAxePAP = [
    { name: 'Axe 1: Économie Compétitive', value: 30.1, color: '#022c22' },
    { name: 'Axe 2: Capital Humain', value: 34.4, color: '#059669' },
    { name: 'Axe 3: Aménagement Durable', value: 19.6, color: '#fbbf24' },
    { name: 'Axe 4: Gouvernance', value: 15.8, color: '#1e293b' },
  ];

  const dataTerritoryPAP = [
    { name: 'Pôle Dakar-Thiès', value: 45.2, color: '#064e3b' },
    { name: 'Pôle Casamance', value: 14.8, color: '#10b981' },
    { name: 'Pôle Nord', value: 16.5, color: '#34d399' },
    { name: 'Pôle Centre', value: 12.0, color: '#fbbf24' },
    { name: 'Pôle Sénégal Oriental', value: 11.5, color: '#94a3b8' },
  ];

  const dataSectorPAP = [
    { name: 'Souveraineté Alimentaire', value: 22.4, color: '#065f46' },
    { name: 'Capital Humain & Social', value: 35.1, color: '#059669' },
    { name: 'Infrastructures & Énergie', value: 24.5, color: '#fbbf24' },
    { name: 'Économie Numérique', value: 10.2, color: '#1e293b' },
    { name: 'Gouvernance & Sécurité', value: 7.8, color: '#475569' },
  ];

  const getPapData = () => {
    switch(papView) {
      case 'territories': return dataTerritoryPAP;
      case 'sectors': return dataSectorPAP;
      default: return dataAxePAP;
    }
  };

  const calculateProgress = (initial: number, current: number, target: number) => {
    if (initial === target) return 100;
    if (initial > target) {
      const prog = ((initial - current) / (initial - target)) * 100;
      return Math.min(100, Math.max(0, prog));
    }
    const prog = ((current - initial) / (target - initial)) * 100;
    return Math.min(100, Math.max(0, prog));
  };

  const renderIndicatorGrid = (data: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {data.map((item, i) => {
        const progress = calculateProgress(item.initial, item.current, item.target);
        return (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium group hover:border-emerald-200 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <item.icon size={20} />
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">Source: {item.source}</div>
                  <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 uppercase tracking-tighter">CIBLE {item.targetYear || 2029}</div>
                </div>
              </div>
              <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-4 leading-relaxed min-h-[30px]">{item.label}</h3>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="p-2.5 bg-slate-50/50 rounded-xl border border-slate-50 text-center">
                  <div className="text-[7px] font-black text-slate-400 uppercase mb-1">Réf.</div>
                  <div className="text-xs font-bold text-slate-400">{item.initial}{item.unit}</div>
                </div>
                <div className="p-2.5 bg-emerald-100/30 rounded-xl border border-emerald-200/50 text-center scale-105 shadow-md z-10">
                  <div className="text-[7px] font-black text-emerald-700 uppercase mb-1">Actuel</div>
                  <div className="text-xs font-black text-emerald-700">{item.current}{item.unit}</div>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-state-950 text-center">
                  <div className="text-[7px] font-black text-emerald-500 uppercase mb-1">Cible</div>
                  <div className="text-xs font-bold text-white">{item.target}{item.unit}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] mb-2 uppercase font-black tracking-widest text-slate-400 px-1">
                <span>Vision 2050</span>
                <span className="text-emerald-700">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 relative">
                <div 
                  className="state-gradient h-full rounded-full transition-all duration-1000"
                  style={{width: `${progress}%`}}
                >
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="page-transition space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-3">
             <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200">VISION SÉNÉGAL 2050</span>
             <span className="text-slate-400 font-bold text-[11px] flex items-center"><Calendar size={12} className="mr-1" /> MAJ : Déc. 2025</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-state-900 tracking-tight leading-tight">
            Synthèse <span className="text-emerald-600 italic">Nationale</span> SND
          </h2>
          <p className="text-slate-500 mt-2 text-[13px] font-medium italic">Monitoring triennal des performances étatiques.</p>
        </div>
        <button className="flex items-center px-6 py-3.5 bg-state-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all group shrink-0">
          <Download size={16} className="mr-3 text-accent-gold" /> 
          RAPPORT STRATÉGIQUE
        </button>
      </div>

      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-premium flex items-center justify-between overflow-x-auto scrollbar-hide">
        {[
          { id: 'impact', label: 'Impact Socio-Économique', icon: Globe },
          { id: 'macro', label: 'Macro-Budgétaire', icon: Landmark },
          { id: 'keys', label: 'Autres indicateurs', icon: Activity },
          { id: 'pap', label: 'Financement PAP', icon: Wallet },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[180px] mx-1 flex items-center justify-center px-4 py-3 rounded-xl text-[9px] font-black tracking-widest transition-all duration-300 ${
              activeTab === tab.id 
                ? 'state-gradient text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={14} className={`mr-3 ${activeTab === tab.id ? 'text-accent-gold' : 'text-slate-300'}`} />
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === 'impact' && renderIndicatorGrid(impactData)}
      {activeTab === 'macro' && renderIndicatorGrid(macroIndicatorsData)}
      {activeTab === 'keys' && renderIndicatorGrid(otherIndicatorsData)}

      {activeTab === 'pap' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-premium flex items-center justify-center space-x-4 max-w-xl mx-auto">
             {[
               { id: 'axes', label: 'Axes', icon: LayoutDashboard },
               { id: 'territories', label: 'Pôles', icon: MapPin },
               { id: 'sectors', label: 'Secteurs', icon: Layers },
             ].map((view) => (
               <button
                 key={view.id}
                 onClick={() => setPapView(view.id as any)}
                 className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl text-[9px] font-black tracking-widest transition-all ${
                   papView === view.id 
                   ? 'bg-state-900 text-white shadow-md' 
                   : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 {view.label.toUpperCase()}
               </button>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-premium flex flex-col items-center">
                   <h3 className="text-xl font-serif font-bold text-state-900 mb-8 self-start">Répartition du PAP 2026</h3>
                   <div className="w-full h-[320px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={getPapData()}
                               innerRadius={90}
                               outerRadius={120}
                               paddingAngle={8}
                               dataKey="value"
                               stroke="none"
                               cx="50%"
                               cy="45%"
                            >
                               {getPapData().map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                               ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase'}} />
                         </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                         <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total PAP</div>
                         <div className="text-2xl font-serif font-bold text-state-900">18.5 <span className="text-[10px]">T CFA</span></div>
                      </div>
                   </div>
                </div>
                
                <div className="bg-state-900 rounded-[2rem] p-10 text-white shadow-2xl flex flex-col justify-between">
                   <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-accent-gold mb-8">Détails de l'Allocation</h3>
                      <div className="space-y-6">
                         {getPapData().map((item, i) => (
                           <div key={i}>
                              <div className="flex justify-between items-end mb-2">
                                 <span className="text-[11px] font-bold text-emerald-100">{item.name}</span>
                                 <span className="text-base font-serif font-bold text-accent-gold">{item.value}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                 <div 
                                    className="h-full rounded-full transition-all duration-1000" 
                                    style={{width: `${item.value}%`, backgroundColor: item.color}}
                                 ></div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-xl">
                      <p className="text-[11px] text-emerald-50/70 font-medium italic leading-relaxed">
                         "La répartition budgétaire du PAP est alignée sur les impératifs de souveraineté alimentaire et de capital humain."
                      </p>
                   </div>
                </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
