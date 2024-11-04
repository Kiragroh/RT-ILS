import Database from 'better-sqlite3';

const db = new Database('./database.sqlite');

try {
  console.log('Verbindung zur SQLite-Datenbank hergestellt.');

  // Tabelle für Incidents erstellen
  db.prepare(`CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY,
    workAreaId INTEGER,
    originalWorkAreaId INTEGER,
    subProcessId INTEGER,
    originalSubProcessId INTEGER,
    title TEXT,
    originalTitle TEXT,
    description TEXT,
    originalDescription TEXT,
    classification TEXT,
    originalClassification TEXT,
    createdAt TEXT,
    status TEXT,
    originalWorkArea TEXT,
    lastModified TEXT,
    reviewedAt TEXT,
    hidden INTEGER
  )`).run();
  console.log('Tabelle incidents erstellt oder bereits vorhanden.');

  // Vorhandene Daten in der Tabelle löschen, um Duplikate zu vermeiden
  db.prepare("DELETE FROM incidents").run();

  // Mock-Daten in die Tabelle einfügen
  const mockIncidents = [
    {
      id: 1,
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
      hidden: 0
    },
    {
      id: 2,
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
      hidden: 0
    }
  ];

  const insertIncident = db.prepare(`INSERT INTO incidents (
    id, workAreaId, originalWorkAreaId, subProcessId, originalSubProcessId, title, originalTitle, 
    description, originalDescription, classification, originalClassification, createdAt, 
    status, originalWorkArea, lastModified, reviewedAt, hidden
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  mockIncidents.forEach((incident) => {
    insertIncident.run(
      incident.id,
      incident.workAreaId,
      incident.originalWorkAreaId,
      incident.subProcessId,
      incident.originalSubProcessId,
      incident.title,
      incident.originalTitle,
      incident.description,
      incident.originalDescription,
      incident.classification,
      incident.originalClassification,
      incident.createdAt,
      incident.status,
      incident.originalWorkArea,
      incident.lastModified,
      incident.reviewedAt,
      incident.hidden
    );
  });

  console.log('Mock-Daten in die incidents-Tabelle eingefügt.');
} catch (err) {
  console.error('Fehler beim Zugriff auf die Datenbank:', err.message);
} finally {
  db.close();
  console.log('Datenbankverbindung geschlossen.');
}
