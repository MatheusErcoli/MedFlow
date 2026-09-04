import { z } from 'zod';

export const criarEspecialidadeSchema = z.object({
    nome: z
        .string({
            error: 'O nome da especialidade é obrigatório.',
        })
        .trim()
        .min(3, {
            message:
                'O nome da especialidade deve ter no mínimo 3 caracteres.',
        })
        .max(100, {
            message:
                'O nome da especialidade deve ter no máximo 100 caracteres.',
        }),
});

export type CriarEspecialidadeDTO = z.infer<
    typeof criarEspecialidadeSchema
>;

export const atualizarEspecialidadeSchema = z.object({
    nome: z
        .string({
            error: 'O nome da especialidade deve ser um texto.',
        })
        .trim()
        .min(3, {
            message:
                'O nome da especialidade deve ter no mínimo 3 caracteres.',
        })
        .max(100, {
            message:
                'O nome da especialidade deve ter no máximo 100 caracteres.',
        })
        .optional(),
});

export type AtualizarEspecialidadeDTO = z.infer<
    typeof atualizarEspecialidadeSchema
>;

export const listarEspecialidadeSchema = z.object({
    ativo: z
        .enum(['true', 'false'], {
            message: 'O campo ativo deve ser true ou false.',
        })
        .transform((valor) => valor === 'true')
        .default(true),
});

export type ListarEspecialidadeDTO = z.infer<
    typeof listarEspecialidadeSchema
>;

export const idSchema = z.object({
    id: z.coerce
        .number({
            error: 'O ID é obrigatório.',
        })
        .int('O ID deve ser um número inteiro.')
        .positive('O ID deve ser maior que zero.'),
});