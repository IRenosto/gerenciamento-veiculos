import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cadastro Service',
            version: '1.0.0',
            description: 'Serviço para cadastro de veiculos',
        },
        servers: [
            {
                url: process.env.URL,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [path.resolve(__dirname, '..', 'routes', 'index.{ts,js}')], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
