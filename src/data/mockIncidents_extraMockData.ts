import { Incident } from '@/types/incident';
import { workAreas } from './workAreas';


// Funktion aufrufen, um die Daten zu laden

const mockIncidents: Incident[] = [
  {
    id: '1',
    workAreaId: 1,
    originalWorkAreaId: 1,
    subProcessId: 101,
    originalSubProcessId: 101,
    title: 'Terminüberschneidung',
    originalTitle: 'Terminüberschneidung',
    description: 'Zwei Patienten wurden auf die gleiche Zeit einbestellt.',
    originalDescription: 'Zwei Patienten wurden auf die gleiche Zeit einbestellt.',
    classification: 'disturbing',
    originalClassification: 'disturbing',
    createdAt: '2024-03-15T10:30:00Z',
    status: 'unreviewed',
    originalWorkArea: 'Anmeldung',
    lastModified: '2024-03-15T10:30:00Z',
    reviewedAt: null,
    hidden: false
  },
  {
    id: '2',
    workAreaId: 3,
    originalWorkAreaId: 3,
    subProcessId: 301,
    originalSubProcessId: 301,
    title: 'Fehlerhafte Lagerung',
    originalTitle: 'Fehlerhafte Lagerung',
    description: 'Patient wurde nicht gemäß Protokoll gelagert.',
    originalDescription: 'Patient wurde nicht gemäß Protokoll gelagert.',
    classification: 'nearMiss',
    originalClassification: 'nearMiss',
    createdAt: '2024-03-14T15:45:00Z',
    status: 'reviewed',
    originalWorkArea: 'Simulation und Bildgebung',
    lastModified: '2024-03-14T15:45:00Z',
    reviewedAt: '2024-03-14T16:30:00Z',
    hidden: false
  }
];

class MockDatabase {
  private incidents: Incident[] = [...mockIncidents];

  getIncidents(): Incident[] {
    return this.incidents.filter(incident => !incident.hidden);
  }

  getAllIncidents(): Incident[] {
    return [...this.incidents];
  }

  createIncident(incident: Omit<Incident, 'id' | 'status' | 'lastModified' | 'reviewedAt' | 'hidden' | 'originalWorkArea' | 'originalTitle' | 'originalClassification' | 'originalWorkAreaId' | 'originalSubProcessId' | 'originalDescription'>): void {
    //loadIncidents();
    const workArea = workAreas.find(area => area.id === incident.workAreaId);
    const newIncident: Incident = {
      ...incident,
      id: (this.incidents.length + 1).toString(),
      status: 'unreviewed',
      lastModified: incident.createdAt,
      reviewedAt: null,
      hidden: false,
      originalWorkArea: workArea?.name || '',
      originalTitle: incident.title,
      originalClassification: incident.classification,
      originalWorkAreaId: incident.workAreaId,
      originalSubProcessId: incident.subProcessId,
      originalDescription: incident.description
    };
    this.incidents.push(newIncident);
  }

  toggleIncidentStatus(id: string): void {
    const incident = this.incidents.find(inc => inc.id === id);
    if (incident) {
      incident.status = incident.status === 'unreviewed' ? 'reviewed' : 'unreviewed';
      incident.reviewedAt = incident.status === 'reviewed' ? new Date().toISOString() : null;
    }
  }

  hideIncident(id: string): void {
    const incident = this.incidents.find(inc => inc.id === id);
    if (incident) {
      incident.hidden = true;
    }
  }

  unhideIncident(id: string): void {
    const incident = this.incidents.find(inc => inc.id === id);
    if (incident) {
      incident.hidden = false;
    }
  }

  updateIncident(id: string, updates: Partial<Incident>): void {
    const incident = this.incidents.find(inc => inc.id === id);
    if (incident) {
      Object.assign(incident, updates);
      incident.lastModified = new Date().toISOString();
      incident.status = 'unreviewed';
      incident.reviewedAt = null;
    }
  }

  deleteIncident(id: string): void {
    const index = this.incidents.findIndex(inc => inc.id === id);
    if (index !== -1) {
      this.incidents.splice(index, 1);
    }
  }
}

export const mockDb = new MockDatabase();