import { Router } from 'express';
import { listagemHandler } from '../controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Listagem
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de sucesso
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
router.get('/', (_, res) => {
  return res.status(200).send('Serviço de cadastro de veiculos funcionando corretamente.');
  });


/**
 * @swagger
 * /veiculos:
 *   get:
 *     summary: Lista todos os veículos
 *     tags: [Listagem]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limite de itens por página
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtro por placa, marca, modelo, ano ou cor
 *     responses:
 *       200:
 *         description: Lista de veículos retornada com sucesso
 */
router.get('/veiculos', listagemHandler.listarVeiculosController);

/**
 * @swagger
 * /fila-veiculos:
 *   get:
 *     summary: Lista os registros da fila do Redis
 *     tags: [Listagem]
 *     responses:
 *       200:
 *         description: Registros retornados com sucesso
 */
router.get('/fila-veiculos', listagemHandler.listarFilaVeiculosController);


export { router };