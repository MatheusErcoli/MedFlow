import { Router } from 'express';

import usuarioController from './usuario.controller';

import {
    criarUsuarioSchema,
    atualizarUsuarioSchema,
    listarUsuarioSchema,
    idSchema,
} from './usuario.schema';

import { validate } from '../../middlewares/validate.middleware';
import { anexarCaminhoFoto, uploadFoto } from '../../middlewares/upload.middleware';

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
    uploadFoto.single('foto'),
    anexarCaminhoFoto,
    validate(criarUsuarioSchema, 'body'),
    usuarioController.criar
);

usuarioRoutes.put(
    '/:id',
    validate(idSchema, 'params'),
    uploadFoto.single('foto'),
    anexarCaminhoFoto,
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

export default usuarioRoutes;