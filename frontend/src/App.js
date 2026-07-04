import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.jpeg'; 
import banner from './assets/banner.jpeg';

function App() {
  // Estados para el Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para los avisos
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:3001/avisos')
        .then(res => setAvisos(res.data))
        .catch(err => console.error("Error al obtener avisos:", err));
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    axios.post('http://localhost:3001/login', { usuario, password })
      .then(res => {
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.error("Error en login:", err));
  };

  // VISTA DE LOGIN
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Iniciar sesión</h2>
          <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
          <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    );
  }

  // VISTA PRINCIPAL (Emisora)
  return (
    <div className="container">
      <header className="header-emisora">
        <img src={banner} alt="Banner" className="banner-img" />
        
        {/* Botón de cerrar sesión */}
        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
          Cerrar Sesión
        </button>

        <div className="logo-overlay">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <h1>Bienvenidos a la Emisora Colegio Personal</h1>
          <p>La voz de nuestra comunidad educativa.</p>
        </section>

        <section className="avisos-section">
          <h2>Avisos de la Emisora</h2>
          <div className="avisos-lista">
            {avisos.length > 0 ? (
              avisos.map(aviso => (
                <div key={aviso.id} className="aviso-card">
                  <h3>{aviso.titulo}</h3>
                  <p>{aviso.descripcion}</p>
                </div>
              ))
            ) : (
              <p>No hay avisos disponibles en este momento.</p>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 - Proyecto Emisora Escolar</p>
      </footer>
    </div>
  );
}

export default App;