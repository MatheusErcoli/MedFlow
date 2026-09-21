import { z } from 'zod';

export const tiposModeloDocumento = [
    'atestado',
    'laudo',
    'relatorio',
    'declaracao',
    'encaminhamento',
    'outro',
] as const;

export const criarModeloDocumentoSchema = z.object({
    usuario_id: z.coerce
        .number({
            error: 'O ID do usuário é obrigatório.',
        })
        .int('O ID do usuário deve ser um número inteiro.')
        .positive('O ID do usuário deve ser maior que zero.'),

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

    tipo: z.enum(tiposModeloDocumento, {
        message:
            'O tipo deve ser: atestado, laudo, relatorio, declaracao, encaminhamento ou outro.',
    }),

    conteudo: z
        .string({
            error: 'O conteúdo é obrigatório.',
        })
        .trim()
        .min(1, 'O conteúdo é obrigatório.'),
});

export type CriarModeloDocumentoDTO =
    z.infer<typeof criarModeloDocumentoSchema>;


export const atualizarModeloDocumentoSchema = z.object({
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

    tipo: z
        .enum(tiposModeloDocumento, {
            message:
                'O tipo deve ser: atestado, laudo, relatorio, declaracao, encaminhamento ou outro.',
        })
        .optional(),

    conteudo: z
        .string({
            error: 'O conteúdo deve ser um texto.',
        })
        .trim()
        .min(1, 'O conteúdo não pode ser vazio.')
        .optional(),
});

export type AtualizarModeloDocumentoDTO =
    z.infer<typeof atualizarModeloDocumentoSchema>;


export const listarModeloDocumentoSchema = z.object({
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

export type ListarModeloDocumentoDTO =
    z.infer<typeof listarModeloDocumentoSchema>;


export const idSchema = z.object({
    id: z.coerce
        .number({
            error: 'O ID é obrigatório.',
        })
        .int('O ID deve ser um número inteiro.')
        .positive('O ID deve ser maior que zero.'),
});

