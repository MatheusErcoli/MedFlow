export interface CriarEspecialidadeRepositoryDTO {
    nome: string;
    slug: string;
    ativo: boolean;
}

export interface AtualizarEspecialidadeRepositoryDTO {
    nome?: string;
    slug?: string;
    ativo?: boolean;
}