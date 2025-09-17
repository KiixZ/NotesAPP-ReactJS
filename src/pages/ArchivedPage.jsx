import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNotes } from '../utils/Context';
import SearchBar from '../components/SearchBar';
import NoteItem from '../components/NoteItem';

const ArchivedPage = () => {
  const { getArchivedNotes } = useNotes();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const archivedNotes = getArchivedNotes();
  const filteredNotes = keyword 
    ? archivedNotes.filter(note => 
        note.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : archivedNotes;

  return (
    <div className="archived-page">
      <SearchBar placeholder="Cari catatan arsip..." />
      
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <NoteItem key={note.id} note={note} />
          ))
        ) : (
          <div className="empty-message">
            {keyword ? `Tidak ada catatan arsip dengan kata kunci "${keyword}"` : 'Arsip kosong'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivedPage;