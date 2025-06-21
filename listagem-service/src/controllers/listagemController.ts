import { Request, Response } from 'express';
import { redisClient } from '../redis/client';
import { buscarVeiculosComFiltro } from '../services/listarVeiculos';

interface IQuerybuscarVeiculos {
    page?: number;
    limit?: number;
    filter?: string;
}

export const listarVeiculosController = async (req: Request<{}, {}, {}, IQuerybuscarVeiculos>, res: Response) => {
    try {
        const result = await buscarVeiculosComFiltro(
            req.query.page,
            req.query.limit,
            req.query.filter,
        );
        

        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro na listagem de veiculos:', error);
        return res.status(500).json({ error: 'Erro ao listar veículos' });
  }
};


export const listarFilaVeiculosController = async (req: Request, res: Response) => {
  try {
    const logs = await redisClient.lRange('veiculos_log', 0, -1);
    const resultado = logs.map(log => JSON.parse(log));

    return res.status(200).json(resultado);
  } catch (error) {
    console.error('[Listagem] Erro ao buscar log de veículos:', error);
    return res.status(500).json({ error: 'Erro ao buscar log de veículos' });
  }
};