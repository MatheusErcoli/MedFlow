import { Router } from 'express';

import especialidadeRoutes from '../modules/especialidades/especialidade.routes';
import usuarioRoutes from '../modules/usuarios/usuario.routes';

const router = Router();

router.use('/especialidades', especialidadeRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;