import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Halaman Tidak Ditemukan</h2>
        <p>Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
        <Link to="/" className="btn btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;