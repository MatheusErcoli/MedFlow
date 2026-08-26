import { Router } from 'express';

import especialidadeRoutes from '../modules/especialidades/especialidade.routes';
import usuarioRoutes from '../modules/usuarios/usuario.routes';
import pacienteRoutes from '../modules/pacientes/paciente.routes';
import agendaRoutes from '../modules/agenda/agenda.routes';

const router = Router();

router.use('/especialidades', especialidadeRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/pacientes', pacienteRoutes);
router.use('/agenda', agendaRoutes);

export default router;