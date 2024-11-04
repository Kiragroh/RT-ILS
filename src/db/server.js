import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new Database('./database.sqlite');

// API-Endpunkt zum Abrufen aller Incidents
app.get('/api/incidents', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM incidents').all();
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hinzufügen eines neuen Incidents und Befüllen der original* Felder
app.post('/api/incidents', (req, res) => {
  const {
    workAreaId,
    subProcessId,
    title,
    description,
    classification,
    createdAt,
  } = req.body;

  try {
    const statement = db.prepare(`
      INSERT INTO incidents (
        workAreaId, subProcessId, title, description, classification, createdAt, status, originalWorkArea, lastModified, hidden,
        originalTitle, originalDescription, originalClassification, originalWorkAreaId, originalSubProcessId
      ) VALUES (?, ?, ?, ?, ?, ?, 'unreviewed', '', ?, 0, ?, ?, ?, ?, ?)
    `);

    const result = statement.run(
      workAreaId,
      subProcessId,
      title,
      description,
      classification,
      createdAt,
      new Date().toISOString(),
      title,           // originalTitle
      description,     // originalDescription
      classification,  // originalClassification
      workAreaId,      // originalWorkAreaId
      subProcessId     // originalSubProcessId
    );

    const newIncident = {
      id: result.lastInsertRowid,
      workAreaId,
      subProcessId,
      title,
      description,
      classification,
      createdAt,
      status: 'unreviewed',
      originalWorkArea: '',
      lastModified: new Date().toISOString(),
      reviewedAt: null,
      hidden: false,
      originalTitle: title,
      originalDescription: description,
      originalClassification: classification,
      originalWorkAreaId: workAreaId,
      originalSubProcessId: subProcessId,
    };

    res.status(201).json(newIncident);
  } catch (error) {
    console.error('Fehler beim Einfügen des Incidents:', error.message);
    res.status(500).json({ error: 'Fehler beim Hinzufügen des Incidents.' });
  }
});

// Incident-Status umschalten
app.patch('/api/incidents/:id/toggleStatus', (req, res) => {
  const { id } = req.params;
  try {
    const incident = db.prepare('SELECT * FROM incidents WHERE id = ?').get(id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident nicht gefunden.' });
    }

    const newStatus = incident.status === 'unreviewed' ? 'reviewed' : 'unreviewed';
    db.prepare('UPDATE incidents SET status = ?, reviewedAt = ? WHERE id = ?').run(
      newStatus,
      newStatus === 'reviewed' ? new Date().toISOString() : null,
      id
    );

    res.json({ message: 'Status erfolgreich umgeschaltet.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Incident ausblenden
app.patch('/api/incidents/:id/hide', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('UPDATE incidents SET hidden = 1 WHERE id = ?').run(id);
    res.json({ message: 'Incident erfolgreich ausgeblendet.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Incident einblenden
app.patch('/api/incidents/:id/unhide', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('UPDATE incidents SET hidden = 0 WHERE id = ?').run(id);
    res.json({ message: 'Incident erfolgreich eingeblendet.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Incident aktualisieren
// Incident aktualisieren
app.put('/api/incidents/:id', (req, res) => {
    const { id } = req.params;
    const { workAreaId, subProcessId, title, description, classification, status } = req.body;
    const lastModified = new Date().toISOString(); // Setzt lastModified auf aktuellen Zeitpunkt
  
    try {
      // SQL-Abfrage für das Update
      const statement = db.prepare(`
        UPDATE incidents
        SET workAreaId = ?, subProcessId = ?, title = ?, description = ?, classification = ?, status = ?, lastModified = ?
        WHERE id = ?
      `);
  
      // Aktualisieren mit neuen Werten
      const result = statement.run(
        workAreaId,
        subProcessId,
        title,
        description,
        classification,
        status || 'unreviewed', // Standardwert falls `status` nicht vorhanden
        lastModified,
        id
      );
  
      if (result.changes > 0) {
        res.json({ message: 'Incident erfolgreich aktualisiert.' });
      } else {
        res.status(404).json({ error: 'Incident nicht gefunden.' });
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Incidents:', error.message);
      res.status(500).json({ error: 'Fehler beim Aktualisieren des Incidents.' });
    }
  });


// Incident löschen
app.delete('/api/incidents/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM incidents WHERE id = ?').run(id);
    res.json({ message: 'Incident erfolgreich gelöscht.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
