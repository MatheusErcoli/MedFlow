import { Router } from "express";
import prontuarioController from "./prontuario.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  criarProntuarioSchema,
  atualizarProntuarioSchema,
} from "./prontuario.schema";

const prontuarioRoutes = Router();

prontuarioRoutes.post(
  "/",
  validate(criarProntuarioSchema),
  prontuarioController.criar,
);

prontuarioRoutes.get(
    "/:id",
    prontuarioController.buscarPorId
);

prontuarioRoutes.patch(
  "/:id",
  validate(atualizarProntuarioSchema),
  prontuarioController.atualizar,
);

export default prontuarioRoutes;