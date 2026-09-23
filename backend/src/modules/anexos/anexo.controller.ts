import { Request, Response } from 'express';

import anexoService from './anexo.service';

import {
    getValidatedBody,
    getValidatedQuery,
    getValidatedParams,
} from '../../utils/validated-data';

import {
    AtualizarAnexoDTO,
    CriarAnexoDTO,
    ListarAnexoDTO,
} from './anexo.schema';

export class AnexoController {
    async listar(req: Request, res: Response) {
        const { page, limit } =
            getValidatedQuery<ListarAnexoDTO>(res);

        const resultado = await anexoService.listar(
            page,
            limit,
        );

        return res.status(200).json(resultado);
    }

    async buscarPorId(req: Request, res: Response) {
        const { id } =
            getValidatedParams<{ id: number }>(res);

        const anexo = await anexoService.buscarPorId(id);

        return res.status(200).json(anexo);
    }

    async criar(req: Request, res: Response) {
        const dados =
            getValidatedBody<CriarAnexoDTO>(res);

        const anexo = await anexoService.criar(dados);

        return res.status(201).json(anexo);
    }

    async atualizar(req: Request, res: Response) {
        const { id } =
            getValidatedParams<{ id: number }>(res);

        const dados =
            getValidatedBody<AtualizarAnexoDTO>(res);

        const anexo = await anexoService.atualizar(
            id,
            dados,
        );

        return res.status(200).json(anexo);
    }

    async deletar(req: Request, res: Response) {
        const { id } =
            getValidatedParams<{ id: number }>(res);

        await anexoService.deletar(id);

        return res.status(204).send();
    }
}

export default new AnexoController();