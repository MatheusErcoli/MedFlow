import { Request, Response } from 'express';

import modeloDocumentoService from './modelo-documento.service';

import {
    CriarModeloDocumentoDTO,
    AtualizarModeloDocumentoDTO,
    ListarModeloDocumentoDTO,
} from './modelo-documento.schema';

import {
    getValidatedBody,
    getValidatedQuery,
    getValidatedParams,
} from '../../utils/validated-data';

import { IdParams } from '../../types/common.types';

class ModeloDocumentoController {
    async listar(_req: Request, res: Response) {
        const { page, limit } = getValidatedQuery<ListarModeloDocumentoDTO>(res);

        const resultado = await modeloDocumentoService.listar(page, limit);

        return res.json(resultado);
    }

    async buscarPorId(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const modelo = await modeloDocumentoService.buscarPorId(id);

        return res.json(modelo);
    }

    async criar(_req: Request, res: Response) {
        const dados = getValidatedBody<CriarModeloDocumentoDTO>(res);

        const modelo = await modeloDocumentoService.criar(dados);

        return res.status(201).json(modelo);
    }

    async atualizar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const dados = getValidatedBody<AtualizarModeloDocumentoDTO>(res);

        const modelo = await modeloDocumentoService.atualizar(id, dados);

        return res.json(modelo);
    }

    async deletar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        await modeloDocumentoService.deletar(id);

        return res.status(204).send();
    }
}

export default new ModeloDocumentoController();