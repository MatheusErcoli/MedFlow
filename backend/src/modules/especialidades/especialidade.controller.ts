import { Request, Response } from 'express';
import especialidadeService from './especialidade.service';

class EspecialidadeController {
    async listar(_req: Request, res: Response) {
        const especialidades = await especialidadeService.listar();

        return res.json(especialidades);
    }

}

export default new EspecialidadeController();