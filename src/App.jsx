import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotesProvider } from './utils/Context';
import Header from './components/Header';
import NotesPage from './pages/NotesPage';
import ArchivedPage from './pages/ArchivedPage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/App.css';

function App() {
  return (
    <NotesProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<NotesPage />} />
              <Route path="/archived" element={<ArchivedPage />} />
              <Route path="/notes/new" element={<AddNotePage />} />
              <Route path="/notes/:id" element={<NoteDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </NotesProvider>
  );
}

export default App;
