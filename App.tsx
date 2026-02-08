
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import MinistriesView from './components/MinistriesView';
import ProjectsView from './components/ProjectsView';
import DataIngestionView from './components/DataIngestionView';
import ProjectDashboardView from './components/ProjectDashboardView';
import FieldMonitoringView from './components/FieldMonitoringView';
import { ViewState, Project } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const navigateToProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
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
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <div className="flex-1 flex flex-col ml-64 min-w-0 h-full">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto w-full">
            {renderContent()}
          </div>
          
          <footer className="mt-12 py-6 border-t border-slate-200 text-center">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">SIPOP • SÉNÉGAL • 2025</div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
