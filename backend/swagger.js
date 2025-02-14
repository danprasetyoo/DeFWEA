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
                url: process.env.API_URL || 'http://192.168.1.87:5000/api',
                description: 'Development server'
            }
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = specs;