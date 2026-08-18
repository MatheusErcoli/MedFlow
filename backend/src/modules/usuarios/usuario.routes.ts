import { Router } from 'express';

import usuarioController from './usuario.controller';

import {
    criarUsuarioSchema,
    atualizarUsuarioSchema,
    listarUsuarioSchema,
    idSchema,
} from './usuario.schema';

import { validate } from '../../middlewares/validate.middleware';

const usuarioRoutes = Router();

usuarioRoutes.get(
    '/',
    validate(listarUsuarioSchema, 'query'),
    usuarioController.listar
);

usuarioRoutes.get(
    '/:id',
    validate(idSchema, 'params'),
    usuarioController.buscarPorId
);

usuarioRoutes.post(
    '/',
    validate(criarUsuarioSchema, 'body'),
    usuarioController.criar
);

usuarioRoutes.put(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarUsuarioSchema, 'body'),
    usuarioController.atualizar
);

usuarioRoutes.patch(
    '/:id/ativar',
    validate(idSchema, 'params'),
    usuarioController.ativar
);

usuarioRoutes.patch(
    '/:id/inativar',
    validate(idSchema, 'params'),
    usuarioController.inativar
);

usuarioRoutes.delete(
    '/:id',
    validate(idSchema, 'params'),
    usuarioController.deletar
);

export default usuarioRoutes;