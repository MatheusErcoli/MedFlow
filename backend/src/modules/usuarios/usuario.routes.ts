import { Router } from 'express';

import usuarioController from './usuario.controller';

import { criarUsuarioSchema, atualizarUsuarioSchema, listarUsuarioSchema, idSchema } from './usuario.schema';

import { validate } from '../../middlewares/validate.middleware';

const usuarioRoutes = Router();

usuarioRoutes.get(
    '/',
    validate(listarUsuarioSchema),
    usuarioController.listar
);

usuarioRoutes.get(
    '/:id',
    validate(idSchema, 'params'),
    usuarioController.buscarPorId
);

usuarioRoutes.post(
    '/',
    validate(criarUsuarioSchema),
    usuarioController.criar
);

usuarioRoutes.put(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarUsuarioSchema),
    usuarioController.atualizar
)

usuarioRoutes.delete(
    '/:id',
    validate(idSchema, 'params'),
    usuarioController.deletar
);
export default usuarioRoutes;
