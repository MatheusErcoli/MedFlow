import { Router } from 'express';
import especialidadeController from './especialidade.controller';

const especialidadeRoutes = Router();

especialidadeRoutes.get('/', especialidadeController.listar);

export default especialidadeRoutes;
