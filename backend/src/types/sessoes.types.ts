export interface CriarSessaoRepositoryDTO {
    agenda_id: number;
    valor?: number;
    observacoes?: string;
}

export interface AtualizarSessaoRepositoryDTO {
    inicio?: Date | null;
    fim?: Date | null;
    duracao?: number | null;
    valor?: number | null;
    pago?: boolean;
    observacoes?: string | null;
}