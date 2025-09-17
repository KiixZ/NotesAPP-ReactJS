import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../utils/Context';

const AddNotePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { addNote } = useNotes();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim() && body.trim()) {
      addNote({ title: title.trim(), body: body.trim() });
      navigate('/');
    }
  };

  const titleLeft = 50 - title.length;
  
  // Determine character limit class
  const getCharLimitClass = () => {
    if (titleLeft <= 5) return 'char-limit danger';
    if (titleLeft <= 15) return 'char-limit warning';
    return 'char-limit';
  };

  return (
    <div className="add-note-page">
      <h2>Tambah Catatan Baru</h2>
      
      <form onSubmit={handleSubmit} className="add-note-form">
        <div className="form-group">
          <label htmlFor="title">Judul</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul catatan..."
            maxLength={50}
            required
          />
          <p className={getCharLimitClass()}>Sisa karakter: {titleLeft}</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="body">Isi Catatan</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Masukkan isi catatan..."
            rows={10}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotePage;