import { Request, Response } from 'express';

import usuarioService from './usuario.service';
import { CriarUsuarioDTO } from './usuario.schema';

class UsuarioController {
    async listar(_req: Request, res: Response) {
        const usuarios = await usuarioService.listar();

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
}

export default new UsuarioController();