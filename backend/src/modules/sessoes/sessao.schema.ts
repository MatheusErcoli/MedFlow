import { z } from 'zod';

export const criarSessaoSchema = z.object({
    agenda_id: z.number({
        error: (issue) => {
            if (issue.input === undefined) {
                return 'O campo agenda_id é obrigatório.';
            }

            return 'O campo agenda_id deve ser um número.';
        },
    })
    .int('O campo agenda_id deve ser um número inteiro.')
    .positive('O campo agenda_id deve ser maior que zero.'),
    valor: z
        .number({
            error: 'O campo valor deve ser um número.',
        })
        .nonnegative('O campo valor não pode ser negativo.')
        .optional(),

    observacoes: z
        .string({
            error: 'O campo observacoes deve ser uma string.',
        })
        .optional(),
});

export const atualizarSessaoSchema = z.object({
    inicio: z
        .coerce
        .date({
            error: 'O campo inicio deve ser uma data válida.',
        })
        .nullable()
        .optional(),

    fim: z
        .coerce
        .date({
            error: 'O campo fim deve ser uma data válida.',
        })
        .nullable()
        .optional(),

    valor: z
        .number({
            error: 'O campo valor deve ser um número.',
        })
        .nonnegative('O campo valor não pode ser negativo.')
        .nullable()
        .optional(),

    pago: z
        .boolean({
            error: 'O campo pago deve ser verdadeiro ou falso.',
        })
        .optional(),

    realizada: z
        .boolean({
            error: 'O campo realizada deve ser verdadeiro ou falso.',
        })
        .optional(),

    observacoes: z
        .string({
            error: 'O campo observacoes deve ser uma string.',
        })
        .nullable()
        .optional(),
});