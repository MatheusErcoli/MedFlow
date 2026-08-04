import { Router } from 'express';

import especialidadeRoutes from '../modules/especialidades/especialidade.routes';

const router = Router();

router.use('/especialidades', especialidadeRoutes);

export default router;