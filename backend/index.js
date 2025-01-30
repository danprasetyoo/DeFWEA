// server.js (Enhanced)
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const calculatorRouter = require('./routes/calculatorRoutes');
const prisma = new PrismaClient();
const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5005',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['X-Request-ID']
}));

// Enhanced security middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/calculators', limiter);

// Routes
app.use('/api/calculators', calculatorRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const response = {
        error: {
            message: statusCode === 500 ? 'Internal Server Error' : err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    };

    res.status(statusCode).json(response);
});

// Server startup
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();