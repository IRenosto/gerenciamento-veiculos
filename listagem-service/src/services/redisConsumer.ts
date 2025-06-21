import { redisClient, redisConsumerClient } from '../redis/client';
import { listagemRepository } from '../database/repositories/listagemRepository';

export async function consumirEventos() {
  console.log('[Redis] Escutando filas: veiculo_cadastrado, veiculo_atualizado, veiculo_deletado');

  while (true) {
    const data = await redisConsumerClient.blPop(
      ['veiculo_cadastrado', 'veiculo_atualizado', 'veiculo_deletado'],
      0
    );

    if (!data) continue;

    const fila = data.key;
    const payload = JSON.parse(data.element);
    const { id, timestamp, ...conteudo } = payload;

    try {
      const existente = await listagemRepository.findOneBy({ id });

      if (fila === 'veiculo_cadastrado') {
        if (!existente) {
          await listagemRepository.save({ id, ...conteudo });

          await redisClient.rPush('veiculos_log', JSON.stringify({
          acao: 'veiculo_cadastrado',
          conteudo: { id, conteudo },
          timestamp
        }));

          console.log(`[Redis] [${timestamp}] - Veículo cadastrado:`, { id, ...conteudo });
        } else {
          console.log(`[Redis] [${timestamp}] - Veículo já existe (ID ${id}), ignorando.`);
        }
      }

      if (fila === 'veiculo_atualizado') {
        if (existente) {
          const atualizado = listagemRepository.merge(existente, conteudo);
          await listagemRepository.save(atualizado);

          await redisClient.rPush('veiculos_log', JSON.stringify({
            acao: 'veiculo_atualizado',
            conteudo: { atualizado },
            timestamp
        }));
          
          console.log(`[Redis] [${timestamp}] - Veículo atualizado:`, atualizado);
        } else {
          console.warn(`[Redis] [${timestamp}] - Veículo com ID ${id} não encontrado para atualização.`);
        }
      }

      if (fila === 'veiculo_deletado') {
        if (existente) {
          await listagemRepository.remove(existente);

          await redisClient.rPush('veiculos_log', JSON.stringify({
            acao: 'veiculo_deletado',
            conteudo: { id },
            timestamp
          }));

          console.log(`[Redis] [${timestamp}] - Veículo deletado (ID ${id})`);
        } else {
          console.log(`[Redis] [${timestamp}] - Veículo com ID ${id} não encontrado para deleção.`);
        }
      }
    } catch (err) {
      console.error(`[${fila}] Erro ao processar veículo:`, err);
    }
  }
}
