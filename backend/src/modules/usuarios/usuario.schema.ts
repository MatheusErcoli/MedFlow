import { z } from 'zod';

export const criarUsuarioSchema = z.object({

    especialidade_id: z
        .number({
            error: (issue) => {
                if (issue.input === undefined) {
                    return 'O campo especialidade_id é obrigatório.';
                }

                return 'O campo especialidade_id deve ser um número.';
            },
        })
        .int('O campo especialidade_id deve ser um número inteiro.')
        .positive('O campo especialidade_id deve ser maior que zero.'),

    nome: z
        .string({
            error: 'O nome é obrigatório.',
        })
        .trim()
        .min(3, {
            message: 'O nome deve ter no mínimo 3 caracteres.',
        })
        .max(100, {
            message: 'O nome deve ter no máximo 100 caracteres.',
        }),

    email: z
        .string({
            error: 'O email é obrigatório.',
        })
        .trim()
        .email({
            message: 'Informe um email válido.',
        }),

    senha: z
        .string({
            error: 'A senha é obrigatória.',
        })
        .min(6, {
            message: 'A senha deve ter no mínimo 6 caracteres.',
        }),

    telefone: z
        .string()
        .trim()
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    cpf: z
        .string()
        .trim()
        .regex(
            /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
            'Informe um CPF válido.'
        )
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

export type CriarUsuarioDTO = z.infer<
    typeof criarUsuarioSchema
>;


export const atualizarUsuarioSchema = z.object({

    especialidade_id: z
        .number()
        .int('O campo especialidade_id deve ser um número inteiro.')
        .positive('O campo especialidade_id deve ser maior que zero.')
        .optional(),

    nome: z
        .string()
        .trim()
        .min(3, {
            message: 'O nome deve ter no mínimo 3 caracteres.',
        })
        .max(100, {
            message: 'O nome deve ter no máximo 100 caracteres.',
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
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    cpf: z
        .string()
        .trim()
        .regex(
            /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
            'Informe um CPF válido.'
        )
        .optional(),

    registro_profissional: z
        .string()
        .trim()
        .optional(),

    foto: z
        .string()
        .trim()
        .optional(),

    status: z
        .enum(['ativo', 'inativo'], {
            message: 'O status deve ser ativo ou inativo.',
        })
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
        .default(10),

    status: z
        .enum(['ativo', 'inativo'], {
            message: 'O status deve ser ativo ou inativo.',
        })
        .default('ativo'),
});

export type ListarUsuarioDTO = z.infer<
    typeof listarUsuarioSchema
>;


export const idSchema = z.object({

    id: z
        .coerce
        .number({
            error: 'O ID é obrigatório.',
        })
        .int('O ID deve ser um número inteiro.')
        .positive('O ID deve ser maior que zero.'),
});