
export type ViewState = 'dashboard' | 'ministries' | 'projects' | 'settings' | 'program-detail' | 'ingestion' | 'project-dashboard' | 'field-monitoring';

export interface BudgetDetail {
  ae: number; // Autorisations d'Engagement
  cp: number; // Crédits de Paiement
  year: number;
}

export interface MonitoringVisit {
  id: string;
  date: string;
  author: string;
  status: 'Conforme' | 'Alerte' | 'Critique';
  observation: string;
  analysis: string;
  media: {
    type: 'image' | 'video';
    url: string;
  }[];
}

export interface Program {
  id: string;
  name: string;
  manager: string;
  budget2026: BudgetDetail;
  weight: string; // % du budget ministère
  status: 'On Track' | 'Delayed' | 'Critical';
  objective?: string;
  kpis: {
    label: string;
    value: string;
    target: string;
    unit: string;
  }[];
  breakdown?: {
    label: string;
    value: number;
  }[];
}

export interface Ministry {
  id: number;
  name: string;
  minister: string;
  totalBudgetTriennal: number; // Mds CFA
  budget2026: number; // Mds CFA
  investmentShare: number; // %
  executionRate: number;
  physicalRate: number;
  programs: Program[];
}

export interface Project {
  id: string;
  name: string;
  ministry: string;
  program: string;
  costTotal: string;
  source: string;
  progressPhysical: number;
  progressFinancial: number;
  status: 'On Track' | 'Delayed' | 'Critical' | 'Completed';
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  beneficiariesCount?: string;
  monitoringVisits?: MonitoringVisit[];
}

export interface AIRisk {
  id: number;
  project: string;
  type: string;
  probability: string;
  impact: string;
  recommendation: string;
}
