const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const calculatorRouter = require('./routes/calculatorRoutes');
const prisma = new PrismaClient();
const app = express();

app.use(cors({
    origin: 'http://localhost:5005',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api', calculatorRouter);

app.get('/', (req, res) => {
    res.send('API is working');
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.use((err, req, res, next) => {
    console.error("Backend Error:", err);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database');
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
});