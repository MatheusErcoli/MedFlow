import { Router } from 'express';

import agendaController from './agenda.controller';

import {
    criarAgendaSchema,
    atualizarAgendaSchema,
    listarAgendaSchema,
    idSchema,
} from './agenda.schema';

import { validate } from '../../middlewares/validate.middleware';

const router = Router();

router.get(
    '/',
    validate(listarAgendaSchema, 'query'),
    agendaController.listar
);

router.get(
    '/:id',
    validate(idSchema, 'params'),
    agendaController.buscarPorId
);

router.post(
    '/',
    validate(criarAgendaSchema, 'body'),
    agendaController.criar
);

router.put(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarAgendaSchema, 'body'),
    agendaController.atualizar
);

router.patch(
    '/:id/cancelar',
    validate(idSchema, 'params'),
    agendaController.cancelar
);

export default router;