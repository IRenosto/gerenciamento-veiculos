import { veiculosRepository } from '../database/repositories';
import { NotFoundError } from '../errors/customErrors';

export const deleteVeiculo = async (id: number): Promise<void> => {
        const veiculo = await veiculosRepository.findOneBy({ id });

        if (!veiculo) {
            throw new NotFoundError('Veiculo não encontrado');
        }

        await veiculosRepository.delete(id);
};