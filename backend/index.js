const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const calculatorRouter = require('./routes/calculatorRoutes');

let prisma; // Lazy loading

const app = express();

// CORS (with exposed headers)
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5005',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add all custom headers
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'], // Important: Expose custom headers
}));

// Security
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Rate Limiting (apply to all routes if needed)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
// app.use(limiter); // Apply to all routes

// Routes
app.use('/api/calculators', limiter, calculatorRouter); // Apply limiter to specific route
// ... other routes

// Health Check (with database check)
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err); // Log full error object

    const statusCode = err.statusCode || 500;
    const response = {
        error: {
            message: statusCode === 500 ? 'Internal Server Error' : err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    };

    res.status(statusCode).json(response); // JSON response for all errors
});


// Server Startup (with graceful shutdown)
const PORT = process.env.PORT || 5000;
let server; // Store the server object

const startServer = async () => {
    try {
        prisma = new PrismaClient(); // Instantiate Prisma client
        await prisma.$connect();
        console.log('Database connected');

        server = app.listen(PORT, () => { // Store the server object
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Graceful Shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    try {
        await prisma.$disconnect();
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});