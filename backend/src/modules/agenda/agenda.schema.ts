import { z } from 'zod';

const dataHoraSchema = z.coerce.date();

export const criarAgendaSchema = z.object({
    usuario_id: z
        .number()
        .int()
        .positive(),

    paciente_id: z
        .number()
        .int()
        .positive()
        .optional(),

    titulo: z
        .string()
        .trim()
        .min(1, 'O título é obrigatório.')
        .max(255, 'O título deve ter no máximo 255 caracteres.'),

    tipo: z.enum([
        'atendimento',
        'avaliacao',
        'retorno',
        'reuniao',
        'bloqueio',
        'outro',
    ]),

    inicio: dataHoraSchema,

    fim: dataHoraSchema,

    status: z.enum([
        'agendado',
        'confirmado',
        'cancelado',
        'realizado',
    ]),

    lembrete_minutos: z
        .number()
        .int()
        .positive()
        .optional(),

    observacoes: z
        .string()
        .trim()
        .optional(),
});

export type CriarAgendaDTO = z.infer<typeof criarAgendaSchema>;

export const atualizarAgendaSchema = z.object({
    usuario_id: z
        .number()
        .int()
        .positive()
        .optional(),

    paciente_id: z
        .number()
        .int()
        .positive()
        .optional(),

    titulo: z
        .string()
        .trim()
        .min(1, 'O título é obrigatório.')
        .max(255, 'O título deve ter no máximo 255 caracteres.')
        .optional(),

    tipo: z.enum([
        'atendimento',
        'avaliacao',
        'retorno',
        'reuniao',
        'bloqueio',
        'outro',
    ]).optional(),

    inicio: dataHoraSchema.optional(),

    fim: dataHoraSchema.optional(),

    status: z.enum([
        'agendado',
        'confirmado',
        'cancelado',
        'realizado',
    ]).optional(),

    lembrete_minutos: z
        .number()
        .int()
        .positive()
        .optional(),

    observacoes: z
        .string()
        .trim()
        .optional(),
});

export type AtualizarAgendaDTO = z.infer<typeof atualizarAgendaSchema>;

export const listarAgendaSchema = z.object({
    usuario_id: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    paciente_id: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    status: z.enum([
        'agendado',
        'confirmado',
        'cancelado',
        'realizado',
    ]).optional(),

    tipo: z.enum([
        'atendimento',
        'avaliacao',
        'retorno',
        'reuniao',
        'bloqueio',
        'outro',
    ]).optional(),

    inicio: z.coerce
        .date()
        .optional(),

    fim: z.coerce
        .date()
        .optional(),

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
});

export type ListarAgendaDTO = z.infer<typeof listarAgendaSchema>;

export const idSchema = z.object({
    id: z.coerce
    .number()
    .int()
    .positive({
        message: 'O ID deve ser um número inteiro positivo.',
    })
});