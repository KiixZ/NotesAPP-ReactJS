import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNotes } from '../utils/Context';
import SearchBar from '../components/SearchBar';
import NoteItem from '../components/NoteItem';

const NotesPage = () => {
  const { getActiveNotes } = useNotes();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const activeNotes = getActiveNotes();
  const filteredNotes = keyword 
    ? activeNotes.filter(note => 
        note.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : activeNotes;

  return (
    <div className="notes-page">
      <div className="search-container">
        <SearchBar placeholder="Cari catatan aktif..." />
      </div>
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteItem key={note.id} note={note} />
          ))
        ) : (
          <div className="empty-message">
            {keyword ? `Tidak ada catatan dengan kata kunci "${keyword}"` : 'Tidak ada catatan'}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;