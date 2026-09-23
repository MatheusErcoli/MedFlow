import { Router } from 'express';

import anexoController from './anexo.controller';

import {
    criarAnexoSchema,
    atualizarAnexoSchema,
    listarAnexoSchema,
    idSchema,
} from './anexo.schema';

import { validate } from '../../middlewares/validate.middleware';

const anexosRoutes = Router();

anexosRoutes.get(
    '/',
    validate(listarAnexoSchema, 'query'),
    anexoController.listar,
);

anexosRoutes.get(
    '/:id',
    validate(idSchema, 'params'),
    anexoController.buscarPorId,
);

anexosRoutes.post(
    '/',
    validate(criarAnexoSchema, 'body'),
    anexoController.criar,
);

anexosRoutes.patch(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarAnexoSchema, 'body'),
    anexoController.atualizar,
);

anexosRoutes.delete(
    '/:id',
    validate(idSchema, 'params'),
    anexoController.deletar,
);

export default anexosRoutes;