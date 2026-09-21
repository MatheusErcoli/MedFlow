import { Request, Response } from 'express';

import documentoService from './documento.service';

import {
CriarDocumentoDTO,
AtualizarDocumentoDTO,
ListarDocumentoDTO,
} from './documento.schema';

import {
getValidatedBody,
getValidatedQuery,
getValidatedParams,
} from '../../utils/validated-data';

import { IdParams } from '../../types/common.types';

class DocumentoController {
    async listar(_req: Request, res: Response) {
        const { page, limit } = getValidatedQuery<ListarDocumentoDTO>(res);

        const resultado = await documentoService.listar(page, limit);

        return res.status(200).json(resultado);
    }

    async buscarPorId(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const documento = await documentoService.buscarPorId(id);

        return res.json(documento);
    }

    async criar(_req: Request, res: Response) {
        const data = getValidatedBody<CriarDocumentoDTO>(res);

        const documento = await documentoService.criar(data);

        return res.status(201).json(documento);
    }

    async atualizar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);
        const data = getValidatedBody<AtualizarDocumentoDTO>(res);

        const documento = await documentoService.atualizar(
            id,
            data,
        );

        return res.json(documento);
    }

    async deletar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        await documentoService.deletar(id);

        return res.status(204).send();
    }
}

export default new DocumentoController();