// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Calculator API',
            version: '1.0.0',
            description: 'API documentation for Calculator Service',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:5000/api',
                description: 'Development server'
            }
        ],
    },
    // Path to your route files containing JSDoc comments
    apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = specs;