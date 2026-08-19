import { CriarPacienteDTO, AtualizarPacienteDTO, ListarPacienteDTO } from './paciente.schema';

import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';

import pacienteRepository from './paciente.repository';
import usuarioRepository from '../usuarios/usuario.repository';

import bcrypt from 'bcrypt';

class PacienteService {
    async listar({ page, limit, status }: ListarPacienteDTO) {
        const { dados, total } =
            await pacienteRepository.listar(page, limit, status);

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
        const paciente = await pacienteRepository.buscarPorId(id);

        if(!paciente) {
            throw new NotFoundError('Paciente não encontrado.');
        }

        return paciente;
    }

    async criar(data: CriarPacienteDTO) {
        const usuario = await usuarioRepository.buscarPorId(data.usuario_id);

        if(!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        const pacienteExistente = await pacienteRepository.buscarPorEmail(data.email);

        if(pacienteExistente) {
            throw new ConflictError('Já existe um paciente cadastrado com esse email.');
        }

        if(data.cpf) {
            const pacienteExistenteCpf = await pacienteRepository.buscarPorCpf(data.cpf);

            if(pacienteExistenteCpf) {
                throw new ConflictError('Já existe um paciente cadastrado com esse CPF.');
            }
        }

        return pacienteRepository.criar({
            usuario_id: data.usuario_id,
            nome: data.nome,
            foto: data.foto,
            cpf: data.cpf,
            sexo: data.sexo,
            data_nascimento: data.data_nascimento,
            estado_civil: data.estado_civil,
            telefone: data.telefone,
            email: data.email,
            cep: data.cep,
            logradouro: data.logradouro,
            numero: data.numero,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            profissao: data.profissao,
            contato_emergencia: data.contato_emergencia,
            telefone_emergencia: data.telefone_emergencia,
            observacoes: data.observacoes,
            status: 'ativo',
        });
    }
}