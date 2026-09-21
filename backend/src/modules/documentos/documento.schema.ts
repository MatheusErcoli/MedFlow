import { z } from 'zod';

export const tiposDocumento = [
    'atestado',
    'laudo',
    'relatorio',
    'declaracao',
    'encaminhamento',
    'outro',
] as const;

export const criarDocumentoSchema = z.object({
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

    modelo_documento_id: z.coerce
        .number({
            error: 'O ID do modelo de documento deve ser um número.',
        })
        .int('O ID do modelo de documento deve ser um número inteiro.')
        .positive('O ID do modelo de documento deve ser maior que zero.')
        .nullable()
        .optional(),

    titulo: z
        .string({
            error: 'O título é obrigatório.',
        })
        .trim()
        .min(1, 'O título é obrigatório.')
        .max(255, 'O título deve ter no máximo 255 caracteres.'),

    tipo: z.enum(tiposDocumento, {
        message:
            'O tipo deve ser: atestado, laudo, relatorio, declaracao, encaminhamento ou outro.',
    }),

    caminho_arquivo: z
        .string({
            error: 'O caminho do arquivo deve ser um texto.',
        })
        .trim()
        .nullable()
        .optional(),

    observacoes: z
        .string({
            error: 'As observações devem ser um texto.',
        })
        .trim()
        .nullable()
        .optional(),
});

export type CriarDocumentoDTO = z.infer<
    typeof criarDocumentoSchema
>;


export const atualizarDocumentoSchema = z.object({
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

    modelo_documento_id: z.coerce
        .number({
            error: 'O ID do modelo de documento deve ser um número.',
        })
        .int('O ID do modelo de documento deve ser um número inteiro.')
        .positive('O ID do modelo de documento deve ser maior que zero.')
        .nullable()
        .optional(),

    titulo: z
        .string({
            error: 'O título deve ser um texto.',
        })
        .trim()
        .min(1, 'O título não pode ser vazio.')
        .max(255, 'O título deve ter no máximo 255 caracteres.')
        .optional(),

    tipo: z
        .enum(tiposDocumento, {
            message:
                'O tipo deve ser: atestado, laudo, relatorio, declaracao, encaminhamento ou outro.',
        })
        .optional(),

    caminho_arquivo: z
        .string({
            error: 'O caminho do arquivo deve ser um texto.',
        })
        .trim()
        .nullable()
        .optional(),

    observacoes: z
        .string({
            error: 'As observações devem ser um texto.',
        })
        .trim()
        .nullable()
        .optional(),
});

export type AtualizarDocumentoDTO = z.infer<
    typeof atualizarDocumentoSchema
>;

export const listarDocumentoSchema = z.object({

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

export type ListarDocumentoDTO = z.infer<
    typeof listarDocumentoSchema
>;


export const idSchema = z.object({
    id: z.coerce
        .number({
            error: 'O ID é obrigatório.',
        })
        .int('O ID deve ser um número inteiro.')
        .positive('O ID deve ser maior que zero.'),
});

