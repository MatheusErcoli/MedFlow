import { z } from 'zod';

export const criarEspecialidadeSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, { message: 'O nome da especialidade deve ter no mínimo 3 caracteres.' })
        .max(100, { message: 'O nome da especialidade deve ter no máximo 100 caracteres.' }), 

});

export type CriarEspecialidadeDTO = z.infer<
    typeof criarEspecialidadeSchema
>;