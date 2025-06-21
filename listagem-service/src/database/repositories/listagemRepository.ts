import { AppDataSource } from '../data-source';
import { Veiculo } from '../entities/Veiculo';

export const listagemRepository = AppDataSource.getRepository(Veiculo);