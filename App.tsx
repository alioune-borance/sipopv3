
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardView from './components/DashboardView';
import MinistriesView from './components/MinistriesView';
import ProjectsView from './components/ProjectsView';
import DataIngestionView from './components/DataIngestionView';
import ProjectDashboardView from './components/ProjectDashboardView';
import FieldMonitoringView from './components/FieldMonitoringView';
import { ViewState, Project } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const navigateToProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'ministries':
        return <MinistriesView />;
      case 'projects':
        return <ProjectsView onSelectProject={navigateToProject} />;
      case 'ingestion':
        return <DataIngestionView />;
      case 'field-monitoring':
        return <FieldMonitoringView />;
      case 'project-dashboard':
        return selectedProject ? (
          <ProjectDashboardView 
            project={selectedProject} 
            onBack={() => setCurrentView('projects')} 
          />
        ) : <ProjectsView onSelectProject={navigateToProject} />;
      case 'settings':
        return (
          <div className="flex items-center justify-center h-[50vh] text-gray-500 flex-col">
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-xl font-medium">Administration Système</h2>
            <p>Gestion des utilisateurs, paramètres et logs.</p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <div className="flex-1 flex flex-col ml-72 min-w-0 h-full">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-10 bg-[#f8fafc]">
          <div className="max-w-[1400px] mx-auto w-full">
            {renderContent()}
          </div>
          
          <footer className="mt-16 py-8 border-t border-gray-200 text-center">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">SIPOP • SÉNÉGAL • 2025</div>
            <p className="mt-2 text-[10px] text-gray-400 font-medium">Direction de la Planification et de l'Évaluation des Politiques Publiques</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;