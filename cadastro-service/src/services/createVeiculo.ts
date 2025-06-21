import { Veiculo } from '../database/entities';
import { veiculosRepository } from '../database/repositories';
import { IBodyPropsVeiculos } from '../interfaces';

export const createVeiculo = async ( veiculo: IBodyPropsVeiculos ): Promise<Veiculo> => {
    const novoVeiculo = veiculosRepository.create({
        placa: veiculo.placa,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        cor: veiculo.cor
    });

    return await veiculosRepository.save(novoVeiculo);
};
