import { WorkArea } from '@/types/incident';

export const workAreas: WorkArea[] = [
  {
    id: 1,
    name: '1. Anmeldung',
    subProcesses: [
      { id: 100, name: 'Keine Angabe' },
      { id: 101, name: 'Zuweisung zur Strahlentherapie' },
      { id: 102, name: 'Patienteneintrag in das Krankenhaus-Informations-System' },
      { id: 103, name: 'Patienteneintrag in das Onkologie-Informations-System' },
      { id: 104, name: 'Festlegung der Patienten-ID' },
      { id: 105, name: 'Anforderung von Vorbefunden' }
    ],
  },
  {
    id: 2,
    name: '2. Patientengespräch und Untersuchung',
    subProcesses: [
      { id: 200, name: 'Keine Angabe' },
      { id: 201, name: 'Verifikation der Patientenidentität' },
      { id: 202, name: 'Befundaufnahme mittels Bildgebung und externer Berichterstattung' },
      { id: 203, name: 'Überprüfung und Verifikation des Pathologieberichts' },
      { id: 204, name: 'Körperliche Untersuchung' },
      { id: 205, name: 'Bestimmung des Tumorstadiums' },
      { id: 206, name: 'Beurteilung des Gesundheitszustands und Geschäftsfähigkeit' },
      { id: 207, name: 'Beurteilung besonderer Anforderungen an die Strahlentherapie' },
      { id: 208, name: 'Beurteilung von Vorbestrahlungen' },
      { id: 209, name: 'Anforderung weiterer Diagnostik oder Bildgebung' },
      { id: 210, name: 'Beurteilung anderer Behandlungsoptionen' },
      { id: 211, name: 'Behandlungsentscheidung und rechtfertigende Indikation' },
      { id: 212, name: 'Ärztliche Festlegung des Behandlungskonzepts' },
      { id: 213, name: 'Aufklärungsgespräch (Therapie und Supportivmaßnahmen)' },
      { id: 214, name: 'Einverständniserklärung' },
      { id: 215, name: 'Interdisziplinäre Behandlungsentscheidung (Tumorboard)' },
      { id: 216, name: 'Terminierung der Bestrahlungsplanung und Kommunikation' }
    ],
  },
  {
    id: 3,
    name: '3. Simulation und Bildgebung',
    subProcesses: [
      { id: 300, name: 'Keine Angabe' },
      { id: 301, name: 'Verifikation der Patientenidentität' },
      { id: 302, name: 'Ärztliche Vorgabe an die Bildgebung und Immobilisierung' },
      { id: 303, name: 'Patientenpositionierung und -immobilisierung' },
      { id: 304, name: 'Dokumentation der Positionierung und Lagerungshilfen' },
      { id: 305, name: 'Kontrastmittelgabe' },
      { id: 306, name: 'Aufnahme des Planungs-CTs' },
      { id: 307, name: 'Markierung von Referenzpunkten auf Patient/Lagerungshilfe' },
      { id: 308, name: 'Aufnahme weiterer Bildgebungsserien (MRT, Ultraschall, PET)' },
      { id: 309, name: 'Export der Bildgebung an das Bestrahlungsplanungssystem' },
      { id: 310, name: 'Export der Bildgebung an Archivierungssysteme' }
    ],
  },
  {
    id: 4,
    name: '4. Bestrahlungsplanung',
    subProcesses: [
      { id: 400, name: 'Keine Angabe' },
      { id: 401, name: 'Auswahl und Import der Bildgebung' },
      { id: 402, name: 'Registrierung/Fusion der Bilder' },
      { id: 403, name: 'Definition und Konturierung des/der Zielvolumens/-volumina' },
      { id: 404, name: 'Definition und Konturierung der Risikoorgane' },
      { id: 405, name: 'Übernahme der Verordnung, Zielvorgaben und Planungstechnik und IGRT-Vorgabe' },
      { id: 406, name: 'Festlegung des Isozentrums' },
      { id: 407, name: 'Anlegen des initialen Bestrahlungsplans' },
      { id: 408, name: 'Berechnung und Optimierung der Dosisverteilung' },
      { id: 409, name: 'Vorläufige Beurteilung des Bestrahlungsplans, ggf. Optimierung' },
      { id: 410, name: 'Vorbereitende Arbeiten für IGRT und SGRT' },
      { id: 411, name: 'Vorbereitende Arbeiten für Bewegungsmanagement' },
      { id: 412, name: 'Ärztliche und physikalisch-technische Plandurchsicht und Freigabe' },
      { id: 413, name: 'Planübertragung an das R&V-System' },
      { id: 414, name: 'Terminierung der Fraktion(en)' },
      { id: 415, name: 'Archivierung des Behandlungsplans (DICOM)' }
    ],
  },
  {
    id: 5,
    name: '5. Überprüfung und Verifikation vor Behandlungsbeginn',
    subProcesses: [
      { id: 500, name: 'Keine Angabe' },
      { id: 501, name: 'Physikalisch-technische Überprüfung des Bestrahlungsplans' },
      { id: 502, name: 'Unabhängige Dosis-Nachberechnung' },
      { id: 503, name: 'Übertragung der Planinformation an den Beschleuniger' },
      { id: 504, name: 'Patientenspezifische Verifikationsmessung' },
      { id: 505, name: 'Physikalisch-technische Bestrahlungsfreigabe' },
      { id: 506, name: 'Finale ärztliche Bestrahlungsfreigabe' }
    ],
  },
  {
    id: 6,
    name: '6. Ersteinstellung',
    subProcesses: [
      { id: 600, name: 'Keine Angabe' },
      { id: 601, name: 'Verifikation der Patientenidentität' },
      { id: 602, name: 'Team-Time-Out' },
      { id: 603, name: 'Behandlungsvorbereitung' },
      { id: 604, name: 'Auswahl der Bestrahlungsserie' },
      { id: 605, name: 'Aufrufen des Bestrahlungsplans am Beschleuniger' },
      { id: 606, name: 'Prüfung physikalischer Parameter' },
      { id: 607, name: 'Patientenpositionierung und -immobilisierung' },
      { id: 608, name: 'Einstellung von Behandlungszubehör' },
      { id: 609, name: 'Validierung von Behandlungszubehör' },
      { id: 610, name: 'Anwendung des Bewegungsmanagements & Triggerfunktion' },
      { id: 611, name: 'Bildgestützte Verifikation der Positionierung' },
      { id: 612, name: 'Auswahl des Bestrahlungsfeldes' },
      { id: 613, name: 'Freigabe der Patientenpositionierung' },
      { id: 614, name: 'Markierung des Isozentrums' },
      { id: 615, name: 'In vivo Dosimetrie' },
      { id: 616, name: 'Bestrahlung' },
      { id: 617, name: 'Monitoring der Bestrahlung' },
      { id: 618, name: 'Protokollierung der Bestrahlung' },
      { id: 619, name: 'Monitoring spezieller Anforderungen' }
    ],
  },
  {
    id: 7,
    name: '7. Folgebestrahlungen',
    subProcesses: [
      { id: 700, name: 'Keine Angabe' },
      { id: 701, name: 'Verifikation der Patientenidentität' },
      { id: 702, name: 'Behandlungsvorbereitung' },
      { id: 703, name: 'Auswahl der Bestrahlungsserie' },
      { id: 704, name: 'Aufrufen des Bestrahlungsplans am Beschleuniger' },
      { id: 705, name: 'Patientenpositionierung und -immobilisierung' },
      { id: 706, name: 'Einstellung von Behandlungszubehör' },
      { id: 707, name: 'Validierung von Behandlungszubehör' },
      { id: 708, name: 'Anwendung des Bewegungsmanagements & Triggerfunktion' },
      { id: 709, name: 'Bildgestützte Verifikation der Positionierung' },
      { id: 710, name: 'Auswahl des Bestrahlungsfeldes' },
      { id: 711, name: 'In vivo Dosimetrie' },
      { id: 712, name: 'Bestrahlung' },
      { id: 713, name: 'Monitoring der Bestrahlung' },
      { id: 714, name: 'Protokollierung der Bestrahlung' },
      { id: 715, name: 'Monitoring spezieller Anforderungen' }
    ],
  },
  {
    id: 8,
    name: '8. Qualitätsmanagement während der Behandlung',
    subProcesses: [
      { id: 800, name: 'Keine Angabe' },
      { id: 801, name: 'Physikalisch-technische Überprüfung der Ersteinstellung' },
      { id: 802, name: 'Ärztliche retrospektive Überprüfung der Portalaufnahmen oder des Cone-Beam-CTs' },
      { id: 803, name: 'Adaptive Bestrahlungsplanung' },
      { id: 804, name: 'Wöchentliche Überprüfung der Patientenakte' },
      { id: 805, name: 'Wöchentliche ärztliche Visite, Fürsorge, Ernährung und Pflege' },
      { id: 806, name: 'Regelmäßige Qualitätssicherung des strahlentherapeutischen Gesamtsystems' }
    ],
  },
  {
    id: 9,
    name: '9. Therapieabschluss',
    subProcesses: [
      { id: 900, name: 'Keine Angabe' },
      { id: 901, name: 'Verifikation der Patientenidentität' },
      { id: 902, name: 'Abschließende Überprüfung der Fraktionsaufzeichnungen' },
      { id: 903, name: 'Therapieabschlussgespräch mit Patient:in' },
      { id: 904, name: 'Abschlussbrief für die ärztliche Weiterbehandlung' },
      { id: 905, name: 'Nachuntersuchung: Bildgebung zur Beurteilung des Behandlungserfolgs' },
      { id: 906, name: 'Nachuntersuchung: Laboranalysen' },
      { id: 907, name: 'Nachsorge und Festlegung von Folgemaßnahmen' },
      { id: 908, name: 'Abrechnung' },
      { id: 909, name: 'Archivierung der Patientendaten' }
    ],
  },
];