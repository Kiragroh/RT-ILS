import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IncidentTable } from '@/components/admin/IncidentTable';
import { mockDb } from '@/data/mockIncidents';
import { Download, Eye, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportToCsv } from '@/lib/export';
import { Incident } from '@/types/incident';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState('all');
  const [showHidden, setShowHidden] = useState(false);

  // Funktion zum Abrufen und Setzen der Incidents
  const refreshIncidents = async () => {
    const updatedIncidents = showHidden ? await mockDb.getAllIncidents() : await mockDb.getIncidents();
    setIncidents(updatedIncidents);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    refreshIncidents();
  }, [showHidden]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/');
  };

  const handleExport = () => {
    exportToCsv(incidents);
  };

  const handleToggleStatus = async (id: string) => {
    await mockDb.toggleIncidentStatus(id);
    refreshIncidents();
  };

  const handleHideIncident = async (id: string) => {
    await mockDb.hideIncident(id);
    refreshIncidents();
  };

  const handleUnhideIncident = async (id: string) => {
    await mockDb.unhideIncident(id);
    refreshIncidents();
  };

  const handleEditIncident = async (incident: Incident) => {
    await mockDb.updateIncident(incident.id, incident);
    refreshIncidents();
  };

  const handleDeleteIncident = async (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Vorfall löschen möchten?')) {
      await mockDb.deleteIncident(id);
      refreshIncidents();
    }
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (filter === 'all') return true;
    if (filter === 'unreviewed') return incident.status === 'unreviewed';
    return incident.classification === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="mx-auto max-w-[95%]">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Vorfallübersicht</h1>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowHidden(!showHidden)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {showHidden ? 'Versteckte ausblenden' : 'Versteckte anzeigen'}
            </Button>
            <Button onClick={handleExport} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            Alle
          </Button>
          <Button
            variant={filter === 'unreviewed' ? 'default' : 'secondary'}
            onClick={() => setFilter('unreviewed')}
          >
            Ungeprüft
          </Button>
          <Button
            variant={filter === 'disturbing' ? 'default' : 'secondary'}
            onClick={() => setFilter('disturbing')}
          >
            Störend
          </Button>
          <Button
            variant={filter === 'nearMiss' ? 'default' : 'secondary'}
            onClick={() => setFilter('nearMiss')}
          >
            Beinahe
          </Button>
          <Button
            variant={filter === 'incident' ? 'default' : 'secondary'}
            onClick={() => setFilter('incident')}
          >
            Ereignis
          </Button>
        </div>

        <Card>
          <IncidentTable
            incidents={filteredIncidents}
            onToggleStatus={handleToggleStatus}
            onHideIncident={handleHideIncident}
            onUnhideIncident={handleUnhideIncident}
            onEditIncident={handleEditIncident}
            onDeleteIncident={handleDeleteIncident}
            showHidden={showHidden}
          />
        </Card>
      </div>
    </div>
  );
}
