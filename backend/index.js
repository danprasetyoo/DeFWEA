const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const calculatorRouter = require('./routes/calculatorRoutes');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

const app = express();

// Prisma Client
const prisma = new PrismaClient();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN || 'http://192.168.1.87:5005');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization, X-Request-ID');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Security
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use('/api/calculators', limiter, calculatorRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health Check
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
    console.error(`[${new Date().toISOString()}] Error:`, err);

    const statusCode = err.statusCode || 500;
    const response = {
        error: {
            message: statusCode === 500 ? 'Internal Server Error' : err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    };

    res.status(statusCode).json(response);
});

// Server Startup (with graceful shutdown)
const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected');

        server = app.listen(PORT, () => {
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