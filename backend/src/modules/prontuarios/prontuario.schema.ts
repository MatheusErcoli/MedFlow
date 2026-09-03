import { z } from 'zod';

export const criarProntuarioSchema = z.object({
    sessao_id: z
        .number({
            message: 'O ID da sessão é obrigatório.'
        })
        .int('O ID da sessão deve ser um número inteiro.')
        .positive('O ID da sessão deve ser maior que zero.'),

    titulo: z
        .string({
            message: 'O título é obrigatório.'
        })
        .trim()
        .min(1, 'O título é obrigatório.'),

    conteudo: z
        .string({
            message: 'O conteúdo deve ser um texto.'
        })
        .optional(),
});

export const atualizarProntuarioSchema = z.object({
    titulo: z
        .string({
            message: 'O título deve ser um texto.'
        })
        .trim()
        .min(1, 'O título não pode ser vazio.')
        .optional(),

    conteudo: z
        .string({
            message: 'O conteúdo deve ser um texto.'
        })
        .optional(),
});