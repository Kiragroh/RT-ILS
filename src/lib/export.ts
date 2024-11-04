import { workAreas } from '@/data/workAreas';
import { Incident } from '@/types/incident';
import { formatDateTime } from './utils';

function escapeCsvField(field: string | undefined | null): string {
  if (!field) return '';
  return field.replace(/;/g, '^');
}

export function exportToCsv(incidents: Incident[]): void {
  const headers = [
    'ID',
    'Arbeitsbereich',
    'Original Arbeitsbereich',
    'Teilprozess',
    'Original Teilprozess',
    'Titel',
    'Original Titel',
    'Beschreibung',
    'Original Beschreibung',
    'Klassifizierung',
    'Original Klassifizierung',
    'Status',
    'Erstellt am',
    'Letzte Änderung',
    'Geprüft am',
    'LastAdmin'
  ];

  const rows = incidents.map(incident => {
    const workArea = workAreas.find(a => a.id === incident.workAreaId);
    const subProcess = workArea?.subProcesses.find(s => s.id === incident.subProcessId);
    const originalWorkArea = workAreas.find(a => a.id === incident.originalWorkAreaId);
    const originalSubProcess = originalWorkArea?.subProcesses.find(s => s.id === incident.originalSubProcessId);

    return [
      incident.id,
      escapeCsvField(workArea?.name),
      escapeCsvField(originalWorkArea?.name),
      escapeCsvField(subProcess?.name),
      escapeCsvField(originalSubProcess?.name),
      escapeCsvField(incident.title),
      escapeCsvField(incident.originalTitle),
      escapeCsvField(incident.description),
      escapeCsvField(incident.originalDescription),
      escapeCsvField(incident.classification),
      escapeCsvField(incident.originalClassification),
      incident.status,
      formatDateTime(incident.createdAt),
      formatDateTime(incident.lastModified),
      incident.reviewedAt ? formatDateTime(incident.reviewedAt) : '',
      incident.originalWorkArea ? incident.originalWorkArea : ''
    ];
  });

  const csv = [headers, ...rows]
    .map(row => row.join(';'))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `vorfaelle_${formatDateTime(new Date().toISOString())}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
