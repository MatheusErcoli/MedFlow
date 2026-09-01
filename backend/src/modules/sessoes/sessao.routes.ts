import { Router } from 'express';

import sessaoController from './sessao.controller';

import { validate } from '../../middlewares/validate.middleware';

import {
    criarSessaoSchema,
    atualizarSessaoSchema,
} from './sessao.schema';

const router = Router();

router.get(
    '/',
    sessaoController.listar
);

router.get(
    '/:id',
    sessaoController.buscarPorId
);

router.post(
    '/',
    validate(criarSessaoSchema),
    sessaoController.criar
);

router.patch(
    '/:id',
    validate(atualizarSessaoSchema),
    sessaoController.atualizar
);

router.patch(
    '/:id/finalizar',
    sessaoController.finalizar
);

router.delete(
    '/:id',
    sessaoController.deletar
);

export default router;