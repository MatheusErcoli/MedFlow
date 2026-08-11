import { Router } from 'express';

import usuarioController from './usuario.controller';

import { criarUsuarioSchema } from './usuario.schema';

import { validate } from '../../middlewares/validate.middleware';

const usuarioRoutes = Router();

usuarioRoutes.get(
    '/',
    usuarioController.listar
);

usuarioRoutes.get(
    '/:id',
    usuarioController.buscarPorId
);

usuarioRoutes.post(
    '/',
    validate(criarUsuarioSchema),
    usuarioController.criar
);

export default usuarioRoutes;
