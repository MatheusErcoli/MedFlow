export interface Anexo {
    id: number;
    usuario_id: number;
    paciente_id: number;
    sessao_id: number | null;
    nome: string;
    descricao: string | null;
    caminho_arquivo: string;
    tipo: string;
    mime_type: string;
    tamanho_bytes: number;
    createdAt: Date;
    updatedAt: Date;
}

export type AnexoAttributes = Anexo;

export interface CriarAnexoRepositoryDTO {
    usuario_id: number;
    paciente_id: number;
    sessao_id?: number | null;
    nome: string;
    descricao?: string | null;
    caminho_arquivo: string;
    tipo: string;
    mime_type: string;
    tamanho_bytes: number;
}

export interface AtualizarAnexoRepositoryDTO {
    usuario_id?: number;
    paciente_id?: number;
    sessao_id?: number | null;
    nome?: string;
    descricao?: string | null;
    caminho_arquivo?: string;
    tipo?: string;
    mime_type?: string;
    tamanho_bytes?: number;
}