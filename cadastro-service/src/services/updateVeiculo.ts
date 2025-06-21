import { Veiculo } from '../database/entities';
import { veiculosRepository } from '../database/repositories';
import { IBodyPropsVeiculos } from '../interfaces';
import { NotFoundError } from '../errors/customErrors';

export const updateVeiculo = async (id: number, veiculoNovo: IBodyPropsVeiculos): Promise<Veiculo> => {
        const veiculoCadastrado = await veiculosRepository.findOne({ where: { id } });

        if (!veiculoCadastrado) throw new NotFoundError('Veiculo não localizado');

        veiculoCadastrado.placa = veiculoNovo.placa ?? veiculoCadastrado.placa;
        veiculoCadastrado.marca = veiculoNovo.marca ?? veiculoCadastrado.marca;
        veiculoCadastrado.modelo = veiculoNovo.modelo ?? veiculoCadastrado.modelo;
        veiculoCadastrado.ano = veiculoNovo.ano ?? veiculoCadastrado.ano;
        veiculoCadastrado.cor = veiculoNovo.cor ?? veiculoCadastrado.cor;

        const veiculoAtualizado =  await veiculosRepository.save(veiculoCadastrado);

        return veiculoAtualizado;
};