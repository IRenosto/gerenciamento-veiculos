import * as createVeiculo from './createVeiculo';
import * as deleteVeiculo from './deleteVeiculo';
import * as getAllVeiculos from './getAllVeiculos';
import * as getVeiculoById from './getVeiculoById';
import * as updateVeiculo from './updateVeiculo';

export const veiculoProvider = {
    ...createVeiculo,
    ...deleteVeiculo,
    ...getAllVeiculos,
    ...getVeiculoById,
    ...updateVeiculo,
};