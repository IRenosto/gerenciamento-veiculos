import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
  },
});

redisClient.on('error', (err) => console.error('[Redis] Erro de conexão:', err));

export async function connectRedis() {
  await redisClient.connect();
  console.log('[Redis] Conectado com sucesso!');
}
