import { Request, Response } from "express";
import prontuarioService from "./prontuario.service";

class ProntuarioController {
  async criar(req: Request, res: Response) {
    const prontuario = await prontuarioService.criar(req.body);

    return res.status(201).json(prontuario);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);

    const prontuario = await prontuarioService.buscarPorId(id);
    
    return res.status(200).json(prontuario);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    
    const prontuario = await prontuarioService.atualizar(id, req.body);
    
    return res.status(200).json(prontuario);
  }
}

export default new ProntuarioController();