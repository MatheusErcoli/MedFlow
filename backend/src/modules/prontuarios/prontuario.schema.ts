import { z } from 'zod';

export const criarProntuarioSchema = z.object({

    sessao_id: z
        .number({
            error: 'O ID da sessão é obrigatório.',
        })
        .int('O ID da sessão deve ser um número inteiro.')
        .positive('O ID da sessão deve ser maior que zero.'),

    titulo: z
        .string({
            error: 'O título é obrigatório.',
        })
        .trim()
        .min(1, 'O título é obrigatório.')
        .max(255, 'O título deve ter no máximo 255 caracteres.'),

    conteudo: z
        .string({
            error: 'O conteúdo deve ser um texto.',
        })
        .trim()
        .optional(),
});


export const atualizarProntuarioSchema = z.object({

    titulo: z
        .string({
            error: 'O título deve ser um texto.',
        })
        .trim()
        .min(1, 'O título não pode ser vazio.')
        .max(255, 'O título deve ter no máximo 255 caracteres.')
        .optional(),

    conteudo: z
        .string({
            error: 'O conteúdo deve ser um texto.',
        })
        .trim()
        .optional(),
});


export const idSchema = z.object({

    id: z
        .coerce
        .number({
            error: 'O ID é obrigatório.',
        })
        .int('O ID deve ser um número inteiro.')
        .positive('O ID deve ser maior que zero.'),
});


export type CriarProntuarioDTO = z.infer<
    typeof criarProntuarioSchema
>;

export type AtualizarProntuarioDTO = z.infer<
    typeof atualizarProntuarioSchema
>;