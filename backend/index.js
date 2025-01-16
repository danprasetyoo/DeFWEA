const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const calculatorRoutes = require('./routes/calculatorRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/calculators', calculatorRoutes);

app.get('/', (req, res) => {
    res.send('API is working');
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
