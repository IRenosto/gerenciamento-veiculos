import { setSeederFactory } from 'typeorm-extension';
import { Veiculo } from '../entities';

export default setSeederFactory(Veiculo, async (faker) => {
    const veiculo = new Veiculo();

    veiculo.placa = faker.vehicle.vrm();
    veiculo.marca = faker.vehicle.manufacturer();
    veiculo.modelo = faker.vehicle.model();
    veiculo.ano = faker.date.past({ years: 30 }).getFullYear();
    veiculo.cor = faker.color.human();

    return veiculo;
});