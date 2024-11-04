import Database from 'better-sqlite3';

const db = new Database('./database.sqlite');

function loadIncidents() {
  try {
    const rows = db.prepare(`SELECT * FROM incidents`).all();
    console.log("Empfangene Daten:", rows);
  } catch (err) {
    console.error('Fehler beim Laden der Incidents aus der Datenbank:', err.message);
  } finally {
    db.close();
    console.log('Datenbankverbindung geschlossen.');
  }
}

// Funktion aufrufen, um die Daten zu laden
loadIncidents();
