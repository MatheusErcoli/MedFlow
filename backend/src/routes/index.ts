import { Router } from 'express';

import especialidadeRoutes from '../modules/especialidades/especialidade.routes';
import usuarioRoutes from '../modules/usuarios/usuario.routes';
import pacienteRoutes from '../modules/pacientes/paciente.routes';
import agendaRoutes from '../modules/agenda/agenda.routes';
import sessoesRoutes from '../modules/sessoes/sessao.routes';
import prontuarioRoutes from '../modules/prontuarios/prontuario.routes';

const router = Router();

router.use('/especialidades', especialidadeRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/pacientes', pacienteRoutes);
router.use('/agenda', agendaRoutes);
router.use('/sessoes', sessoesRoutes);
router.use('/prontuarios', prontuarioRoutes);

export default router;