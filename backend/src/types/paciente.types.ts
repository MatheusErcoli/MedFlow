export interface CriarPacienteRepositoryDTO {
    usuario_id: number;
    nome: string;
    foto?: string;
    cpf: string;
    sexo?: string;
    data_nascimento?: string;
    estado_civil?: string;
    telefone?: string;
    email: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    profissao?: string;
    contato_emergencia?: string;
    telefone_emergencia?: string;
    observacoes?: Text;
    status?: 'ativo' | 'inativo';
}

export interface AtualizarPacienteRepositoryDTO {
    usuario_id?: number;
    nome?: string;
    foto?: string;
    cpf?: string;
    sexo?: string;
    data_nascimento?: string;
    estado_civil?: string;
    telefone?: string;
    email?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    profissao?: string;
    contato_emergencia?: string;
    telefone_emergencia?: string;
    observacoes?: Text;
    status?: 'ativo' | 'inativo';
}