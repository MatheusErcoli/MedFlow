export interface CriarAgendaRepositoryDTO {
    usuario_id: number;
    paciente_id?: number;
    titulo: string;
    tipo: string;
    inicio: Date;
    fim: Date;
    status: string;
    lembrete_minutos?: number;
    observacoes?: string;
}

export interface AtualizarAgendaRepositoryDTO {
    usuario_id?: number;
    paciente_id?: number;
    titulo?: string;
    tipo?: string;
    inicio?: Date;
    fim?: Date;
    status?: string;
    lembrete_minutos?: number;
    observacoes?: string;
}

export interface ListarAgendaRepositoryDTO {
    usuario_id?: number;
    paciente_id?: number;
    status?: string;
    tipo?: string;
    inicio?: Date;
    fim?: Date;
    pagina: number;
    limite: number;
}