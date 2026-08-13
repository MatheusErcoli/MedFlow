import { Request, Response } from 'express';

import usuarioService from './usuario.service';
import { CriarUsuarioDTO, AtualizarUsuarioDTO, } from './usuario.schema';

class UsuarioController {
    async listar(_req: Request, res: Response) {
        const { page, limit, status } = res.locals.dadosValidados;

        const resultado = await usuarioService.listar({
            page,
            limit,
            status,
        });

        return res.json(resultado);
    }

    async buscarPorId(req: Request, res: Response) {
        const id = Number(req.params.id);

        const usuario = await usuarioService.buscarPorId(id);

        return res.json(usuario);
    }

    async criar(req: Request, res: Response) {
        const data: CriarUsuarioDTO = req.body;

        const usuario = await usuarioService.criar(data);

        return res.status(201).json(usuario);
    }

    async atualizar(req: Request, res: Response) {
        const id = Number(req.params.id);

        const data: AtualizarUsuarioDTO = req.body;

        const usuario = await usuarioService.atualizar(
            id,
            data
        );

        return res.json(usuario);
    }

    async deletar(req: Request, res: Response) {
        const id = Number(req.params.id);

        await usuarioService.deletar(id);

        return res.status(204).send();
    }

    async inativar(req: Request, res: Response) {
        const id = Number(req.params.id);

        const usuario = await usuarioService.inativar(id);

        return res.json(usuario);
    }

    async ativar(req: Request, res: Response) {
        const id = Number(req.params.id);

        const usuario = await usuarioService.ativar(id);

        return res.json(usuario);
    }
}

export default new UsuarioController();