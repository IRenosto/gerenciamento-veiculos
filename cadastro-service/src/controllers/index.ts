import * as veiculosController from './veiculosController';
import * as veiculosValidator from './veiculosValidator';

export const veiculosHandler = {
    ...veiculosController,
    ...veiculosValidator,
};