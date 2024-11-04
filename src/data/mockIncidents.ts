import { Incident } from '@/types/incident';
import { workAreas } from './workAreas';

class MockDatabase {
  private incidents: Incident[] = [];

  constructor() {
    this.loadIncidentsFromAPI();
  }
  // Helper function to retrieve the logged-in user's username
  private getLoggedInUsername(): string | null {
    return localStorage.getItem('loggedInUser');
  }
  // Funktion, um Daten von der API abzurufen
  private async loadIncidentsFromAPI() {
    try {
      const response = await fetch('http://localhost:3000/api/incidents');
      if (!response.ok) {
        throw new Error(`Fehler beim Laden der Incidents: ${response.statusText}`);
      }
      const data = await response.json();
      this.incidents = data.data;
      console.log('Incidents erfolgreich geladen:', this.incidents);
    } catch (error) {
      console.error('Fehler beim Abrufen der Incidents:', error);
    }
  }

  getIncidents(): Incident[] {
    return this.incidents.filter(incident => !incident.hidden);
  }

  getAllIncidents(): Incident[] {
    return [...this.incidents];
  }

  async createIncident(incident: Omit<Incident, 'id' | 'status' | 'lastModified' | 'reviewedAt' | 'hidden' | 'originalWorkArea' | 'originalTitle' | 'originalClassification' | 'originalWorkAreaId' | 'originalSubProcessId' | 'originalDescription'>) {
    const workArea = workAreas.find(area => area.id === incident.workAreaId);
    const newIncident = {
      ...incident,
      status: 'unreviewed',
      lastModified: new Date().toISOString(),
      reviewedAt: null,
      hidden: false,
      originalWorkArea: workArea?.name || '',
      originalTitle: incident.title,
      originalClassification: incident.classification,
      originalWorkAreaId: incident.workAreaId,
      originalSubProcessId: incident.subProcessId,
      originalDescription: incident.description,
    };

    try {
      const response = await fetch('http://localhost:3000/api/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncident),
      });
      const data = await response.json();
      this.incidents.push(data); // Hinzugefügten Incident zur lokalen Liste hinzufügen
      console.log('Neuer Incident hinzugefügt:', data);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Incidents:', error);
    }
  }

  async toggleIncidentStatus(id: string) {
    try {
      await fetch(`http://localhost:3000/api/incidents/${id}/toggleStatus`, {
        method: 'PATCH',
      });
      const incident = this.incidents.find(inc => inc.id === id);
      if (incident) {
        incident.status = incident.status === 'unreviewed' ? 'reviewed' : 'unreviewed';
        incident.reviewedAt = incident.status === 'reviewed' ? new Date().toISOString() : null;
      }
    } catch (error) {
      console.error('Fehler beim Umschalten des Status:', error);
    }
  }

  async hideIncident(id: string) {
    try {
      await fetch(`http://localhost:3000/api/incidents/${id}/hide`, {
        method: 'PATCH',
      });
      const incident = this.incidents.find(inc => inc.id === id);
      if (incident) {
        incident.hidden = true;
      }
    } catch (error) {
      console.error('Fehler beim Ausblenden des Incidents:', error);
    }
  }

  async unhideIncident(id: string) {
    try {
      await fetch(`http://localhost:3000/api/incidents/${id}/unhide`, {
        method: 'PATCH',
      });
      const incident = this.incidents.find(inc => inc.id === id);
      if (incident) {
        incident.hidden = false;
      }
    } catch (error) {
      console.error('Fehler beim Einblenden des Incidents:', error);
    }
  }

  async updateIncident(id: string, updates: Partial<Incident>) {
    try {
      // Erstellen des Update-Objekts mit allen relevanten Feldern
      const updateData = {
        workAreaId: updates.workAreaId,
        subProcessId: updates.subProcessId,
        title: updates.title,
        description: updates.description,
        originalWorkArea: this.getLoggedInUsername(),
        classification: updates.classification, // Füge classification hinzu
        status: updates.status || 'unreviewed', // Fallback auf 'unreviewed', falls nicht gesetzt
        lastModified: new Date().toISOString(), // Immer auf das aktuelle Datum setzen
      };
  
      const response = await fetch(`http://localhost:3000/api/incidents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
        const incident = this.incidents.find(inc => inc.id === id);
        if (incident) {
          // Updates lokal anwenden
          Object.assign(incident, updateData);
          console.log('Incident erfolgreich aktualisiert:', incident);
        }
      } else {
        console.error('Fehler beim Server-Update:', await response.text());
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Incidents:', error);
    }
  }


  async deleteIncident(id: string) {
    try {
      await fetch(`http://localhost:3000/api/incidents/${id}`, {
        method: 'DELETE',
      });
      const index = this.incidents.findIndex(inc => inc.id === id);
      if (index !== -1) {
        this.incidents.splice(index, 1);
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Incidents:', error);
    }
  }
}

export const mockDb = new MockDatabase();
