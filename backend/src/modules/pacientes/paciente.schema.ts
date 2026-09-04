import { z } from 'zod';

export const criarPacienteSchema = z.object({

    usuario_id: z
        .number({
            error: 'O ID do usuário é obrigatório.',
        })
        .int()
        .positive({
            message: 'O usuário é obrigatório.',
        }),

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

    foto: z
        .string()
        .trim()
        .optional(),

    cpf: z
        .string({
            error: 'O CPF é obrigatório.',
        })
        .trim()
        .regex(
            /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
            'Informe um CPF válido.'
        ),

    sexo: z
        .string()
        .trim()
        .optional(),

    data_nascimento: z
        .coerce
        .date()
        .optional(),

    estado_civil: z
        .string()
        .trim()
        .optional(),

    telefone: z
        .string()
        .trim()
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    email: z
        .string({
            error: 'O email é obrigatório.',
        })
        .trim()
        .email({
            message: 'Informe um email válido.',
        }),

    cep: z
        .string()
        .trim()
        .optional(),

    logradouro: z
        .string()
        .trim()
        .optional(),

    numero: z
        .string()
        .trim()
        .optional(),

    complemento: z
        .string()
        .trim()
        .optional(),

    bairro: z
        .string()
        .trim()
        .optional(),

    cidade: z
        .string()
        .trim()
        .optional(),

    estado: z
        .string()
        .trim()
        .optional(),

    profissao: z
        .string()
        .trim()
        .optional(),

    contato_emergencia: z
        .string()
        .trim()
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    telefone_emergencia: z
        .string()
        .trim()
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    observacoes: z
        .string()
        .trim()
        .optional(),
});

export type CriarPacienteDTO = z.infer<
    typeof criarPacienteSchema
>;


export const atualizarPacienteSchema = z.object({

    usuario_id: z
        .number()
        .int()
        .positive({
            message: 'O usuário deve ser um número inteiro positivo.',
        })
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

    foto: z
        .string()
        .trim()
        .optional(),

    cpf: z
        .string()
        .trim()
        .regex(
            /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
            'Informe um CPF válido.'
        )
        .optional(),

    sexo: z
        .string()
        .trim()
        .optional(),

    data_nascimento: z
        .coerce
        .date()
        .optional(),

    estado_civil: z
        .string()
        .trim()
        .optional(),

    telefone: z
        .string()
        .trim()
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    email: z
        .string()
        .trim()
        .email({
            message: 'Informe um email válido.',
        })
        .optional(),

    cep: z
        .string()
        .trim()
        .optional(),

    logradouro: z
        .string()
        .trim()
        .optional(),

    numero: z
        .string()
        .trim()
        .optional(),

    complemento: z
        .string()
        .trim()
        .optional(),

    bairro: z
        .string()
        .trim()
        .optional(),

    cidade: z
        .string()
        .trim()
        .optional(),

    estado: z
        .string()
        .trim()
        .optional(),

    profissao: z
        .string()
        .trim()
        .optional(),

    contato_emergencia: z
        .string()
        .trim()
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    telefone_emergencia: z
        .string()
        .trim()
        .min(10, 'Informe um telefone válido.')
        .max(15, 'Informe um telefone válido.')
        .optional(),

    observacoes: z
        .string()
        .trim()
        .optional(),

    status: z
        .enum(['ativo', 'inativo'], {
            message: 'O status deve ser ativo ou inativo.',
        })
        .optional(),
});

export type AtualizarPacienteDTO = z.infer<
    typeof atualizarPacienteSchema
>;


export const listarPacienteSchema = z.object({

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

export type ListarPacienteDTO = z.infer<
    typeof listarPacienteSchema
>;


export const idSchema = z.object({

    id: z.coerce
        .number({
            error: 'O ID é obrigatório.',
        })
        .int()
        .positive({
            message: 'O ID deve ser um número inteiro positivo.',
        }),
});