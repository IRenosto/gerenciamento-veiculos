import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
  },
});

export const redisConsumerClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT || 6379),
  },
});

redisClient.on('connect', () => console.log('[Redis] redisClient conectado!'));
redisClient.on('error', (err) => console.error('[Redis] redisClient erro:', err));

redisConsumerClient.on('connect', () => console.log('[Redis] redisConsumerClient conectado!'));
redisConsumerClient.on('error', (err) => console.error('[Redis] redisConsumerClient erro:', err));


export async function connectRedis() {
  await redisClient.connect();
  await redisConsumerClient.connect();
  console.log('[Redis] Todos os clients conectados!');
}
