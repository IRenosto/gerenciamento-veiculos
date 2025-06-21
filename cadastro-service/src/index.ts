import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import { connectRedis } from './redis/client';
import { server } from './server';

const PORT = process.env.PORT || 5032;
const HOST = process.env.HOST || 'localhost';

AppDataSource.initialize().then(async () => {

    console.log(`\nBanco de dados conectado\n`);

    await connectRedis()

    server.listen(process.env.PORT, async () => {
        console.log(`Cadastro Service rodando no endereço: http://${HOST}:${PORT}\n`);
    });

}).catch(err => console.error('Error initializing Data Source:', err));
