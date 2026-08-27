export interface CriarSessaoRepositoryDTO {
    agenda_id: number;
    valor?: number;
    observacoes?: string;
}

export interface AtualizarSessaoRepositoryDTO {
    inicio?: Date | null;
    fim?: Date | null;
    valor?: number | null;
    pago?: boolean;
    realizada?: boolean;
    observacoes?: string | null;
}