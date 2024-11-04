import { Card } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, BookOpen, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [incidentCount, setIncidentCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/incidents'); // Adjust URL as needed
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setIncidentCount(data.data.length); // Assuming API returns an array of incidents in `data.data`
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setIncidentCount(-1); // Use -1 to indicate an error
      }
    };

    fetchIncidents();
  }, []);

  const getIncidentCountText = () => {
    if (incidentCount === null) return 'Lädt...';
    if (incidentCount === -1) return 'Fehler beim Laden der Vorfälle';
    return `Gemeldete Vorfälle: ${incidentCount}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white tracking-wide leading-tight">
            Incident Learning System (ILS)
            <span className="block text-3xl mt-2">für die Strahlentherapie</span>
          </h1>
          <p className="text-xl text-white/90 font-light">
            Eine sichere und moderne Plattform zur Meldung und Analyse von Vorfällen 
            in der Strahlentherapie, entwickelt zur Förderung der Patientensicherheit.
          </p>
        </header>

        {/* Incident Counter Section */}
        <div className="text-center mt-8">
          <p className="text-2xl font-semibold text-white">
            {getIncidentCountText()}
          </p>
        </div>

        {/* Navigation and Recommendations Sections */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <NavigationCard
            to="/report"
            icon={AlertTriangle}
            title="Neuer Vorfall"
            description="Melden Sie einen neuen Vorfall oder ein Beinahe-Ereignis"
            colorClass="bg-indigo-100 group-hover:bg-indigo-200"
          />
          <NavigationCard
            to="/admin"
            icon={ShieldCheck}
            title="Adminbereich"
            description="Verwalten und analysieren Sie gemeldete Vorfälle"
            colorClass="bg-purple-100 group-hover:bg-purple-200"
          />
        </div>

        <RecommendationsList recommendations={recommendations} />
      </div>
    </div>
  );
};

// Utility components and recommendations list
const NavigationCard = ({ to, icon: Icon, title, description, colorClass }) => (
  <Link to={to}>
    <Card className={`group flex h-64 flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/95 backdrop-blur-sm`}>
      <div className={`rounded-full ${colorClass} p-4 transition-colors`}>
        <Icon className="h-12 w-12 text-gray-700" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Card>
  </Link>
);

const RecommendationsList = ({ recommendations }) => (
  <div className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-5">
    <div className="flex items-center gap-3 mb-3">
      <BookOpen className="h-5 w-5 text-gray-700" />
      <h3 className="text-lg font-semibold text-gray-800">
        Empfehlungen bzgl. abteilungsinterner ILS in der Strahlentherapie
      </h3>
    </div>
    <ul className="space-y-1.5 text-sm">
      {recommendations.map((rec, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-indigo-500 mt-0.5">•</span>
          <span className="text-gray-700">{rec}</span>
        </li>
      ))}
    </ul>
  </div>
);

const recommendations = [
  'Deutsche Gesellschaft für Medizinische Physik (DGMP), Berichte 25 und 28',
  'World Health Organization (WHO), "Radiotherapy Risk Profile"',
  'Internationale Strahlenschutzkommission (ICRP) – Bericht Nr. 112',
  'American Society for Radiation Oncology (ASTRO), "Safety is no accident"',
  'Europäische Kommission (EC), ACCIRAD-Projekt',
];
