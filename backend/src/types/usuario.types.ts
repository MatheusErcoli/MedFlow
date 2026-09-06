export interface CriarUsuarioRepositoryDTO {
  especialidade_id: number;

  nome: string;

  email: string;

  senha: string;

  telefone?: string;

  cpf?: string;

  registro_profissional?: string;

  foto?: string;
}

export interface AtualizarUsuarioRepositoryDTO {
  especialidade_id?: number;

  nome?: string;

  email?: string;

  senha?: string;

  telefone?: string;

  cpf?: string;

  registro_profissional?: string;

  foto?: string;

  status?: "ativo" | "inativo";
}

export interface ListarUsuarioRepositoryDTO {
  status?: "ativo" | "inativo";

  page: number;

  limit: number;
}
