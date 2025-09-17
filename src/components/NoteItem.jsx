import React from 'react';
import { Link } from 'react-router-dom';
import { deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import { useTheme } from '../utils/ThemeContext';
import { showFormattedDate } from '../utils/data';

const NoteItem = ({ note, onUpdate }) => {
  const { texts } = useTheme();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(note.id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
      }
    }
  };

  const handleArchive = async (e) => {
    e.preventDefault();
    try {
      if (note.archived) {
        await unarchiveNote(note.id);
      } else {
        await archiveNote(note.id);
      }
      onUpdate();
    } catch (error) {
      console.error('Error archiving note:', error);
      alert('Failed to archive note. Please try again.');
    }
  };

  return (
    <div className="note-item">
      <Link to={`/notes/${note.id}`} className="note-title">
        {note.title}
      </Link>
      <p className="note-body">{note.body}</p>
      <p className="note-date">{showFormattedDate(note.createdAt)}</p>
      <div className="note-actions">
        <button 
          onClick={handleDelete}
          className="btn btn-danger"
        >
          {texts.delete}
        </button>
        <button 
          onClick={handleArchive}
          className="btn btn-secondary"
        >
          {note.archived ? texts.unarchive : texts.archive}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;