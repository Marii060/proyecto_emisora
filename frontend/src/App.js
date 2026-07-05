import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.jpeg'; 
import banner from './assets/banner.jpeg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [avisos, setAvisos] = useState([]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState('Aviso');
  const [mensaje, setMensaje] = useState('');

  const radioUrl = "https://www.youtube.com/embed/B57kJ5zTxHQ?si=YLYYeH1wgkyN3CeG"; 

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:3001/avisos').then(res => setAvisos(res.data)).catch(err => console.error(err));
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    axios.post('http://localhost:3001/login', { usuario, password })
      .then(res => {
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          setMensaje(res.data.message);
        }
      })
      .catch(err => console.error("Error en login:", err));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const agregarNoticia = () => {
    axios.post('http://localhost:3001/agregar-noticia', { 
      titulo: nuevoTitulo, 
      descripcion: nuevaDesc, 
      tipo: nuevoTipo 
    }).then(() => {
      setMensaje("¡Noticia publicada con éxito!");
      setTimeout(() => { setMensaje(''); window.location.reload(); }, 2000);
    }).catch(err => {
      setMensaje("Error al publicar la noticia");
      console.error(err);
    });
  };

  const obtenerSaludo = () => {
    const hora = new Date().getHours();
    return hora < 12 ? "¡Buenos días!" : hora < 18 ? "¡Buenas tardes!" : "¡Buenas noches!";
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Iniciar sesión</h2>
          {mensaje && <p style={{color: 'red', fontWeight: 'bold'}}>{mensaje}</p>}
          <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
          <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header-emisora">
        <img src={banner} alt="Banner" className="banner-img" />
        <button className="logout-btn" onClick={logout}>Cerrar Sesión</button>
        <div className="logo-overlay"><img src={logo} alt="Logo" className="logo-img" /></div>
      </header>

      <main className="content">
        {mensaje && <div className="custom-alert" style={{background: '#d4edda', color: '#155724', padding: '10px', margin: '10px', borderRadius: '5px'}}>{mensaje}</div>}
        
        <section className="hero">
          <h1>{obtenerSaludo()} a la Emisora Colegio Personal</h1>
          <p>La voz de nuestra comunidad educativa.</p>
        </section>

        {radioUrl && (
          <section className="live-radio">
            <h2>¡Escúchanos en Vivo! 🎙️</h2>
            <div className="radio-container">
              <iframe src={radioUrl} width="100%" height="100%" frameBorder="0" allow="autoplay; encrypted-media" title="Radio en vivo" allowFullScreen></iframe>
            </div>
          </section>
        )}

        <section className="form-noticias">
          <h2>Publicar Nueva Noticia</h2>
          <input type="text" placeholder="Título" onChange={(e) => setNuevoTitulo(e.target.value)} />
          <textarea placeholder="Descripción" onChange={(e) => setNuevaDesc(e.target.value)} />
          <select onChange={(e) => setNuevoTipo(e.target.value)}>
            <option value="Aviso">📢 Aviso</option>
            <option value="Evento">🎉 Evento</option>
            <option value="Vacaciones">🏖️ Vacaciones</option>
          </select>
          <button onClick={agregarNoticia}>Publicar Noticia</button>
        </section>

        <section className="avisos-section">
          <h2>Avisos de la Emisora</h2>
          <div className="avisos-lista">
            {avisos.length > 0 ? avisos.map(aviso => (
              <div key={aviso.id} className="aviso-card">
                <h3>{aviso.tipo === 'Vacaciones' ? '🏖️' : aviso.tipo === 'Evento' ? '🎉' : '📢'} {aviso.titulo}</h3>
                <p>{aviso.descripcion}</p>
              </div>
            )) : <p>No hay avisos disponibles en este momento.</p>}
          </div>
        </section>
      </main>

      <footer className="footer"><p>© 2026 - Proyecto Emisora Escolar</p></footer>
    </div>
  );
}

export default App;