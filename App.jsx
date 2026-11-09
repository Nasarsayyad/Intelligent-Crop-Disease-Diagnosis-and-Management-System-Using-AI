import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { LanguageProvider } from './hooks/useLanguage';
import ErrorBoundary from './components/ErrorBoundary';
import MainLayout from './layouts/MainLayout';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DiagnosePage from './pages/DiagnosePage';
import HistoryPage from './pages/HistoryPage';
import CropMonitoringPage from './pages/CropMonitoringPage';
import WeatherPage from './pages/WeatherPage';
import ChatPage from './pages/ChatPage';
import KnowledgePage from './pages/KnowledgePage';
import CalendarPage from './pages/CalendarPage';
import ExpertConsultPage from './pages/ExpertConsultPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="diagnose" element={<DiagnosePage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="monitoring" element={<CropMonitoringPage />} />
                <Route path="weather" element={<WeatherPage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="knowledge" element={<KnowledgePage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="expert" element={<ExpertConsultPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
