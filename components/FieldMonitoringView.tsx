
import React, { useState, useRef } from 'react';
import { 
  Camera, Video, Upload, ArrowLeft, Plus, Image as ImageIcon, 
  MapPin, Clock, ShieldCheck, AlertTriangle, MessageSquare, 
  Sparkles, Loader2, Save, Trash2, Maximize2, Play, Eye
} from 'lucide-react';
import { Project, MonitoringVisit } from '../types';
import { GoogleGenAI } from "@google/genai";

const mockProjects: Project[] = [
  { id: 'MITA-AUT-01', name: "Autoroute Dakar-Tivaouane-Saint Louis", ministry: "Infrastructures", program: "Développement du Réseau Autoroutier", status: 'On Track', progressPhysical: 28, progressFinancial: 35, costTotal: "1 250.6 Mds", source: "Multi-Bailleurs", description: "Construction de l'axe autoroutier majeur.", location: "Dakar - St Louis", monitoringVisits: [] },
  { id: 'MHA-DES-01', name: "Unité de Dessalement d'Eau de Mer", ministry: "Hydraulique", program: "Sécurisation de l'Eau", status: 'On Track', progressPhysical: 42, progressFinancial: 48, costTotal: "137.3 Mds", source: "JICA / Japon", description: "Réalisation d'une usine de dessalement.", location: "Mamelles, Dakar", monitoringVisits: [] },
  { id: 'MPEM-POR-01', name: "Développement du Port de Ziguinchor", ministry: "Pêche & Maritime", program: "Infrastructures Maritimes", status: 'On Track', progressPhysical: 65, progressFinancial: 58, costTotal: "10.9 Mds", source: "ORIO (Hollande)", description: "Modernisation des infrastructures portuaires.", location: "Ziguinchor", monitoringVisits: [] }
];

