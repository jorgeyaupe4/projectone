require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/sendOrder', (req, res) => {
    const { nombre, email, producto, cantidad } = req.body;
    const message = `Nuevo Pedido:\nNombre: ${nombre}\nEmail: ${email}\nProducto: ${producto}\nCantidad: ${cantidad}`;

    axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_ID}/sendMessage`, {
        chat_id: process.env.CHAT_ID,
        text: message
    })
    .then(response => {
        res.json({ success: true, response });
    })
    .catch(error => {
        console.error("Error al enviar mensaje a Telegram:", error.response.data);
        res.status(500).json({ success: false, error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});