import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { workAreas } from '@/data/workAreas';
import { Incident, IncidentClassification } from '@/types/incident';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditIncidentModalProps {
  incident: Incident;
  onClose: () => void;
  onSave: (incident: Incident) => void;
}

export function EditIncidentModal({ incident, onClose, onSave }: EditIncidentModalProps) {
  const [editedIncident, setEditedIncident] = useState<Incident>(incident);
  const selectedWorkArea = workAreas.find((area) => area.id === editedIncident.workAreaId);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Vorfall bearbeiten</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Arbeitsbereich"
            value={editedIncident.workAreaId.toString()}
            onChange={(e) => {
              setEditedIncident({
                ...editedIncident,
                workAreaId: Number(e.target.value),
                subProcessId: workAreas.find((a) => a.id === Number(e.target.value))
                  ?.subProcesses[0].id || editedIncident.subProcessId,
              });
            }}
          >
            {workAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </Select>

          {selectedWorkArea && (
            <Select
              label="Teilprozess"
              value={editedIncident.subProcessId.toString()}
              onChange={(e) =>
                setEditedIncident({
                  ...editedIncident,
                  subProcessId: Number(e.target.value),
                })
              }
            >
              {selectedWorkArea.subProcesses.map((process) => (
                <option key={process.id} value={process.id}>
                  {process.name}
                </option>
              ))}
            </Select>
          )}

          <Textarea
            label="Kurzbeschreibung"
            value={editedIncident.title}
            onChange={(e) =>
              setEditedIncident({ ...editedIncident, title: e.target.value })
            }
            maxLength={64}
          />

          <Textarea
            label="Detaillierte Beschreibung"
            value={editedIncident.description}
            onChange={(e) =>
              setEditedIncident({ ...editedIncident, description: e.target.value })
            }
            rows={5}
          />

          <Select
            label="Klassifizierung"
            value={editedIncident.classification}
            onChange={(e) =>
              setEditedIncident({
                ...editedIncident,
                classification: e.target.value as IncidentClassification,
              })
            }
          >
            <option value="disturbing">Störend</option>
            <option value="nearMiss">Beinahe Ereignis</option>
            <option value="incident">Ereignis</option>
          </Select>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit">Speichern</Button>
          </div>
        </form>
      </div>
    </div>
  );
}