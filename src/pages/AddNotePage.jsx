import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/api';
import { useTheme } from '../utils/ThemeContext';

const AddNotePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { texts } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() && body.trim()) {
      setIsLoading(true);
      try {
        await addNote({ title: title.trim(), body: body.trim() });
        navigate('/');
      } catch (error) {
        console.error('Error adding note:', error);
        alert('Failed to add note. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const titleLeft = 50 - title.length;
  
  const getCharLimitClass = () => {
    if (titleLeft <= 5) return 'char-limit danger';
    if (titleLeft <= 15) return 'char-limit warning';
    return 'char-limit';
  };

  return (
    <div className="add-note-page">
      <h2>{texts.addNewNote}</h2>
      
      <form onSubmit={handleSubmit} className="add-note-form">
        <div className="form-group">
          <label htmlFor="title">{texts.title}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            maxLength={50}
            required
            disabled={isLoading}
          />
          <p className={getCharLimitClass()}>Characters remaining: {titleLeft}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="body">{texts.content}</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter note content..."
            rows={10}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : texts.save}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            {texts.cancel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotePage;