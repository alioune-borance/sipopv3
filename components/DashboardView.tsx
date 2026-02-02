
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line 
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, Activity, Users, Wallet, TrendingUp, 
  Download, ChevronRight, Globe, ShieldCheck, Zap, Droplets, Heart, 
  Briefcase, Landmark, Map, Info, Calendar, MapPin, Layers, LayoutDashboard,
  Percent, Coins, BarChart3, Scale, Receipt, UserPlus, Flame
} from 'lucide-react';

const DashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'impact' | 'macro' | 'keys' | 'pap'>('impact');
  const [papView, setPapView] = useState<'axes' | 'territories' | 'sectors'>('axes');

  // Données documentaires avec Valeur de Référence, Valeur Actuelle et Cible (Page 3-5 Vision 2050)
  const impactData = [
    { label: "RNB / Habitant (Atlas US$)", initial: 70, initialYear: 2023, current: 73.7, target: 75, targetYear: 2029, icon: Wallet, unit: "%", source: "B. Mondiale" },
    { label: "Exportation (% PIB)", initial: 83.0, initialYear: 2023, current: 92.9, target: 95.6, targetYear: 2029, icon: TrendingUp, unit: "%", source: "DGPPE" },
    { label: "Ratio Dette (% PIB)", initial: 99.7, initialYear: 2023, current: 84.2, target: 75.3, targetYear: 2029, icon: Landmark, unit: "%", source: "DGPPE" },
    { label: "IDH", initial: 51.1, initialYear: 2022, current: 90.9, target: 92.1, targetYear: 2029, icon: Heart, unit: "%", source: "PNUD" },
    { label: "Accès Électricité (%)", initial: 86.0, initialYear: 2022, current: 91.2, target: 100, targetYear: 2029, icon: Zap, unit: "%", source: "Énergie" },
    { label: "Énergie Renouvelable (Mix)", initial: 50.0, initialYear: 2022, current: 88.1, target: 90.1, targetYear: 2029, icon: Zap, unit: "%", source: "Énergie" },
  ];

  const macroIndicatorsData = [
    { label: "Taux de Croissance réelle", initial: 4.1, initialYear: 2023, current: 9.7, target: 6.4, targetYear: 2029, icon: TrendingUp, unit: "%", source: "DGPPE" },
    { label: "Déficit Budgétaire / PIB", initial: -4.9, initialYear: 2023, current: -3.0, target: -3.0, targetYear: 2029, icon: Scale, unit: "%", source: "DGPPE" },
    { label: "Pression Fiscale", initial: 18.2, initialYear: 2023, current: 20.5, target: 22.6, targetYear: 2029, icon: Landmark, unit: "%", source: "DGPPE" },
    { label: "Dépenses d'Investissement Public", initial: 1850, initialYear: 2023, current: 2123.4, target: 3140.2, targetYear: 2029, icon: Coins, unit: " Mds", source: "DGPPE" },
  ];

  const otherIndicatorsData = [
    { label: "Croissance des recettes fiscales", initial: 8.5, initialYear: 2023, current: 12.4, target: 15.0, targetYear: 2029, icon: Receipt, unit: "%", source: "DGPPE" },
    { label: "DONS / PIB", initial: 2.1, initialYear: 2023, current: 1.8, target: 1.2, targetYear: 2030, icon: Wallet, unit: "%", source: "DGPPE" },
    { label: "Croissance de la masse salariale", initial: 14.2, initialYear: 2023, current: 9.8, target: 7.0, targetYear: 2029, icon: Users, unit: "%", source: "DGPPE" },
    { label: "Croissance des effectifs", initial: 5.4, initialYear: 2023, current: 4.1, target: 3.0, targetYear: 2029, icon: UserPlus, unit: "%", source: "DGPPE" },
    { label: "Subvention à l'énergie / PIB", initial: 4.5, initialYear: 2023, current: 3.2, target: 1.5, targetYear: 2029, icon: Flame, unit: "%", source: "DGPPE" },
    { label: "Déficit Budgétaire / PIB", initial: -4.9, initialYear: 2023, current: -3.0, target: -3.0, targetYear: 2029, icon: Scale, unit: "%", source: "DGPPE" },
  ];

  const dataMacroHistory = [
    { year: '2025', croissance: 9.7, deficit: -3.0, pression: 20.5, invest: 2123.4 },
    { year: '2026', croissance: 5.0, deficit: -3.0, pression: 21.0, invest: 2268.9 },
    { year: '2027', croissance: 5.4, deficit: -3.0, pression: 21.9, invest: 2519.9 },
    { year: '2028', croissance: 5.9, deficit: -3.0, pression: 22.3, invest: 2769.0 },
    { year: '2029', croissance: 6.4, deficit: -3.0, pression: 22.6, invest: 3140.2 },
  ];

  // PAP DATA - AXES
  const dataAxePAP = [
    { name: 'Axe 1: Économie Compétitive', value: 30.1, color: '#022c22' },
    { name: 'Axe 2: Capital Humain', value: 34.4, color: '#059669' },
    { name: 'Axe 3: Aménagement Durable', value: 19.6, color: '#fbbf24' },
    { name: 'Axe 4: Gouvernance', value: 15.8, color: '#1e293b' },
  ];

  // PAP DATA - TERRITOIRES
  const dataTerritoryPAP = [
    { name: 'Pôle Dakar-Thiès', value: 45.2, color: '#064e3b' },
    { name: 'Pôle Casamance (Sud)', value: 14.8, color: '#10b981' },
    { name: 'Pôle Nord (St-Louis/Matam)', value: 16.5, color: '#34d399' },
    { name: 'Pôle Centre (Kaolack/Fatick)', value: 12.0, color: '#fbbf24' },
    { name: 'Pôle Sénégal Oriental', value: 11.5, color: '#94a3b8' },
  ];

  // PAP DATA - SECTEURS
  const dataSectorPAP = [
    { name: 'Souveraineté Alimentaire', value: 22.4, color: '#065f46' },
    { name: 'Capital Humain & Social', value: 35.1, color: '#059669' },
    { name: 'Infrastructures & Énergie', value: 24.5, color: '#fbbf24' },
    { name: 'Économie Numérique & Ind.', value: 10.2, color: '#1e293b' },
    { name: 'Gouvernance & Sécurité', value: 7.8, color: '#475569' },
  ];

  // Calcul du progrès
  const calculateProgress = (initial: number, current: number, target: number) => {
    if (initial === target) return current === target ? 100 : 0;
    
    // Pour les indicateurs où la baisse est l'objectif (ex: déficit, subventions, croissance effectifs)
    if (initial > target) {
      // Progrès = (valeur initiale - valeur actuelle) / (valeur initiale - valeur cible)
      const prog = ((initial - current) / (initial - target)) * 100;
      return Math.min(100, Math.max(0, prog));
    }
    
    // Pour les indicateurs où la hausse est l'objectif (ex: croissance, recettes)
    const prog = ((current - initial) / (target - initial)) * 100;
    return Math.min(100, Math.max(0, prog));
  };

  const getPapData = () => {
    switch(papView) {
      case 'territories': return dataTerritoryPAP;
      case 'sectors': return dataSectorPAP;
      default: return dataAxePAP;
    }
  };

  const renderIndicatorGrid = (data: any[]) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {data.map((item, i) => {
        //const progress = calculateProgress(item.initial, item.current, item.target);
        const progress = item.current;
        return (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium group hover:border-emerald-200 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  <item.icon size={24} />
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Source: {item.source}</div>
                  <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">CIBLE {item.targetYear}</div>
                </div>
              </div>
              <h3 className="text-[13px] font-black text-slate-600 uppercase tracking-widest mb-6 leading-relaxed min-h-[40px]">{item.label}</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-50 text-center">
                  <div className="text-[7px] font-black text-slate-400 uppercase mb-1">Réf. ({item.initialYear})</div>
                  <div className="text-sm font-black text-slate-400">{item.initial}{item.unit}</div>
                </div>
                <div className="p-3 bg-emerald-100/30 rounded-2xl border border-emerald-200/50 text-center ring-2 ring-emerald-500/10 scale-105 shadow-lg z-10">
                  <div className="text-[7px] font-black text-emerald-700 uppercase mb-1">Actuel (2025)</div>
                  <div className="text-sm font-black text-emerald-700">{item.current}{item.unit}</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-2xl border border-state-950 text-center">
                  <div className="text-[7px] font-black text-emerald-500 uppercase mb-1">Cible ({item.targetYear})</div>
                  <div className="text-sm font-black text-white">{item.target}{item.unit}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] mb-3 uppercase font-black tracking-widest text-slate-400 px-1">
                <span>Réalisation Vision 2050</span>
                <span className="text-emerald-700">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-8 rounded-full overflow-hidden border border-slate-200 relative shadow-inner">
                <div 
                  className="state-gradient h-full rounded-full transition-all duration-1000 flex items-center justify-center border-r-4 border-white/20"
                  style={{width: `${progress}%`}}
                >
                  {progress > 18 && (
                    <span className="text-[10px] text-white font-black tracking-widest drop-shadow-md">
                      {progress.toFixed(1)}%
                    </span>
                  )}
                </div>
                {progress <= 18 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-500 font-black tracking-widest">
                    {progress.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="page-transition space-y-10 animate-in fade-in duration-500 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
             <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-200">VISION SÉNÉGAL 2050</span>
             <span className="text-slate-400 font-bold text-xs flex items-center"><Calendar size={14} className="mr-1" /> Mise à jour : Déc. 2025</span>
          </div>
          <h2 className="text-6xl font-serif font-bold text-state-900 tracking-tight leading-tight">
            Tableaux de Bord <span className="text-emerald-600 italic">SND</span> 2025-2029
          </h2>
          <p className="text-slate-500 mt-4 text-xl font-medium">Monitoring des indicateurs d'impact et macro-budgétaires.</p>
        </div>
        <button className="flex items-center px-8 py-5 bg-[#4d7367] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#3d5c52] transition-all group shrink-0">
          <Download size={18} className="mr-4 text-accent-gold" /> 
          <span className="flex flex-col items-start leading-none">
            RAPPORT
            <span className="text-[9px] opacity-70">STRATÉGIQUE</span>
          </span>
        </button>
      </div>

      <div className="bg-white p-2 rounded-[2rem] border border-slate-200 shadow-premium flex items-center justify-between overflow-x-auto scrollbar-hide min-h-[90px]">
        {[
          { id: 'impact', label: 'Impact Socio-Économique', icon: Globe },
          { id: 'macro', label: 'Macro-Budgétaire', icon: Landmark },
          { id: 'keys', label: 'Autres indicateurs', icon: Activity },
          { id: 'pap', label: 'Financement PAP', icon: Wallet },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[220px] mx-1 flex items-center justify-center px-6 py-5 rounded-2xl text-[10px] font-black tracking-widest transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-[#4d7367] text-white shadow-xl translate-y-[-2px]' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} className={`mr-4 ${activeTab === tab.id ? 'text-accent-gold' : 'text-slate-300'}`} />
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === 'impact' && renderIndicatorGrid(impactData)}
      
      {activeTab === 'macro' && renderIndicatorGrid(macroIndicatorsData)}

      {activeTab === 'keys' && renderIndicatorGrid(otherIndicatorsData)}

      {activeTab === 'pap' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
          <div className="bg-white p-3 rounded-[2.5rem] border border-slate-200 shadow-premium flex items-center justify-center space-x-6 max-w-3xl mx-auto">
             {[
               { id: 'axes', label: 'Par Axe Stratégique', icon: LayoutDashboard },
               { id: 'territories', label: 'Par Pôle Territoire', icon: MapPin },
               { id: 'sectors', label: 'Par Secteur d\'Activité', icon: Layers },
             ].map((view) => (
               <button
                 key={view.id}
                 onClick={() => setPapView(view.id as any)}
                 className={`flex-1 flex items-center justify-center px-8 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all ${
                   papView === view.id 
                   ? 'bg-state-900 text-white shadow-xl scale-[1.02]' 
                   : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 <view.icon size={16} className={`mr-3 ${papView === view.id ? 'text-accent-gold' : 'text-slate-300'}`} />
                 {view.label.toUpperCase()}
               </button>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-premium flex flex-col items-center">
                   <div className="self-start mb-8">
                      <h3 className="text-2xl font-serif font-bold text-state-900">Répartition Financière PAP</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        Dimension : {papView === 'axes' ? 'Orientation Stratégique' : papView === 'territories' ? 'Équité Territoriale' : 'Priorités Sectorielles'}
                      </p>
                   </div>
                   <div className="flex-1 w-full h-[450px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={getPapData()}
                               innerRadius={120}
                               outerRadius={160}
                               paddingAngle={10}
                               dataKey="value"
                               stroke="none"
                               cx="50%"
                               cy="45%"
                            >
                               {getPapData().map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />
                               ))}
                            </Pie>
                            <Tooltip 
                               contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '15px' }}
                               itemStyle={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}
                            />
                            <Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{paddingTop: '40px', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase'}} />
                         </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Budget Total</div>
                         <div className="text-4xl font-serif font-bold text-state-900">100%</div>
                         <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1">18.5 T CFA</div>
                      </div>
                   </div>
                </div>
                
                <div className="bg-state-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                   <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-gold/5 rounded-full -ml-32 -mb-32 blur-[80px]"></div>
                   
                   <div className="relative z-10">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-accent-gold mb-12 flex items-center">
                         <Activity size={18} className="mr-3" /> Analyse Fine de l'Allocation
                      </h3>
                      <div className="space-y-10">
                         {getPapData().map((item, i) => (
                           <div key={i} className="group">
                              <div className="flex justify-between items-end mb-4">
                                 <span className="text-xs font-bold text-emerald-100 group-hover:text-white transition-colors">{item.name}</span>
                                 <span className="text-xl font-serif font-bold text-accent-gold">{item.value}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                 <div 
                                    className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(251,191,36,0.2)]" 
                                    style={{width: `${item.value}%`, backgroundColor: item.color}}
                                 ></div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="relative z-10 mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
                      <div className="flex items-center space-x-4 mb-4">
                         <div className="w-10 h-10 bg-accent-gold rounded-xl flex items-center justify-center text-state-900">
                            <Info size={20} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Note de Planification</span>
                      </div>
                      <p className="text-xs text-emerald-50/70 font-medium italic leading-relaxed">
                         "Cette répartition du PAP 2025-2029 est calibrée pour maximiser l'effet multiplicateur sur le PIB et garantir une résilience territoriale face aux chocs exogènes."
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