import { Veiculo } from '../database/entities';
import { veiculosRepository } from '../database/repositories';

export const getAllVeiculos = async (
  page?: number,
  limit?: number,
  filter?: string
): Promise<Veiculo[]> => {
    const query = veiculosRepository.createQueryBuilder('veiculo');

    if (filter) {
      query.andWhere(
        `(LOWER(veiculo.placa) LIKE LOWER(:filter) 
        OR LOWER(veiculo.marca) LIKE LOWER(:filter) 
        OR LOWER(veiculo.modelo) LIKE LOWER(:filter)
        OR CAST(veiculo.ano AS TEXT) LIKE LOWER(:filter)
        OR LOWER(veiculo.cor) LIKE LOWER(:filter))`,
        { filter: `%${filter}%` }
      );
    }

    query.orderBy('veiculo.id', 'ASC');

    if (typeof page === 'number' && typeof limit === 'number' && page > 0 && limit > 0) {
      query.skip((page - 1) * limit);
      query.take(limit);
    }

    return await query.getMany();
};
