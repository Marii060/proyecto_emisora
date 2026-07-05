const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "emisora_colegio"
});

// Probar conexión
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos: " + err.stack);
        return;
    }
    console.log("Conectado a la base de datos MySQL como ID " + db.threadId);
});

// --- RUTAS ---

app.get('/avisos', (req, res) => {
    db.query('SELECT * FROM noticias', (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    });
});

app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";
    
    db.query(sql, [usuario, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.send({ loggedIn: true, message: "Bienvenido" });
        } else {
            res.send({ loggedIn: false, message: "Usuario o contraseña incorrectos" });
        }
    });
});

app.get('/locutores', (req, res) => {
    db.query("SELECT * FROM locutores", (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    });
});

app.post('/agregar-noticia', (req, res) => {
    const { titulo, descripcion, tipo } = req.body;
    // Agregué un log para saber si el backend realmente recibe la petición
    console.log("Recibiendo nueva noticia:", titulo, tipo);
    
    const sql = "INSERT INTO noticias (titulo, descripcion, tipo) VALUES (?, ?, ?)";
    db.query(sql, [titulo, descripcion, tipo], (err, result) => {
        if (err) {
            console.error("Error al insertar:", err);
            res.status(500).send(err);
        } else {
            res.send({ message: "Noticia agregada con éxito" });
        }
    });
});

// Iniciar servidor
app.listen(3001, () => {
    console.log("Servidor backend corriendo en el puerto 3001");
});