import { Router } from 'express';
import { veiculosHandler } from '../controllers';
import { register, validarVeiculo } from '../middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Cadastro
 *     description: Gerenciamento e cadastro de veiculos
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
 * /metrics:
 *   get:
 *     summary: Retorna métricas do Prometheus
 *     responses:
 *       200:
 *         description: Métricas do Prometheus
 */
router.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

/**
 * @swagger
 * /veiculos:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Cadastro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               ano:
 *                 type: integer
 *               cor:
 *                 type: string
 *             required:
 *               - placa
 *               - marca
 *               - modelo
 *               - ano
 *               - cor
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 */
router.post('/veiculos', veiculosHandler.createVeiculoValidation, validarVeiculo, veiculosHandler.createVeiculo);

/**
 * @swagger
 * /veiculos:
 *   get:
 *     summary: Lista todos os veículos
 *     tags: [Cadastro]
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
router.get('/veiculos', veiculosHandler.getAllVeiculosValidation, veiculosHandler.getAllVeiculos);

/**
 * @swagger
 * /veiculos/{id}:
 *   get:
 *     summary: Obtém os dados de um veículo por ID
 *     tags: [Cadastro]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Dados do veículo retornados com sucesso
 *       400:
 *         description: Parâmetro ID ausente ou inválido
 */
router.get('/veiculos/:id', veiculosHandler.getVeiculoByIdValidation, veiculosHandler.getVeiculoById);

/**
 * @swagger
 * /veiculos/{id}:
 *   patch:
 *     summary: Atualiza os dados de um veículo
 *     tags: [Cadastro]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               ano:
 *                 type: integer
 *               cor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *       400:
 *         description: Parâmetro ID ausente ou inválido
 */
router.patch('/veiculos/:id', veiculosHandler.updateVeiculoValidation, validarVeiculo, veiculosHandler.updateVeiculo);

/**
 * @swagger
 * /veiculos/{id}:
 *   delete:
 *     summary: Remove um veículo pelo ID
 *     tags: [Cadastro]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do veículo
 *     responses:
 *       204:
 *         description: Veículo removido com sucesso
 *       400:
 *         description: Parâmetro ID ausente ou inválido
 */
router.delete('/veiculos/:id', veiculosHandler.deleteVeiculoValidation, veiculosHandler.deleteVeiculo);

export { router };