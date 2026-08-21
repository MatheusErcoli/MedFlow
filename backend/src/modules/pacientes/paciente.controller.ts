import { Request, Response } from 'express';

import pacienteService from './paciente.service';

import {
    CriarPacienteDTO,
    AtualizarPacienteDTO,
    ListarPacienteDTO,
} from './paciente.schema';

import {
    getValidatedBody,
    getValidatedQuery,
    getValidatedParams,
} from '../../utils/validated-data';

import { IdParams } from '../../types/common.types';

class PacienteController {
    async listar(_req: Request, res: Response) {
        const { page, limit, status } = getValidatedQuery<ListarPacienteDTO>(res);

        const resultado =
            await pacienteService.listar({
                page,
                limit,
                status,
            });

        return res.json(resultado);
    }

    async buscarPorId(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const paciente = await pacienteService.buscarPorId(id);

        return res.json(paciente);
    }

    async criar(_req: Request, res: Response) {
        const data = getValidatedBody<CriarPacienteDTO>(res);

        const paciente = await pacienteService.criar(data);

        return res.status(201).json(paciente);
    }

    async atualizar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const data = getValidatedBody<AtualizarPacienteDTO>(res);

        const paciente = await pacienteService.atualizar(id, data);

        return res.json(paciente);
    }

    async inativar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const paciente = await pacienteService.inativar(id);

        return res.json(paciente);
    }

    async ativar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const paciente = await pacienteService.ativar(id);

        return res.json(paciente);
    }
}

export default new PacienteController();