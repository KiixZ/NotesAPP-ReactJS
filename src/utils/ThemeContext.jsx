import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'id' ? 'en' : 'id');
  };

  const texts = {
    id: {
      appTitle: 'Aplikasi Catatan',
      notes: 'Catatan',
      archived: 'Arsip',
      addNote: 'Tambah',
      search: 'Cari catatan...',
      searchActive: 'Cari catatan aktif...',
      searchArchived: 'Cari catatan arsip...',
      noNotes: 'Tidak ada catatan',
      noArchived: 'Arsip kosong',
      addNewNote: 'Tambah Catatan Baru',
      title: 'Judul',
      content: 'Isi Catatan',
      save: 'Simpan',
      cancel: 'Batal',
      delete: 'Hapus',
      archive: 'Arsipkan',
      unarchive: 'Pindahkan',
      back: 'Kembali',
      login: 'Masuk',
      register: 'Daftar',
      logout: 'Keluar',
      name: 'Nama',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Konfirmasi Password',
      alreadyHaveAccount: 'Sudah punya akun?',
      dontHaveAccount: 'Belum punya akun?',
      loginHere: 'Masuk di sini',
      registerHere: 'Daftar di sini'
    },
    en: {
      appTitle: 'Notes App',
      notes: 'Notes',
      archived: 'Archived',
      addNote: 'Add',
      search: 'Search notes...',
      searchActive: 'Search active notes...',
      searchArchived: 'Search archived notes...',
      noNotes: 'No notes',
      noArchived: 'Archive is empty',
      addNewNote: 'Add New Note',
      title: 'Title',
      content: 'Content',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      archive: 'Archive',
      unarchive: 'Unarchive',
      back: 'Back',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      loginHere: 'Login here',
      registerHere: 'Register here'
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      language,
      toggleTheme,
      toggleLanguage,
      texts: texts[language]
    }}>
      {children}
    </ThemeContext.Provider>
  );
};