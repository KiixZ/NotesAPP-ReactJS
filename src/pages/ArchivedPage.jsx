import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/api';
import { useTheme } from '../utils/ThemeContext';
import SearchBar from '../components/SearchBar';
import NoteItem from '../components/NoteItem';

const ArchivedPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { texts } = useTheme();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const notesData = await getArchivedNotes();
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching archived notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = keyword 
    ? notes.filter(note => 
        note.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : notes;

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading archived notes...</p>
      </div>
    );
  }

  return (
    <div className="archived-page">
      <div className="search-container">
        <SearchBar placeholder={texts.searchArchived} />
      </div>
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteItem key={note.id} note={note} onUpdate={() => window.location.reload()} />
          ))
        ) : (
          <div className="empty-state">
            <h3>{keyword ? `No archived notes found for "${keyword}"` : texts.noArchived}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivedPage;