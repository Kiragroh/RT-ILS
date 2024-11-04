import { Button } from '@/components/ui/button';
import { workAreas } from '@/data/workAreas';
import { Incident } from '@/types/incident';
import { ArrowDownIcon, ArrowUpIcon, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { formatDateTime } from '@/lib/utils';
import { EditIncidentModal } from './EditIncidentModal';
import { ViewIncidentModal } from './ViewIncidentModal';

interface IncidentTableProps {
  incidents: Incident[];
  onToggleStatus: (id: string) => void;
  onHideIncident: (id: string) => void;
  onUnhideIncident: (id: string) => void;
  onEditIncident: (incident: Incident) => void;
  onDeleteIncident: (id: string) => void;
  showHidden: boolean;
}

type SortConfig = {
  key: keyof Incident | 'workArea' | 'subProcess';
  direction: 'asc' | 'desc';
} | null;

export function IncidentTable({ 
  incidents, 
  onToggleStatus, 
  onHideIncident,
  onUnhideIncident,
  onEditIncident,
  onDeleteIncident,
  //showHidden
}: IncidentTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [viewingIncident, setViewingIncident] = useState<Incident | null>(null);

  const sortedIncidents = [...incidents].sort((a, b) => {
    if (!sortConfig) return 0;

    let aValue: any;
    let bValue: any;

    if (sortConfig.key === 'workArea') {
      aValue = workAreas.find(area => area.id === a.workAreaId)?.name || '';
      bValue = workAreas.find(area => area.id === b.workAreaId)?.name || '';
    } else if (sortConfig.key === 'subProcess') {
      const aArea = workAreas.find(area => area.id === a.workAreaId);
      const bArea = workAreas.find(area => area.id === b.workAreaId);
      aValue = aArea?.subProcesses.find(sp => sp.id === a.subProcessId)?.name || '';
      bValue = bArea?.subProcesses.find(sp => sp.id === b.subProcessId)?.name || '';
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof Incident | 'workArea' | 'subProcess') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Incident | 'workArea' | 'subProcess') => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUpIcon className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDownIcon className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Aktionen
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('id')}
            >
              <div className="flex items-center">
                ID
                {getSortIcon('id')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('workArea')}
            >
              <div className="flex items-center">
                Arbeitsbereich
                {getSortIcon('workArea')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('subProcess')}
            >
              <div className="flex items-center">
                Teilprozess
                {getSortIcon('subProcess')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('title')}
            >
              <div className="flex items-center">
                Titel
                {getSortIcon('title')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('classification')}
            >
              <div className="flex items-center">
                Klassifizierung
                {getSortIcon('classification')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('status')}
            >
              <div className="flex items-center">
                Status
                {getSortIcon('status')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('createdAt')}
            >
              <div className="flex items-center">
                Erstellt
                {getSortIcon('createdAt')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('lastModified')}
            >
              <div className="flex items-center">
                Letzte Änderung
                {getSortIcon('lastModified')}
              </div>
            </th>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => requestSort('reviewedAt')}
            >
              <div className="flex items-center">
                Geprüft am
                {getSortIcon('reviewedAt')}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Weitere Aktionen
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedIncidents.map((incident) => {
            const workArea = workAreas.find((a) => a.id === incident.workAreaId);
            const subProcess = workArea?.subProcesses.find((s) => s.id === incident.subProcessId);
            
            return (
              <tr 
                key={incident.id} 
                className={`hover:bg-gray-50 ${incident.hidden ? 'bg-gray-100' : ''}`}
              >
                <td className="w-[15%] px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewingIncident(incident)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleStatus(incident.id)}
                    >
                      {incident.status === 'unreviewed' ? 'Als geprüft markieren' : 'Als ungeprüft markieren'}
                    </Button>
                  </div>
                </td>
                <td className={`whitespace-nowrap px-6 py-4 ${incident.hidden ? 'text-gray-400' : ''}`}>
                  {incident.id}
                </td>
                <td className={`w-[15%] px-6 py-4 ${incident.hidden ? 'text-gray-400' : ''}`}>
                  {workArea?.name}
                </td>
                <td className={`w-[15%] px-6 py-4 ${incident.hidden ? 'text-gray-400' : ''}`}>
                  {subProcess?.name}
                </td>
                <td className={`w-[15%] px-6 py-4 ${incident.hidden ? 'text-gray-400' : ''}`}>
                  {incident.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      incident.classification === 'disturbing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : incident.classification === 'nearMiss'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    } ${incident.hidden ? 'opacity-50' : ''}`}
                  >
                    {incident.classification === 'disturbing'
                      ? 'Störend'
                      : incident.classification === 'nearMiss'
                      ? 'Beinahe'
                      : 'Ereignis'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      incident.status === 'unreviewed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    } ${incident.hidden ? 'opacity-50' : ''}`}
                  >
                    {incident.status === 'unreviewed' ? 'Ungeprüft' : 'Geprüft'}
                  </span>
                </td>
                <td className={`whitespace-nowrap px-6 py-4 ${incident.hidden ? 'text-gray-400' : ''}`}>
                  {formatDateTime(incident.createdAt)}
                </td>
                <td className={`whitespace-nowrap px-6 py-4 ${incident.hidden ? 'text-gray-400' : ''}`}>
                  {formatDateTime(incident.lastModified)}
                </td>
                <td className={`whitespace-nowrap px-6 py-4 ${incident.hidden ? 'text-gray-400' : ''}`}>
                  {incident.reviewedAt ? formatDateTime(incident.reviewedAt) : '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingIncident(incident)}
                  title="Edit Incident"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => incident.hidden ? onUnhideIncident(incident.id) : onHideIncident(incident.id)}
                  title={incident.hidden ? "Unhide Incident" : "Hide Incident"}
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteIncident(incident.id)}
                  title="Delete Incident"
                >
                  <Trash2 className="h-4 w-8" />
                </Button>
              </div>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingIncident && (
        <EditIncidentModal
          incident={editingIncident}
          onClose={() => setEditingIncident(null)}
          onSave={(updatedIncident) => {
            onEditIncident(updatedIncident);
            setEditingIncident(null);
          }}
        />
      )}

      {viewingIncident && (
        <ViewIncidentModal
          incident={viewingIncident}
          onClose={() => setViewingIncident(null)}
        />
      )}
    </div>
  );
}