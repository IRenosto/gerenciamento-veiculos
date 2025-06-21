import { z } from 'zod';
import { validation } from '../middlewares';

const anoAtual = new Date().getFullYear();

export const createVeiculoValidation = validation({
    body: z.object({
      placa: z.string().regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida'),
      marca: z.string().min(1, 'Marca é obrigatória'),
      modelo: z.string().min(1, 'Modelo é obrigatório'),
      ano: z.number().min(1900, { message: 'Ano deve ser no mínimo 1900' }).max(anoAtual, { message: `Ano não pode ser maior que ${anoAtual}` }),
      cor: z.string().min(1),
    }),
  });

export const deleteVeiculoValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const getAllVeiculosValidation = validation({
  query: z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    filter: z.string().optional(),
  }),
});

export const getVeiculoByIdValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const updateVeiculoValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
   body: z.object({
      placa: z.string().regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida').optional(),
      marca: z.string().min(1, 'Marca é obrigatória').optional(),
      modelo: z.string().min(1, 'Modelo é obrigatório').optional(),
      ano: z.number().min(1900, { message: 'Ano deve ser no mínimo 1900' }).max(anoAtual, { message: `Ano não pode ser maior que ${anoAtual}` }).optional(),
      cor: z.string().min(1).optional(),
    }),
});