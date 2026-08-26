import { Request, Response } from 'express';

import agendaService from './agenda.service';

import {
    criarAgendaSchema,
    atualizarAgendaSchema,
    listarAgendaSchema,
    idSchema,
} from './agenda.schema';

class AgendaController {
    async listar(req: Request, res: Response) {
        const dados = await listarAgendaSchema.parse(req.query);

        const resultado = await agendaService.listar(dados);

        return res.status(200).json(resultado);
    }

    async buscarPorId(req: Request, res: Response) {
        const { id } = await idSchema.parse(req.params);

        const agenda = await agendaService.buscarPorId(id);

        return res.status(200).json(agenda);
    }

    async criar(req: Request, res: Response) {
        const dados = await criarAgendaSchema.parse(req.body);

        const agenda = await agendaService.criar(dados);

        return res.status(201).json(agenda);
    }

    async atualizar(req: Request, res: Response) {
        const { id } = await idSchema.parse(req.params);

        const dados = await atualizarAgendaSchema.parse(req.body);

        const agenda = await agendaService.atualizar(id, dados);

        return res.status(200).json(agenda);
    }

    async cancelar(req: Request, res: Response) {
        const { id } = await idSchema.parse(req.params);

        await agendaService.cancelar(id);

        return res.status(204).send();
    }
}

export default new AgendaController();