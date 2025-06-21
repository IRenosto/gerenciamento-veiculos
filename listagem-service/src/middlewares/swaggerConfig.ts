import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Listagem Service',
            version: '1.0.0',
            description: 'Servico para listagem de veiculos e filas do Redis',
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
