import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import { ThemeProvider } from './utils/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import ArchivedPage from './pages/ArchivedPage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <NotesPage />
                  </ProtectedRoute>
                } />
                <Route path="/archived" element={
                  <ProtectedRoute>
                    <ArchivedPage />
                  </ProtectedRoute>
                } />
                <Route path="/notes/new" element={
                  <ProtectedRoute>
                    <AddNotePage />
                  </ProtectedRoute>
                } />
                <Route path="/notes/:id" element={
                  <ProtectedRoute>
                    <NoteDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
