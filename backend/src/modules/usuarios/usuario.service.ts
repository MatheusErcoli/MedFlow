import { CriarUsuarioDTO, AtualizarUsuarioDTO, ListarUsuarioDTO } from './usuario.schema';

import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';

import especialidadeRepository from '../especialidades/especialidade.repository';
import usuarioRepository from './usuario.repository';

import bcrypt from 'bcrypt';

class UsuarioService {
    async listar({ page, limit }: ListarUsuarioDTO) {
        const { dados, total } = await usuarioRepository.listar(page, limit);

        const totalPaginas = Math.ceil(total / limit);

        return {
            dados,
            paginacao: {
                pagina: page,
                limite: limit,
                total,
                totalPaginas,
            },
        };
    }

    async buscarPorId(id: number) {
        const usuario = await usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        return usuario;
    }

    async criar(data: CriarUsuarioDTO) {
        const especialidade =
            await especialidadeRepository.buscarPorId(
                data.especialidade_id
            );

        if (!especialidade) {
            throw new NotFoundError(
                'A especialidade informada não existe.'
            );
        }

        const usuarioExistente =
            await usuarioRepository.buscarPorEmail(data.email);

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

    async atualizar(id: number, data: AtualizarUsuarioDTO) {
        const usuario = await usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        if (data.email) {
            const usuarioComEmail =
                await usuarioRepository.buscarPorEmail(data.email);

            if (usuarioComEmail && usuarioComEmail.id !== id) {
                throw new ConflictError(
                    'Já existe um usuário cadastrado com esse email.'
                );
            }
        }

        if (data.especialidade_id) {
            const especialidade =
                await especialidadeRepository.buscarPorId(
                    data.especialidade_id
                );

            if (!especialidade) {
                throw new NotFoundError(
                    'Especialidade não encontrada.'
                );
            }
        }

        const dadosAtualizacao: AtualizarUsuarioDTO = {
            ...data,
        };

        if (data.senha) {
            dadosAtualizacao.senha = await bcrypt.hash(
                data.senha,
                10
            );
        }

        await usuarioRepository.atualizar(
            id,
            dadosAtualizacao
        );

        return usuarioRepository.buscarPorId(id);
    }

    async deletar(id: number) {
        const usuario = await usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        await usuarioRepository.deletar(id);
    }
}

export default new UsuarioService();