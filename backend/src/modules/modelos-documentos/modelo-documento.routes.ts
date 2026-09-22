import { Router } from 'express';

import modeloDocumentoController from './modelo-documento.controller';

import { validate } from '../../middlewares/validate.middleware';

import {
    criarModeloDocumentoSchema,
    atualizarModeloDocumentoSchema,
    listarModeloDocumentoSchema,
    idSchema,
} from './modelo-documento.schema';

const modeloDocumentoRoutes = Router();

modeloDocumentoRoutes.get(
    '/',
    validate(listarModeloDocumentoSchema, 'query'),
    modeloDocumentoController.listar,
);

modeloDocumentoRoutes.get(
    '/:id',
    validate(idSchema, 'params'),
    modeloDocumentoController.buscarPorId,
);

modeloDocumentoRoutes.post(
    '/',
    validate(criarModeloDocumentoSchema, 'body'),
    modeloDocumentoController.criar,
);

modeloDocumentoRoutes.patch(
    '/:id',
    validate(idSchema, 'params'),
    validate(atualizarModeloDocumentoSchema, 'body'),
    modeloDocumentoController.atualizar,
);

modeloDocumentoRoutes.delete(
    '/:id',
    validate(idSchema, 'params'),
    modeloDocumentoController.deletar,
);

export default modeloDocumentoRoutes;