// Header.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useTheme } from '../utils/ThemeContext';
import { MdLightMode, MdNightlight, MdLogout } from "react-icons/md";

// 1. Import Swal dan CSS-nya
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Header = () => {
  const { authUser, logout } = useAuth();
  const { theme, language, toggleTheme, toggleLanguage, texts } = useTheme();
  const location = useLocation();

  // 2. Modifikasi fungsi handleLogout
  const handleLogout = () => {
    Swal.fire({
      title: language === 'id' ? 'Yakin ingin keluar?' : 'Are you sure?',
      text: language === 'id' ? 'Anda akan dikembalikan ke halaman login.' : 'You will be returned to the login page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: language === 'id' ? 'Ya, keluar!' : 'Yes, logout!',
      cancelButtonText: language === 'id' ? 'Batal' : 'Cancel'
    }).then((result) => {
      // Jika pengguna menekan tombol "Ya, keluar!"
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  if (!authUser) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1>{texts.appTitle}</h1>
        
        <nav className="navigation">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            {texts.notes}
          </Link>
          <Link 
            to="/archived" 
            className={`nav-link ${location.pathname === '/archived' ? 'active' : ''}`}
          >
            {texts.archived}
          </Link>
          <Link 
            to="/notes/new" 
            className={`nav-link ${location.pathname === '/notes/new' ? 'active' : ''}`}
          >
            {texts.addNote}
          </Link>
        </nav>

        <div className="header-controls">
          <button 
            onClick={toggleTheme} 
            className="control-btn"
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? <MdNightlight /> : <MdLightMode />}
          </button>
          
          <button 
            onClick={toggleLanguage} 
            className="control-btn"
            title={language === 'id' ? 'English' : 'Bahasa Indonesia'}
          >
            {language === 'id' ? 'EN' : 'ID'}
          </button>
          
          <span className="user-name">Hi, {authUser.name}</span>
          
          <button 
            onClick={handleLogout} 
            className="btn btn-logout"
          >
            {texts.logout} <MdLogout />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;