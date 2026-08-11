export interface CriarUsuarioRepositoryDTO {
    especialidade_id: number;
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    cpf?: string;
    registro_profissional?: string;
    foto?: string;
    status?: string;
}