import { z } from "zod";

const tiposAgenda = [
  "atendimento",
  "avaliacao",
  "retorno",
  "reuniao",
  "bloqueio",
  "outro",
] as const;

const statusAgenda = [
  "agendado",
  "confirmado",
  "cancelado",
  "realizado",
] as const;

const dataHoraSchema = z.coerce.date({
  error: "A data e hora devem ser válidas.",
});

export const criarAgendaSchema = z.object({
  usuario_id: z
    .number({
      error: "O ID do usuário é obrigatório.",
    })
    .int("O ID do usuário deve ser um número inteiro.")
    .positive("O ID do usuário deve ser maior que zero."),

  paciente_id: z
    .number({
      error: "O ID do paciente deve ser um número.",
    })
    .int("O ID do paciente deve ser um número inteiro.")
    .positive("O ID do paciente deve ser maior que zero.")
    .optional(),

  titulo: z
    .string({
      error: "O título é obrigatório.",
    })
    .trim()
    .min(1, "O título é obrigatório.")
    .max(255, "O título deve ter no máximo 255 caracteres."),

  tipo: z.enum(tiposAgenda, {
    message:
      "O tipo deve ser: atendimento, avaliacao, retorno, reuniao, bloqueio ou outro.",
  }),

  inicio: dataHoraSchema,

  fim: dataHoraSchema,

  status: z.enum(statusAgenda, {
    message: "O status deve ser: agendado, confirmado, cancelado ou realizado.",
  }),

  lembrete_minutos: z
    .number({
      error: "O lembrete deve ser um número.",
    })
    .int("O lembrete deve ser um número inteiro.")
    .positive("O lembrete deve ser maior que zero.")
    .optional(),

  observacoes: z
    .string({
      error: "As observações devem ser um texto.",
    })
    .trim()
    .optional(),
});

export type CriarAgendaDTO = z.infer<typeof criarAgendaSchema>;

export const atualizarAgendaSchema = z.object({
  usuario_id: z
    .number({
      error: "O ID do usuário deve ser um número.",
    })
    .int("O ID do usuário deve ser um número inteiro.")
    .positive("O ID do usuário deve ser maior que zero.")
    .optional(),

  paciente_id: z
    .number({
      error: "O ID do paciente deve ser um número.",
    })
    .int("O ID do paciente deve ser um número inteiro.")
    .positive("O ID do paciente deve ser maior que zero.")
    .optional(),

  titulo: z
    .string({
      error: "O título deve ser um texto.",
    })
    .trim()
    .min(1, "O título não pode ser vazio.")
    .max(255, "O título deve ter no máximo 255 caracteres.")
    .optional(),

  tipo: z
    .enum(tiposAgenda, {
      message:
        "O tipo deve ser: atendimento, avaliacao, retorno, reuniao, bloqueio ou outro.",
    })
    .optional(),

  inicio: dataHoraSchema.optional(),

  fim: dataHoraSchema.optional(),

  status: z
    .enum(statusAgenda, {
      message:
        "O status deve ser: agendado, confirmado, cancelado ou realizado.",
    })
    .optional(),

  lembrete_minutos: z
    .number({
      error: "O lembrete deve ser um número.",
    })
    .int("O lembrete deve ser um número inteiro.")
    .positive("O lembrete deve ser maior que zero.")
    .optional(),

  observacoes: z
    .string({
      error: "As observações devem ser um texto.",
    })
    .trim()
    .optional(),
});

export type AtualizarAgendaDTO = z.infer<typeof atualizarAgendaSchema>;

export const listarAgendaSchema = z.object({
  usuario_id: z.coerce
    .number({
      error: "O ID do usuário deve ser um número.",
    })
    .int("O ID do usuário deve ser um número inteiro.")
    .positive("O ID do usuário deve ser maior que zero.")
    .optional(),

  paciente_id: z.coerce
    .number({
      error: "O ID do paciente deve ser um número.",
    })
    .int("O ID do paciente deve ser um número inteiro.")
    .positive("O ID do paciente deve ser maior que zero.")
    .optional(),

  status: z
    .enum(statusAgenda, {
      message:
        "O status deve ser: agendado, confirmado, cancelado ou realizado.",
    })
    .optional(),

  tipo: z
    .enum(tiposAgenda, {
      message:
        "O tipo deve ser: atendimento, avaliacao, retorno, reuniao, bloqueio ou outro.",
    })
    .optional(),

  inicio: z.coerce
    .date({
      error: "A data de início deve ser válida.",
    })
    .optional(),

  fim: z.coerce
    .date({
      error: "A data de fim deve ser válida.",
    })
    .optional(),

  page: z.coerce
    .number({
      error: "A página deve ser um número.",
    })
    .int("A página deve ser um número inteiro.")
    .positive("A página deve ser maior que zero.")
    .default(1),

  limit: z.coerce
    .number({
      error: "O limite deve ser um número.",
    })
    .int("O limite deve ser um número inteiro.")
    .positive("O limite deve ser maior que zero.")
    .max(100, "O limite deve ser no máximo 100.")
    .default(10),
});

export type ListarAgendaDTO = z.infer<typeof listarAgendaSchema>;

export const idSchema = z.object({
  id: z.coerce
    .number({
      error: "O ID é obrigatório.",
    })
    .int("O ID deve ser um número inteiro.")
    .positive("O ID deve ser maior que zero."),
});
