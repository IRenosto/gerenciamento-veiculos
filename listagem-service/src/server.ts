import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import { swaggerSpec } from './middlewares';

const server = express();

server.use(cors());
server.use(express.json());


server.get('/api-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use('/', router);

export { server };