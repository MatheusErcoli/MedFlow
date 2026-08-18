import { Router } from 'express';

import especialidadeController from './especialidade.controller';

import {
    criarEspecialidadeSchema,
    atualizarEspecialidadeSchema,
    idSchema,
    listarEspecialidadeSchema,
} from './especialidade.schema';

import { validate } from '../../middlewares/validate.middleware';

const especialidadeRoutes = Router();

especialidadeRoutes.get(
    '/',
    validate(listarEspecialidadeSchema, 'query'),
    especialidadeController.listar
);

especialidadeRoutes.get(
    '/:id',
    validate(idSchema, 'params'),
    especialidadeController.buscarPorId
);

especialidadeRoutes.post(
    '/',
    validate(criarEspecialidadeSchema, 'body'),
    especialidadeController.criar
);

especialidadeRoutes.put(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarEspecialidadeSchema, 'body'),
    especialidadeController.atualizar
);

especialidadeRoutes.patch(
    '/:id/ativar',
    validate(idSchema, 'params'),
    especialidadeController.ativar
);

especialidadeRoutes.patch(
    '/:id/inativar',
    validate(idSchema, 'params'),
    especialidadeController.inativar
);

export default especialidadeRoutes;