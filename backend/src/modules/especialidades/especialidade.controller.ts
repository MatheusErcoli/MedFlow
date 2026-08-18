import { Request, Response } from 'express';

import especialidadeService from './especialidade.service';

import {
    AtualizarEspecialidadeDTO,
    CriarEspecialidadeDTO,
    ListarEspecialidadeDTO,
} from './especialidade.schema';

import {
    getValidatedBody,
    getValidatedQuery,
    getValidatedParams,
} from '../../utils/validated-data';

import { IdParams } from '../../types/common.types';

class EspecialidadeController {
    async listar(_req: Request, res: Response) {
        const { ativo } =
            getValidatedQuery<ListarEspecialidadeDTO>(res);

        const especialidades =
            await especialidadeService.listar(ativo);

        return res.json(especialidades);
    }

    async buscarPorId(_req: Request, res: Response) {
        const { id } =
            getValidatedParams<IdParams>(res);

        const especialidade =
            await especialidadeService.buscarPorId(id);

        return res.json(especialidade);
    }

    async criar(_req: Request, res: Response) {
        const data =
            getValidatedBody<CriarEspecialidadeDTO>(res);

        const especialidade =
            await especialidadeService.criar(data);

        return res.status(201).json(especialidade);
    }

    async atualizar(_req: Request, res: Response) {
        const { id } =
            getValidatedParams<IdParams>(res);

        const data =
            getValidatedBody<AtualizarEspecialidadeDTO>(res);

        const especialidade =
            await especialidadeService.atualizar(id, data);

        return res.json(especialidade);
    }

    async ativar(_req: Request, res: Response) {
        const { id } =
            getValidatedParams<IdParams>(res);

        const especialidade =
            await especialidadeService.ativar(id);

        return res.json(especialidade);
    }

    async inativar(_req: Request, res: Response) {
        const { id } =
            getValidatedParams<IdParams>(res);

        const especialidade =
            await especialidadeService.inativar(id);

        return res.json(especialidade);
    }
}

export default new EspecialidadeController();