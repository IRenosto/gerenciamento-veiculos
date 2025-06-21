import { AppDataSource } from '../data-source';
import { Veiculo } from '../entities/Veiculo';

export const veiculosRepository = AppDataSource.getRepository(Veiculo);