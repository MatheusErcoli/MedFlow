import { Router } from 'express';

import pacienteController from './paciente.controller';

import {
    criarPacienteSchema,
    atualizarPacienteSchema,
    listarPacienteSchema,
    idSchema,
} from './paciente.schema';

import { validate } from '../../middlewares/validate.middleware';

const pacienteRoutes = Router();

pacienteRoutes.get(
    '/',
    validate(listarPacienteSchema, 'query'),
    pacienteController.listar
);

pacienteRoutes.get(
    '/:id',
    validate(idSchema, 'params'),
    pacienteController.buscarPorId
);

pacienteRoutes.post(
    '/',
    validate(criarPacienteSchema, 'body'),
    pacienteController.criar
);

pacienteRoutes.put(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarPacienteSchema, 'body'),
    pacienteController.atualizar
);

pacienteRoutes.patch(
    '/:id/inativar',
    validate(idSchema, 'params'),
    pacienteController.inativar
);

pacienteRoutes.patch(
    '/:id/ativar',
    validate(idSchema, 'params'),
    pacienteController.ativar
);

export default pacienteRoutes;