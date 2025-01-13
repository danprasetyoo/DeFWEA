const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 5000;

const dbConfig = {
    user: 'postgres',
    host: 'postgres',
    database: 'fwea',
    password: 'admin',
    port: 5432,
};

const client = new Client(dbConfig);

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL DB!');
    })
    .catch(err => {
        console.error('DB connection failed:', err);
    });

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
