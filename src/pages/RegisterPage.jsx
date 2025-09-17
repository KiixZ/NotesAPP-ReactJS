import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';

// 1. Import Swal dan CSS-nya
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      // Opsi: Gunakan Swal untuk error juga
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password dan konfirmasi password tidak cocok!',
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Password Lemah',
        text: 'Password minimal harus 6 karakter.',
      });
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      
      // 2. Ganti alert() dengan Swal.fire() untuk notifikasi sukses
      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil!',
        text: 'Akun Anda telah dibuat. Silakan login.',
        // Timer bisa ditambahkan jika ingin pop-up hilang otomatis
        // timer: 2000, 
        // showConfirmButton: false
      }).then(() => {
        // 3. Pindahkan navigasi ke dalam .then()
        navigate('/login');
      });

    } catch (err) {
      // Menampilkan error dari API dengan Swal
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Daftar</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Anda bisa hapus state `error` jika semua notifikasi sudah dihandle Swal */}
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password (min. 6 karakter)"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>

        <p className="auth-link">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;