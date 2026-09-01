import { Router } from 'express';

import sessaoController from './sessao.controller';

import { validate } from '../../middlewares/validate.middleware';

import {
    criarSessaoSchema,
    atualizarSessaoSchema,
} from './sessao.schema';

const sessoesRoutes = Router();

sessoesRoutes.get(
    '/',
    sessaoController.listar
);

sessoesRoutes.get(
    '/:id',
    sessaoController.buscarPorId
);

sessoesRoutes.post(
    '/',
    validate(criarSessaoSchema),
    sessaoController.criar
);

sessoesRoutes.patch(
    '/:id',
    validate(atualizarSessaoSchema),
    sessaoController.atualizar
);

sessoesRoutes.patch(
    '/:id/finalizar',
    sessaoController.finalizar
);

sessoesRoutes.delete(
    '/:id',
    sessaoController.deletar
);

export default sessoesRoutes;