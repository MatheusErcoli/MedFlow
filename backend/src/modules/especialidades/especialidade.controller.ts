import { Request, Response } from 'express';
import especialidadeService from './especialidade.service';
import { CriarEspecialidadeDTO } from './especialidade.schema';

class EspecialidadeController {
    async listar(_req: Request, res: Response) {
        const especialidades = await especialidadeService.listar();

        return res.json(especialidades);
    }

    async criar(req: Request, res: Response) {
        const data: CriarEspecialidadeDTO = req.body;

        const especialidade = await especialidadeService.criar(data);

        return res.status(201).json(especialidade);
    }

}

export default new EspecialidadeController();