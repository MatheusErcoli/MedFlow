import { Router } from 'express';

import usuarioController from './usuario.controller';

import { criarUsuarioSchema, atualizarUsuarioSchema, listarUsuarioSchema } from './usuario.schema';

import { validate } from '../../middlewares/validate.middleware';

const usuarioRoutes = Router();

usuarioRoutes.get(
    '/',
    validate(listarUsuarioSchema),
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

usuarioRoutes.put(
    '/:id',
    validate(atualizarUsuarioSchema),
    usuarioController.atualizar
)

usuarioRoutes.delete(
    '/:id',
    usuarioController.deletar
);
export default usuarioRoutes;
