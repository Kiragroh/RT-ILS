import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import { RadioGroup } from '@/components/ui/radio-group';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockDb } from '@/data/mockIncidents';
import { workAreas } from '@/data/workAreas';
import { IncidentClassification } from '@/types/incident';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ReportPage() {
  const navigate = useNavigate();
  const [selectedWorkArea, setSelectedWorkArea] = useState('');
  const [selectedSubProcess, setSelectedSubProcess] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState<IncidentClassification>();
  const [existingTitles, setExistingTitles] = useState<string[]>([]);

  const selectedWorkAreaData = workAreas.find(
    (area) => area.id === Number(selectedWorkArea)
  );

  useEffect(() => {
    if (selectedWorkArea && selectedSubProcess) {
      const titles = mockDb
        .getAllIncidents()
        .filter(
          (incident) =>
            incident.workAreaId === Number(selectedWorkArea) &&
            incident.subProcessId === Number(selectedSubProcess)
        )
        .map((incident) => incident.title);
      setExistingTitles([...new Set(titles)]);
    } else {
      setExistingTitles([]);
    }
  }, [selectedWorkArea, selectedSubProcess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWorkArea || !selectedSubProcess || !title || !classification) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    mockDb.createIncident({
      workAreaId: Number(selectedWorkArea),
      subProcessId: Number(selectedSubProcess),
      title,
      description,
      classification,
      createdAt: new Date().toISOString(),
    });

    toast.success(
      'Vielen Dank für Ihre Meldung. Das Risikoteam wird den Vorfall schnellstmöglich screenen.',
      {
        duration: 5000,
      }
    );

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="mx-auto max-w-3xl">
        <Button
          variant="secondary"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>

        <Card className="animate-fadeIn">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Neuen Vorfall melden
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Arbeitsbereich *"
              value={selectedWorkArea}
              onChange={(e) => {
                setSelectedWorkArea(e.target.value);
                setSelectedSubProcess('');
                setTitle('');
              }}
              required
            >
              <option value="">Bitte wählen...</option>
              {workAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </Select>

            {selectedWorkAreaData && (
              <Select
                label="Teilprozess *"
                value={selectedSubProcess}
                onChange={(e) => {
                  setSelectedSubProcess(e.target.value);
                  setTitle('');
                }}
                required
              >
                <option value="">Bitte wählen...</option>
                {selectedWorkAreaData.subProcesses.map((process) => (
                  <option key={process.id} value={process.id}>
                    {process.name}
                  </option>
                ))}
              </Select>
            )}

            {selectedSubProcess && (
              <div>
                <Combobox
                  label="Kurzbeschreibung *"
                  value={title}
                  onChange={setTitle}
                  options={existingTitles}
                  placeholder="Vorhandene Meldung auswählen oder neue eingeben..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {title.length}/64 Zeichen
                </p>
              </div>
            )}

            <Textarea
              label="Detaillierte Beschreibung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Beschreiben Sie den Vorfall im Detail..."
            />

            <RadioGroup
              label="Klassifizierung *"
              name="classification"
              value={classification}
              onChange={(value) => setClassification(value as IncidentClassification)}
              required
              options={[
                {
                  label: 'Störend',
                  value: 'disturbing',
                  description: 'Ein störendes Ereignis ohne direkte Auswirkung',
                },
                {
                  label: 'Beinahe Ereignis',
                  value: 'nearMiss',
                  description: 'Ein Ereignis, das fast zu einem Vorfall geführt hätte',
                },
                {
                  label: 'Ereignis',
                  value: 'incident',
                  description: 'Ein tatsächlicher Vorfall mit Auswirkungen',
                },
              ]}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">
                Vorfall melden
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}