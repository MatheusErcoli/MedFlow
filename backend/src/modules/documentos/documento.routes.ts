import { Router } from 'express';

import documentoController from './documento.controller';

import { validate } from '../../middlewares/validate.middleware';

import {
    criarDocumentoSchema,
    atualizarDocumentoSchema,
    listarDocumentoSchema,
    idSchema,
} from './documento.schema';

const documentoRoutes = Router();

documentoRoutes.get(
    '/',
    validate(listarDocumentoSchema, 'query'),
    documentoController.listar,
);

documentoRoutes.get(
    '/:id',
    validate(idSchema, 'params'),
    documentoController.buscarPorId,
);

documentoRoutes.post(
    '/',
    validate(criarDocumentoSchema, 'body'),
    documentoController.criar,
);

documentoRoutes.patch(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarDocumentoSchema, 'body'),
    documentoController.atualizar,
);

documentoRoutes.delete(
    '/:id',
    validate(idSchema, 'params'),
    documentoController.deletar,
);

export default documentoRoutes;