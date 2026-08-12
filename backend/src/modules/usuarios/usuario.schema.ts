import { z } from 'zod';

export const criarUsuarioSchema = z.object({
    especialidade_id: z
    .number()
    .int()
    .positive({
        message: 'A especialidade é obrigatória.'
    }),

    nome: z
    .string()
    .trim()
    .min(3, {
        message: 'O nome deve ter no mínimo 3 caracteres.'
    })
    .max(100, {
        message: 'O nome deve ter no máximo 100 caracteres.'
    }),

    email: z
        .string()
        .trim()
        .email({
            message: 'Informe um email válido.',
        }),

    senha: z
        .string()
        .min(6, {
            message: 'A senha deve ter no mínimo 6 caracteres.',
        }),

    telefone: z
        .string()
        .trim()
        .optional(),

    cpf: z
        .string()
        .trim()
        .optional(),

    registro_profissional: z
        .string()
        .trim()
        .optional(),

    foto: z
        .string()
        .trim()
        .optional(),
});

export type CriarUsuarioDTO = z.infer<typeof criarUsuarioSchema>;

export const atualizarUsuarioSchema = z.object({
    especialidade_id: z
        .number()
        .int()
        .positive({
            message: 'A especialidade é obrigatória.'
        })
        .optional(),

    nome: z
        .string()
        .trim()
        .min(3, {
            message: 'O nome deve ter no mínimo 3 caracteres.'
        })
        .max(100, {
            message: 'O nome deve ter no máximo 100 caracteres.'
        })
        .optional(),
    
    email: z
        .string()
        .trim()
        .email({
            message: 'Informe um email válido.',
        })
        .optional(),

    senha: z
        .string()
        .min(6, {
            message: 'A senha deve ter no mínimo 6 caracteres.',
        })
        .optional(),

    telefone: z
        .string()
        .trim()
        .optional(),

    cpf: z
        .string()
        .trim()
        .optional(),

    registro_profissional: z
        .string()
        .trim()
        .optional(),

    foto: z
        .string()
        .trim()
        .optional(),
});

export type AtualizarUsuarioDTO = z.infer<
    typeof atualizarUsuarioSchema
>;

export const listarUsuarioSchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .default(20),
});

export type ListarUsuarioDTO = z.infer<
    typeof listarUsuarioSchema
>;