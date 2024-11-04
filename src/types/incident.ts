export type WorkArea = {
  id: number;
  name: string;
  subProcesses: SubProcess[];
};

export type SubProcess = {
  id: number;
  name: string;
};

export type IncidentClassification = 'disturbing' | 'nearMiss' | 'incident';

export type Incident = {
  id: string;
  workAreaId: number;
  subProcessId: number;
  title: string;
  description: string;
  classification: IncidentClassification;
  createdAt: string;
  status: 'unreviewed' | 'reviewed';
  originalWorkArea: string;
  originalWorkAreaId: number;
  originalSubProcessId: number;
  originalTitle: string;  
  originalDescription: string;
  originalClassification: IncidentClassification;
  lastModified: string;
  reviewedAt: string | null;
  hidden: boolean;
};