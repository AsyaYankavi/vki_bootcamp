const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../public')); // Statik dosyaları sunmak için


const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'kitleindeks1',
    database: 'bmi_database'
});

db.connect(err => {
    if (err) {
        console.error('MySQL bağlantı hatası:', err);
        return;
    }
    console.log('MySQL bağlandı');
});

app.post('/bmi', (req, res) => {
    const { height, weight, bmi } = req.body;
    const sql = 'INSERT INTO bmi_records (height, weight, bmi) VALUES (?, ?, ?)';
    db.query(sql, [height, weight, bmi], (err, result) => {
        if (err) {
            console.error('Veri kaydederken hata:', err);
            res.status(500).send('Veri kaydedilemedi');
            return;
        }
        res.send('BMI kaydı başarıyla eklendi');
    });
});

    app.listen(port, () => {
        console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
    });