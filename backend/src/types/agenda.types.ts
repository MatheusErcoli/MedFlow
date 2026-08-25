export interface CriarAgendaRepositoryDTO {
    usuario_id: number;
    paciente_id?: number;
    titulo: string;
    tipo: string;
    inicio: string;
    fim: string;
    status: string;
    lembrete_minutos?: number;
    observacoes?: Text;
}

export interface AtualizarAgendaRepositoryDTO {
    usuario_id?: number;
    paciente_id?: number;
    titulo?: string;
    tipo?: string;
    inicio?: string;
    fim?: string;
    status?: string;
    lembrete_minutos?: number;
    observacoes?: Text;
}