const FieldMonitoringView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingVisit, setIsAddingVisit] = useState(false);
  const [visits, setVisits] = useState<Record<string, MonitoringVisit[]>>({
    'MITA-AUT-01': [
      { id: 'V-001', date: '20 Oct 2025', author: 'Amadou Diop', status: 'Conforme', observation: 'Travaux de terrassement en cours sur le tronçon Louga. Aucun retard à signaler.', analysis: 'La mobilisation du matériel lourd est satisfaisante. Respect du calendrier prévisionnel.', media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=800' }] }
    ]
  });

  const [newVisit, setNewVisit] = useState<Partial<MonitoringVisit>>({
    status: 'Conforme',
    observation: '',
    analysis: '',
    media: []
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erreur caméra:", err);
      setIsCameraActive(false);
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setNewVisit(prev => ({
        ...prev,
        media: [...(prev.media || []), { type: 'image', url: dataUrl }]
      }));
      // Stop camera
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const generateAIAnalysis = async () => {
    if (!newVisit.observation) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `En tant qu'expert en suivi de projets publics au Sénégal, analyse cette observation terrain pour le projet "${selectedProject?.name}": "${newVisit.observation}". Donne une analyse concise, technique et professionnelle.`
      });
      setNewVisit(prev => ({ ...prev, analysis: response.text || "Analyse indisponible." }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveVisit = () => {
    if (!selectedProject) return;
    const visit: MonitoringVisit = {
      id: `V-${Date.now()}`,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      author: 'Hon. Amadou Diop',
      status: newVisit.status as any,
      observation: newVisit.observation || '',
      analysis: newVisit.analysis || '',
      media: newVisit.media || []
    };

    setVisits(prev => ({
      ...prev,
      [selectedProject.id]: [visit, ...(prev[selectedProject.id] || [])]
    }));
    setIsAddingVisit(false);
    setNewVisit({ status: 'Conforme', observation: '', analysis: '', media: [] });
  };

  if (selectedProject) {
    const projectVisits = visits[selectedProject.id] || [];

    return (
      <div className="page-transition space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setSelectedProject(null)}
            className="flex items-center text-[10px] font-black text-state-900 bg-white hover:bg-slate-50 px-8 py-4 rounded-2xl border border-slate-200 transition-all shadow-sm uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-1 transition-transform text-emerald-700" /> 
            Projets à suivre
          </button>
          {!isAddingVisit && (
            <button 
              onClick={() => setIsAddingVisit(true)}
              className="flex items-center px-8 py-4 state-gradient text-white rounded-2xl text-[10px] font-black shadow-xl hover:scale-105 transition-all uppercase tracking-widest"
            >
              <Plus size={18} className="mr-2 text-accent-gold" /> Nouveau Suivi Terrain
            </button>
          )}
        </div>

        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium">
           <div className="flex items-center space-x-6 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[9px] font-black uppercase tracking-widest">{selectedProject.id}</span>
              <span className="flex items-center text-slate-400 text-xs font-bold"><MapPin size={14} className="mr-1" /> {selectedProject.location}</span>
           </div>
           <h2 className="text-4xl font-serif font-bold text-state-900 tracking-tight">{selectedProject.name}</h2>
        </div>

        {isAddingVisit ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-6 duration-500">
             <div className="space-y-8 bg-white p-12 rounded-[3rem] shadow-premium border border-slate-100">
                <h3 className="text-2xl font-serif font-bold text-state-900">Nouvelle Constatation</h3>
                
                <div className="space-y-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">État du Chantier</label>
                      <div className="flex gap-4">
                         {['Conforme', 'Alerte', 'Critique'].map(s => (
                           <button 
                            key={s}
                            onClick={() => setNewVisit(prev => ({...prev, status: s as any}))}
                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                              newVisit.status === s 
                              ? (s === 'Conforme' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-inner' : s === 'Alerte' ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-inner' : 'bg-red-50 border-red-200 text-red-700 shadow-inner')
                              : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                            }`}
                           >
                             {s}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Observations Terrain</label>
                      <textarea 
                        className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-6 text-sm font-semibold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none min-h-[150px]"
                        placeholder="Détaillez ce que vous observez sur le site (avancement, matériaux, effectifs...)"
                        value={newVisit.observation}
                        onChange={e => setNewVisit(prev => ({...prev, observation: e.target.value}))}
                      />
                   </div>

                   <div className="space-y-3">
                      <div className="flex justify-between items-center">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyse de Performance</label>
                         <button 
                            onClick={generateAIAnalysis}
                            disabled={isAnalyzing || !newVisit.observation}
                            className="flex items-center text-[9px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 disabled:opacity-30"
                         >
                            {isAnalyzing ? <Loader2 size={12} className="mr-2 animate-spin" /> : <Sparkles size={12} className="mr-2" />}
                            Générer Analyse IA
                         </button>
                      </div>
                      <textarea 
                        className="w-full bg-emerald-50/20 border border-emerald-100/50 rounded-2xl p-6 text-sm font-bold text-emerald-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none min-h-[120px]"
                        placeholder="Analyse automatique ou saisie manuelle de l'expert..."
                        value={newVisit.analysis}
                        onChange={e => setNewVisit(prev => ({...prev, analysis: e.target.value}))}
                      />
                   </div>
                </div>

                <div className="flex gap-4 pt-4">
                   <button onClick={() => setIsAddingVisit(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Annuler</button>
                   <button onClick={saveVisit} className="flex-1 py-4 state-gradient text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Enregistrer le Suivi</button>
                </div>
             </div>

             <div className="space-y-8 bg-state-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h3 className="text-2xl font-serif font-bold text-white mb-6">Capture Médias</h3>
                
                {isCameraActive ? (
                  <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl bg-black aspect-video flex items-center justify-center">
                     <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                     <button 
                        onClick={takePhoto}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-500 hover:scale-110 transition-transform"
                     >
                        <div className="w-10 h-10 bg-emerald-600 rounded-full"></div>
                     </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                     <button 
                        onClick={startCamera}
                        className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all group"
                     >
                        <Camera size={40} className="text-accent-gold group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Caméra</span>
                     </button>
                     <button className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all group">
                        <Upload size={40} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Importer</span>
                     </button>
                  </div>
                )}

                <div className="space-y-4 mt-8">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-accent-gold/50">Médias capturés</h4>
                   <div className="grid grid-cols-3 gap-3">
                      {(newVisit.media || []).map((m, i) => (
                        <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                           <img src={m.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                           <button className="absolute top-2 right-2 p-1 bg-red-500/20 text-red-400 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 size={12} />
                           </button>
                        </div>
                      ))}
                      {(!newVisit.media || newVisit.media.length === 0) && (
                        <div className="col-span-3 py-10 text-center text-[10px] font-bold text-white/20 uppercase tracking-widest border border-dashed border-white/10 rounded-2xl">
                           Aucun média pour le moment
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-500">
             {projectVisits.length > 0 ? (
                <div className="space-y-12">
                   {projectVisits.map((visit, i) => (
                     <div key={visit.id} className="relative pl-12 group">
                        {/* Timeline Connector */}
                        {i !== projectVisits.length - 1 && (
                          <div className="absolute left-[19px] top-12 bottom-[-48px] w-1 bg-slate-100 rounded-full"></div>
                        )}
                        <div className={`absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border-4 border-white ${
                          visit.status === 'Conforme' ? 'bg-emerald-500 text-white' : visit.status === 'Alerte' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                           <Clock size={16} />
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden hover:shadow-2xl transition-all">
                           <div className="p-10 border-b border-slate-50 flex justify-between items-start">
                              <div>
                                 <div className="flex items-center space-x-3 mb-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{visit.date}</span>
                                    <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{visit.author}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-state-900">Rapport de surveillance technique</h3>
                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                      visit.status === 'Conforme' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>
                                       {visit.status}
                                    </span>
                                 </div>
                              </div>
                              <button className="p-3 bg-slate-50 text-slate-300 rounded-xl hover:text-state-900 transition-colors">
                                 <Maximize2 size={18} />
                              </button>
                           </div>

                           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-10">
                              <div className="lg:col-span-8 space-y-8">
                                 <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                                       <Eye size={14} className="mr-2" /> Constatations Directes
                                    </h4>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                                       "{visit.observation}"
                                    </p>
                                 </div>
                                 <div className="p-8 bg-emerald-50/30 rounded-3xl border border-emerald-100/50">
                                    <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center">
                                       <Sparkles size={14} className="mr-2" /> Analyse d'Expertise
                                    </h4>
                                    <p className="text-sm font-bold text-emerald-900 leading-relaxed">
                                       {visit.analysis}
                                    </p>
                                 </div>
                              </div>
                              <div className="lg:col-span-4 space-y-6">
                                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                                    <ImageIcon size={14} className="mr-2" /> Médias du site
                                 </h4>
                                 <div className="grid grid-cols-2 gap-4">
                                    {visit.media.map((m, idx) => (
                                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer">
                                         <img src={m.url} className="w-full h-full object-cover" />
                                         {m.type === 'video' && (
                                           <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                              <Play className="text-white fill-white" size={24} />
                                           </div>
                                         )}
                                      </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             ) : (
                <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-premium">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300 shadow-inner">
                      <Camera size={40} />
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-state-900 mb-2">Aucune mission de terrain</h3>
                   <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10">Commencez à documenter l'avancement physique des travaux par des captures photo et vidéo.</p>
                   <button 
                      onClick={() => setIsAddingVisit(true)}
                      className="px-10 py-5 state-gradient text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                   >
                      Effectuer la première mission
                   </button>
                </div>
             )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page-transition space-y-12 pb-20">
      <div className="max-w-3xl">
         <h2 className="text-6xl font-serif font-bold text-state-900 tracking-tight leading-none">Mission <span className="text-emerald-600 italic">de terrain</span></h2>
         <p className="text-slate-500 mt-6 text-xl font-medium">Monitoring visuel et audit direct sur les chantiers stratégiques du Sénégal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockProjects.map(project => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-premium hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                <div className="w-12 h-12 state-gradient rounded-xl flex items-center justify-center text-white shadow-xl">
                   <Maximize2 size={24} />
                </div>
             </div>
             <div className="mb-8">
                <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 inline-block">{project.id}</span>
                <h3 className="text-2xl font-bold text-state-900 group-hover:text-emerald-700 transition-colors leading-tight">{project.name}</h3>
             </div>
             
             <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <Camera size={14} className="mr-2 text-emerald-600" /> {visits[project.id]?.length || 0} Missions
                </div>
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400 shadow-sm">
                        AD
                     </div>
                   ))}
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="state-gradient rounded-[3.5rem] p-16 text-white shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center text-accent-gold mb-10 border border-white/10 shadow-2xl">
            <ShieldCheck size={48} />
         </div>
         <h3 className="text-3xl font-serif font-bold mb-6">Contrôle Parlementaire de Proximité</h3>
         <p className="text-emerald-100 max-w-2xl font-medium text-lg leading-relaxed mb-10 italic">
            "Le SIPOP rapproche l'Hémicycle du terrain. Chaque pixel capturé renforce la transparence et l'efficacité de la dépense publique au service des populations."
         </p>
         <div className="flex gap-4">
            <div className="px-8 py-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Géo-clôture Activable</div>
            <div className="px-8 py-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Signature Digitale</div>
         </div>
      </div>
    </div>
  );
};

export default FieldMonitoringView;