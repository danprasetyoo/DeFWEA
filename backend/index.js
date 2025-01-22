const express = require('express');
const cors = require('cors');
const app = express();
const calculatorRouter = require('./routes/calculatorRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/calculators', calculatorRouter);

app.get('/', (req, res) => {
    res.send('API is working');
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
