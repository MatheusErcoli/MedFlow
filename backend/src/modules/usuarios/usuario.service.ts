import { CriarUsuarioDTO } from './usuario.schema';
import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';

import especialidadeRepository from '../especialidades/especialidade.repository';
import usuarioRepository from './usuario.repository';

import bcrypt from 'bcrypt';

class UsuarioService {
    async listar() {
        return usuarioRepository.listar();
    }

    async buscarPorId(id: number) {
        const usuario = await usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        return usuario;
    }

    async criar(data: CriarUsuarioDTO) {
        const especialidade = await especialidadeRepository.buscarPorId(
            data.especialidade_id
        );

        if (!especialidade) {
            throw new ConflictError(
                'A especialidade informada não existe.'
            );
        }

        const usuarioExistente = await usuarioRepository.buscarPorEmail(
            data.email
        );

        if (usuarioExistente) {
            throw new ConflictError(
                'Já existe um usuário cadastrado com esse email.'
            );
        }

        const senhaHash = await bcrypt.hash(data.senha, 10);

        return usuarioRepository.criar({
            especialidade_id: data.especialidade_id,
            nome: data.nome,
            email: data.email,
            senha: senhaHash,
            telefone: data.telefone,
            cpf: data.cpf,
            registro_profissional: data.registro_profissional,
            foto: data.foto,
            status: 'ativo',
        });
    }
}

export default new UsuarioService();