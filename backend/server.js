const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a tu base de datos en XAMPP
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Si no le pusiste contraseña a tu MySQL en XAMPP, déjalo así
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

app.listen(3001, () => {
    console.log("Servidor backend corriendo en el puerto 3001");
});

app.get('/avisos', (req, res) => {
    db.query('SELECT * FROM noticias', (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    });
});