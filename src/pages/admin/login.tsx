import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  // Lade die Benutzeranmeldedaten aus der settings.json
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('/settings.json');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error loading user settings:', err);
      }
    }
    loadUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('loggedInUser', username); // Save the username
      navigate('/admin/dashboard');
    } else {
      setError('Ungültige Anmeldedaten');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="mx-auto max-w-md">
        <Button
          variant="secondary"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zum Startbildschirm
        </Button>

        <Card className="animate-fadeIn p-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Admin Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Benutzername
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Anmelden
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
