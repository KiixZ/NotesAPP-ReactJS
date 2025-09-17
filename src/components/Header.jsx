import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>Aplikasi Catatan</h1>
      <nav className="navigation">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
        >
          Catatan Aktif
        </Link>
        <Link 
          to="/archived" 
          className={location.pathname === '/archived' ? 'nav-link active' : 'nav-link'}
        >
          Arsip
        </Link>
        <Link 
          to="/notes/new" 
          className={location.pathname === '/notes/new' ? 'nav-link active' : 'nav-link'}
        >
          Tambah Catatan
        </Link>
      </nav>
    </header>
  );
};

export default Header;