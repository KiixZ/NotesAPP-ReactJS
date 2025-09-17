import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../utils/Context';
import { showFormattedDate } from '../utils/data';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById, deleteNote, archiveNote } = useNotes();

  const note = getNoteById(id);

  if (!note) {
    return (
      <div className="note-detail-page">
        <div className="not-found">
          <h2>Catatan tidak ditemukan</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      deleteNote(note.id);
      navigate('/');
    }
  };

  const handleArchive = () => {
    archiveNote(note.id);
    navigate(note.archived ? '/archived' : '/');
  };

  return (
    <div className="note-detail-page">
      <div className="note-detail">
        <h1 className="note-title">{note.title}</h1>
        <p className="note-date">{showFormattedDate(note.createdAt)}</p>
        <div className="note-body">{note.body}</div>
        
        <div className="note-actions">
          <button 
            onClick={handleDelete}
            className="btn btn-delete"
          >
            Hapus
          </button>
          <button 
            onClick={handleArchive}
            className="btn btn-archive"
          >
            {note.archived ? 'Pindahkan' : 'Arsipkan'}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;