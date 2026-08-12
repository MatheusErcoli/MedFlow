import { Request, Response } from 'express';

import usuarioService from './usuario.service';
import { CriarUsuarioDTO, AtualizarUsuarioDTO, } from './usuario.schema';

class UsuarioController {
    async listar(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const usuarios = await usuarioService.listar({
            page,
            limit,
        });

        return res.json(usuarios);
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
}

export default new UsuarioController();