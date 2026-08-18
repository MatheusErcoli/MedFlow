import { z } from 'zod';

export const criarEspecialidadeSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, {
            message: 'O nome da especialidade deve ter no mínimo 3 caracteres.'
        })
        .max(100, {
            message: 'O nome da especialidade deve ter no máximo 100 caracteres.'
        }),
});

export type CriarEspecialidadeDTO = z.infer<
    typeof criarEspecialidadeSchema
>;

export const idSchema = z.object({
    id: z.coerce
        .number()
        .int()
        .positive({
            message: 'O ID deve ser um número inteiro positivo.',
        }),
});

export const atualizarEspecialidadeSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, {
            message: 'O nome da especialidade deve ter no mínimo 3 caracteres.'
        })
        .max(100, {
            message: 'O nome da especialidade deve ter no máximo 100 caracteres.'
        })
        .optional(),
});

export type AtualizarEspecialidadeDTO = z.infer<
    typeof atualizarEspecialidadeSchema
>;

export const listarEspecialidadeSchema = z.object({
    ativo: z
        .enum(['true', 'false'])
        .transform((valor) => valor === 'true')
        .default(true),
});

export type ListarEspecialidadeDTO = z.infer<
    typeof listarEspecialidadeSchema
>;