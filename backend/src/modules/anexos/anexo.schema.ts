import { z } from 'zod';

export const tiposAnexo = [
    'exame',
    'documento',
    'imagem',
    'comprovante',
    'outro',
] as const;

export const criarAnexoSchema = z.object({
    usuario_id: z.coerce
        .number({
            error: 'O ID do usuário é obrigatório.',
        })
        .int('O ID do usuário deve ser um número inteiro.')
        .positive('O ID do usuário deve ser maior que zero.'),

    paciente_id: z.coerce
        .number({
            error: 'O ID do paciente é obrigatório.',
        })
        .int('O ID do paciente deve ser um número inteiro.')
        .positive('O ID do paciente deve ser maior que zero.'),

    sessao_id: z.coerce
        .number({
            error: 'O ID da sessão deve ser um número.',
        })
        .int('O ID da sessão deve ser um número inteiro.')
        .positive('O ID da sessão deve ser maior que zero.')
        .nullable()
        .optional(),

    nome: z
        .string({
            error: 'O nome é obrigatório.',
        })
        .trim()
        .min(1, 'O nome é obrigatório.')
        .max(255, 'O nome deve ter no máximo 255 caracteres.'),

    descricao: z
        .string({
            error: 'A descrição deve ser um texto.',
        })
        .trim()
        .nullable()
        .optional(),

    caminho_arquivo: z
        .string({
            error: 'O caminho do arquivo é obrigatório.',
        })
        .trim()
        .min(1, 'O caminho do arquivo é obrigatório.'),

    tipo: z.enum(tiposAnexo, {
        message:
            'O tipo deve ser: exame, documento, imagem, comprovante ou outro.',
    }),

    mime_type: z
        .string({
            error: 'O tipo MIME é obrigatório.',
        })
        .trim()
        .min(1, 'O tipo MIME é obrigatório.'),

    tamanho_bytes: z.coerce
        .number({
            error: 'O tamanho do arquivo é obrigatório.',
        })
        .int('O tamanho do arquivo deve ser um número inteiro.')
        .positive('O tamanho do arquivo deve ser maior que zero.'),
});

export type CriarAnexoDTO = z.infer<typeof criarAnexoSchema>;


export const atualizarAnexoSchema = z.object({
    usuario_id: z.coerce
        .number({
            error: 'O ID do usuário deve ser um número.',
        })
        .int('O ID do usuário deve ser um número inteiro.')
        .positive('O ID do usuário deve ser maior que zero.')
        .optional(),

    paciente_id: z.coerce
        .number({
            error: 'O ID do paciente deve ser um número.',
        })
        .int('O ID do paciente deve ser um número inteiro.')
        .positive('O ID do paciente deve ser maior que zero.')
        .optional(),

    sessao_id: z.coerce
        .number({
            error: 'O ID da sessão deve ser um número.',
        })
        .int('O ID da sessão deve ser um número inteiro.')
        .positive('O ID da sessão deve ser maior que zero.')
        .nullable()
        .optional(),

    nome: z
        .string({
            error: 'O nome deve ser um texto.',
        })
        .trim()
        .min(1, 'O nome não pode ser vazio.')
        .max(255, 'O nome deve ter no máximo 255 caracteres.')
        .optional(),

    descricao: z
        .string({
            error: 'A descrição deve ser um texto.',
        })
        .trim()
        .nullable()
        .optional(),

    caminho_arquivo: z
        .string({
            error: 'O caminho do arquivo deve ser um texto.',
        })
        .trim()
        .min(1, 'O caminho do arquivo não pode ser vazio.')
        .optional(),

    tipo: z
        .enum(tiposAnexo, {
            message:
                'O tipo deve ser: exame, documento, imagem, comprovante ou outro.',
        })
        .optional(),

    mime_type: z
        .string({
            error: 'O tipo MIME deve ser um texto.',
        })
        .trim()
        .min(1, 'O tipo MIME não pode ser vazio.')
        .optional(),

    tamanho_bytes: z.coerce
        .number({
            error: 'O tamanho do arquivo deve ser um número.',
        })
        .int('O tamanho do arquivo deve ser um número inteiro.')
        .positive('O tamanho do arquivo deve ser maior que zero.')
        .optional(),
});

export type AtualizarAnexoDTO =
    z.infer<typeof atualizarAnexoSchema>;


export const listarAnexoSchema = z.object({
    page: z.coerce
        .number({
            error: 'A página deve ser um número.',
        })
        .int('A página deve ser um número inteiro.')
        .positive('A página deve ser maior que zero.')
        .default(1),

    limit: z.coerce
        .number({
            error: 'O limite deve ser um número.',
        })
        .int('O limite deve ser um número inteiro.')
        .positive('O limite deve ser maior que zero.')
        .max(100, 'O limite deve ser no máximo 100.')
        .default(10),
});

export type ListarAnexoDTO =
    z.infer<typeof listarAnexoSchema>;


export const idSchema = z.object({
    id: z.coerce
        .number({
            error: 'O ID é obrigatório.',
        })
        .int('O ID deve ser um número inteiro.')
        .positive('O ID deve ser maior que zero.'),
});