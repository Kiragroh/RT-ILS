import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/dashboard';
import AdminLogin from './pages/admin/login';
import HomePage from './pages/home';
import ReportPage from './pages/report';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}