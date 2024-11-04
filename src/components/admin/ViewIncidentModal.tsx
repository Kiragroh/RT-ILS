import { Button } from '@/components/ui/button';
import { workAreas } from '@/data/workAreas';
import { Incident } from '@/types/incident';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { formatDateTime } from '@/lib/utils';

interface ViewIncidentModalProps {
  incident: Incident;
  onClose: () => void;
}

export function ViewIncidentModal({ incident, onClose }: ViewIncidentModalProps) {
  const workArea = workAreas.find((a) => a.id === incident.workAreaId);
  const subProcess = workArea?.subProcesses.find((s) => s.id === incident.subProcessId);

  const originalWorkArea = workAreas.find((a) => a.id === incident.originalWorkAreaId);
  const originalSubProcess = originalWorkArea?.subProcesses.find((s) => s.id === incident.originalSubProcessId);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Vorfall #{incident.id}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Arbeitsbereich</h3>
            <p>{workArea?.name}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Teilprozess</h3>
            <p>{subProcess?.name}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Kurzbeschreibung</h3>
            <p>{incident.title}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Detaillierte Beschreibung</h3>
            <p className="whitespace-pre-wrap">{incident.description}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Klassifizierung</h3>
            <span
              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                incident.classification === 'disturbing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : incident.classification === 'nearMiss'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {incident.classification === 'disturbing'
                ? 'Störend'
                : incident.classification === 'nearMiss'
                ? 'Beinahe'
                : 'Ereignis'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700">Erstellt am</h3>
              <p>{formatDateTime(incident.createdAt)}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Letzte Änderung</h3>
              <p>{formatDateTime(incident.lastModified)}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Status</h3>
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  incident.status === 'unreviewed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {incident.status === 'unreviewed' ? 'Ungeprüft' : 'Geprüft'}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Geprüft am</h3>
              <p>{incident.reviewedAt ? formatDateTime(incident.reviewedAt) : '-'}</p>
            </div>
          </div>

          {(incident.title !== incident.originalTitle ||
            incident.workAreaId !== incident.originalWorkAreaId ||
            incident.subProcessId !== incident.originalSubProcessId ||
            incident.classification !== incident.originalClassification ||
            incident.description !== incident.originalDescription) && (
            <div className="mt-6 border-t pt-4">
              <h3 className="mb-3 font-medium text-gray-700">Ursprüngliche Meldung</h3>
              <div className="space-y-4">
                {incident.workAreaId !== incident.originalWorkAreaId && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Original Arbeitsbereich</h4>
                    <p>{originalWorkArea?.name}</p>
                  </div>
                )}
                {incident.subProcessId !== incident.originalSubProcessId && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Original Arbeitsbereich</h4>
                    <p>{originalSubProcess?.name}</p>
                  </div>
                )}
                {incident.title !== incident.originalTitle && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Original Titel</h4>
                    <p>{incident.originalTitle}</p>
                  </div>
                )}
                {incident.description !== incident.originalDescription && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Original Beschreibung</h4>
                    <p className="whitespace-pre-wrap">{incident.originalDescription}</p>
                  </div>
                )}
                {incident.classification !== incident.originalClassification && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Original Klassifizierung</h4>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        incident.originalClassification === 'disturbing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : incident.originalClassification === 'nearMiss'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {incident.originalClassification === 'disturbing'
                        ? 'Störend'
                        : incident.originalClassification === 'nearMiss'
                        ? 'Beinahe'
                        : 'Ereignis'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Schließen</Button>
        </div>
      </div>
    </div>
  );
}