export interface ModeloDocumento {
    id: number;
    usuario_id: number;
    nome: string;
    descricao: string | null;
    tipo: string;
    conteudo: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ModeloDocumentoAttributes = ModeloDocumento;

export interface CriarModeloDocumentoRepositoryDTO {
    usuario_id: number;
    nome: string;
    descricao?: string | null;
    tipo: string;
    conteudo: string;
}

export interface AtualizarModeloDocumentoRepositoryDTO {
    nome?: string;
    descricao?: string | null;
    tipo?: string;
    conteudo?: string;
}

