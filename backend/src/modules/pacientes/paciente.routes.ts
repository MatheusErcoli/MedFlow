import { Router } from 'express';

import pacienteController from './paciente.controller';

import {
    criarPacienteSchema,
    atualizarPacienteSchema,
    listarPacienteSchema,
    idSchema,
} from './paciente.schema';

import { validate } from '../../middlewares/validate.middleware';

const pacienteRoutes = Router();

