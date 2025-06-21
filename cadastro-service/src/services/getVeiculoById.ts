import { Veiculo } from '../database/entities';
import { veiculosRepository } from '../database/repositories';
import { NotFoundError } from '../errors/customErrors';

export const getVeiculoById = async (
  id: number
): Promise<Veiculo> => {
    const veiculo = await veiculosRepository.findOne({ 
        where: { id } 
    });

    if (!veiculo) {
        throw new NotFoundError('Veiculo não encontrado');
    }

    return veiculo;
};