import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import { useTheme } from '../utils/ThemeContext';
import { showFormattedDate } from '../utils/data';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { texts } = useTheme();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const noteData = await getNote(id);
        setNote(noteData);
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(note.id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
      }
    }
  };

  const handleArchive = async () => {
    try {
      if (note.archived) {
        await unarchiveNote(note.id);
      } else {
        await archiveNote(note.id);
      }
      navigate(note.archived ? '/' : '/archived');
    } catch (error) {
      console.error('Error archiving note:', error);
      alert('Failed to archive note. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="note-detail-page">
        <div className="not-found">
          <h2>Note not found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            {texts.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="note-detail-page">
      <div className="note-detail">
        <h1 className="note-detail-title">{note.title}</h1>
        <p className="note-detail-date">{showFormattedDate(note.createdAt)}</p>
        <div className="note-detail-body">{note.body}</div>
        
        <div className="note-detail-actions">
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
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            {texts.back}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;