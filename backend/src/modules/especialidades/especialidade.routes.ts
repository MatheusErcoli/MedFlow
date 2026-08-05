import { Router } from 'express';
import especialidadeController from './especialidade.controller';
import { criarEspecialidadeSchema } from './especialidade.schema';
import { validate } from '../../middlewares/validate.middleware';

const especialidadeRoutes = Router();

especialidadeRoutes.get('/', especialidadeController.listar);

especialidadeRoutes.post('/', 
    validate(criarEspecialidadeSchema),
    especialidadeController.criar
)

export default especialidadeRoutes;
