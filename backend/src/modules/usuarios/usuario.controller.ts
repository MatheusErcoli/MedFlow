import { Request, Response } from 'express';

import usuarioService from './usuario.service';

import {
    CriarUsuarioDTO,
    AtualizarUsuarioDTO,
    ListarUsuarioDTO,
} from './usuario.schema';

import {
    getValidatedBody,
    getValidatedQuery,
    getValidatedParams,
} from '../../utils/validated-data';

import { IdParams } from '../../types/common.types';

class UsuarioController {
    async listar(_req: Request, res: Response) {
        const { page, limit, status } = getValidatedQuery<ListarUsuarioDTO>(res);

        const resultado =
            await usuarioService.listar({
                page,
                limit,
                status,
            });

        return res.json(resultado);
    }

    async buscarPorId(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const usuario = await usuarioService.buscarPorId(id);

        return res.json(usuario);
    }

    async criar(_req: Request, res: Response) {
        const data = getValidatedBody<CriarUsuarioDTO>(res);

        const usuario = await usuarioService.criar(data);

        return res.status(201).json(usuario);
    }

    async atualizar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const data = getValidatedBody<AtualizarUsuarioDTO>(res);

        const usuario = await usuarioService.atualizar(id, data);

        return res.json(usuario);
    }

    async deletar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        await usuarioService.deletar(id);

        return res.status(204).send();
    }

    async inativar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const usuario = await usuarioService.inativar(id);

        return res.json(usuario);
    }

    async ativar(_req: Request, res: Response) {
        const { id } = getValidatedParams<IdParams>(res);

        const usuario = await usuarioService.ativar(id);

        return res.json(usuario);
    }
}

export default new UsuarioController();