const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 3001;

const dbConfig = {
    user: 'admin',
    password: 'admin',
    connectString: 'oracle_container:1521/xe',
};

oracledb.getConnection(dbConfig)
    .then(connection => {
        console.log('Connected to Oracle DB!');
        connection.close();
    })
    .catch(err => console.error('DB connection failed:', err));

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
