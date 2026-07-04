import React from 'react';
import './App.css';
import logo from './assets/logo.jpeg'; 
import banner from './assets/banner.jpeg';

function App() {
  return (
    <div className="container">
      <header className="header-emisora">
        <img src={banner} alt="Banner" className="banner-img" />
        <div className="logo-overlay">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <h1>Bienvenidos a la Emisora Colegio Personal</h1>
          <p>La voz de nuestra comunidad educativa.</p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 - Proyecto Emisora Escolar</p>
      </footer>
    </div>
  );
}

export default App;