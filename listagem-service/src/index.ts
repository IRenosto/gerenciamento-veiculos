import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import { connectRedis, redisClient } from './redis/client';
import { server } from './server';
import { consumirEventos } from './services/redisConsumer';

const PORT = process.env.PORT || 5033;
const HOST = process.env.HOST || 'localhost';

AppDataSource.initialize().then(async () => {

  console.log(`\nBanco de dados conectado\n`);

  await connectRedis();
  consumirEventos();

    server.listen(process.env.PORT, async () => {
        console.log(`Listagem Service rodando no endereço: http://${HOST}:${PORT}\n`);
    });

}).catch(err => console.error('Error initializing Data Source:', err));
