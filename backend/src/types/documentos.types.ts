export interface Documento {
    id: number;
    usuario_id: number;
    paciente_id: number;
    sessao_id: number | null;
    modelo_documento_id: number | null;
    titulo: string;
    tipo: string;
    caminho_arquivo: string | null;
    observacoes: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type DocumentoAttributes = Documento;

