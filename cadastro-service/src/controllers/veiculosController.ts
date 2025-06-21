import { Request, Response } from 'express';
import { veiculoProvider } from '../services';
import { IParamsId,  IBodyPropsVeiculos, IQueryGetAllVeiculos } from '../interfaces';
import { errorHandler } from '../middlewares/errorHandler';
import { redisClient } from '../redis/client';

const getTimestamp = () => new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

export const createVeiculo = async (req: Request<{}, {}, IBodyPropsVeiculos>, res: Response) => {
    try {
        const resultVeiculo = await veiculoProvider.createVeiculo(req.body);

        const payload = {
            ...resultVeiculo,
            timestamp: getTimestamp(),    
        };

        await redisClient.rPush('veiculo_cadastrado', JSON.stringify(payload));


        return res.status(201).json(resultVeiculo);
    } catch (error) {
        console.error('createVeiculo - error:', error);
        errorHandler(error, res);
    }
};

export const deleteVeiculo = async (req: Request<IParamsId>, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        await veiculoProvider.deleteVeiculo(id);

        const payload = {
            id,
            timestamp: getTimestamp(),
        };

        await redisClient.rPush('veiculo_deletado', JSON.stringify(payload));

        return res.status(204).send();
    } catch (error) {
        console.error('deleteVeiculo - error:', error);
        errorHandler(error, res);
    }
};

export const updateVeiculo = async (req: Request<IParamsId, {}, IBodyPropsVeiculos>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        const result = await veiculoProvider.updateVeiculo(Number(req.params.id), req.body);

        const payload = {
            ...result,
            timestamp: getTimestamp(),
        };

        await redisClient.rPush('veiculo_atualizado', JSON.stringify(payload));

        return res.status(200).json(result);
    } catch (error) {
        console.error('updateVeiculo - error:', error);
        errorHandler(error, res);
    }
};

export const getAllVeiculos = async (req: Request<{}, {}, {}, IQueryGetAllVeiculos>, res: Response) => {
    try {
        const result = await veiculoProvider.getAllVeiculos(
            req.query.page,
            req.query.limit,
            req.query.filter,
        );

        const totalCount = result.length;

        res.setHeader('access-control-expose-headers', 'x-total-count');
        res.setHeader('x-total-count', totalCount);

        return res.status(200).json(result);
    } catch (error) {
        console.error('getAllVeiculos - error:', error);
        errorHandler(error, res);
    }
};

export const getVeiculoById = async (req: Request<IParamsId>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        const result = await veiculoProvider.getVeiculoById(req.params.id);

        return res.status(200).json(result);
    } catch (error) {
        console.error('getVeiculosById - error:', error);
        errorHandler(error, res);
    }
};

