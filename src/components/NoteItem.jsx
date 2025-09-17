import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../utils/Context';
import { showFormattedDate } from '../utils/data';

const NoteItem = ({ note }) => {
  const { deleteNote, archiveNote } = useNotes();

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      deleteNote(note.id);
    }
  };

  const handleArchive = (e) => {
    e.preventDefault();
    archiveNote(note.id);
  };

  return (
    <div className="note-item">
      <Link to={`/notes/${note.id}`} className="note-link">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-date">{showFormattedDate(note.createdAt)}</p>
        <p className="note-body">{note.body}</p>
      </Link>
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
      </div>
    </div>
  );
};

export default NoteItem;