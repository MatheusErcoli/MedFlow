import { Request, Response } from 'express';

import sessaoService from './sessao.service';

class SessaoController {

    async listar(req: Request, res: Response) {
        const sessoes = await sessaoService.listar();

        return res.status(200).json(sessoes);
    }

    async buscarPorId(req: Request, res: Response) {
        const id = Number(req.params.id);

        const sessao = await sessaoService.buscarPorId(id);

        return res.status(200).json(sessao);
    }

    async criar(req: Request, res: Response) {
        const sessao = await sessaoService.criar(req.body);

        return res.status(201).json(sessao);
    }

    async atualizar(req: Request, res: Response) {
        const id = Number(req.params.id);

        const sessao = await sessaoService.atualizar(
            id,
            req.body
        );

        return res.status(200).json(sessao);
    }

    async finalizar(req: Request, res: Response) {
        const id = Number(req.params.id);

        const sessao = await sessaoService.finalizar(id);

        return res.status(200).json(sessao);
    }

    async deletar(req: Request, res: Response) {
        const id = Number(req.params.id);

        await sessaoService.deletar(id);

        return res.status(204).send();
    }
}

export default new SessaoController();