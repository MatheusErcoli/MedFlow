import { z } from "zod";

export const criarProntuarioSchema = z.object({
  sessao_id: z.number().int().positive(),

  titulo: z.string().trim().min(1),

  conteudo: z.string().optional(),
});

export const atualizarProntuarioSchema = z.object({
  titulo: z.string().trim().min(1).optional(),

  conteudo: z.string().optional(),
});
