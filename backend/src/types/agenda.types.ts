export type AgendaTipo =
  | "atendimento"
  | "avaliacao"
  | "retorno"
  | "reuniao"
  | "bloqueio"
  | "outro";

export type AgendaStatus =
  | "agendado"
  | "confirmado"
  | "cancelado"
  | "realizado";

export interface CriarAgendaRepositoryDTO {
  usuario_id: number;

  paciente_id?: number;

  titulo: string;

  tipo: AgendaTipo;

  inicio: Date;

  fim: Date;

  status: AgendaStatus;

  lembrete_minutos?: number;

  observacoes?: string;
}

export interface AtualizarAgendaRepositoryDTO {
  usuario_id?: number;

  paciente_id?: number;

  titulo?: string;

  tipo?: AgendaTipo;

  inicio?: Date;

  fim?: Date;

  status?: AgendaStatus;

  lembrete_minutos?: number;

  observacoes?: string;
}

export interface ListarAgendaRepositoryDTO {
  usuario_id?: number;

  paciente_id?: number;

  status?: AgendaStatus;

  tipo?: AgendaTipo;

  inicio?: Date;

  fim?: Date;

  page: number;

  limit: number;
}
