export interface CriarProntuarioRepositoryDTO {
    sessao_id: number;

    titulo: string;

    conteudo?: string;
}

export interface AtualizarProntuarioRepositoryDTO {
    titulo?: string;

    conteudo?: string;
}