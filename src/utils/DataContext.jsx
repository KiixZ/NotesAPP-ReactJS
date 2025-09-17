import React, { createContext, useContext, useState } from 'react';
import { getInitialNotes } from './data';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(getInitialNotes());

  const addNote = (noteData) => {
    const newNote = {
      id: `notes-${+new Date()}`,
      title: noteData.title,
      body: noteData.body,
      archived: false,
      createdAt: new Date().toISOString()
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const archiveNote = (id) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const getActiveNotes = () => notes.filter(note => !note.archived);
  const getArchivedNotes = () => notes.filter(note => note.archived);
  const getNoteById = (id) => notes.find(note => note.id === id);

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      deleteNote,
      archiveNote,
      getActiveNotes,
      getArchivedNotes,
      getNoteById
    }}>
      {children}
    </NotesContext.Provider>
  );
};