import {
    AtualizarAnexoRepositoryDTO,
    CriarAnexoRepositoryDTO,
} from '../../types/anexos.types';

import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';

import Usuario from '../usuarios/usuario.model';
import Paciente from '../pacientes/paciente.model';
import Sessao from '../sessoes/sessao.model';
import Agenda from '../agenda/agenda.model';

import anexoRepository from './anexo.repository';

class AnexoService {
    async listar(page: number, limit: number) {
        return anexoRepository.listar(page, limit);
    }

    async buscarPorId(id: number) {
        const anexo = await anexoRepository.buscarPorId(id);

        if (!anexo) {
            throw new NotFoundError('Anexo não encontrado');
        }

        return anexo;
    }

    async criar(dados: CriarAnexoRepositoryDTO) {
        const usuario = await Usuario.findByPk(dados.usuario_id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const paciente = await Paciente.findByPk(dados.paciente_id);

        if (!paciente) {
            throw new NotFoundError('Paciente não encontrado');
        }

        if (dados.sessao_id !== undefined && dados.sessao_id !== null) {
            const sessao = await Sessao.findByPk(dados.sessao_id);

            if (!sessao) {
                throw new NotFoundError('Sessão não encontrada');
            }

            const agenda = await Agenda.findByPk(sessao.agenda_id);

            if (!agenda) {
                throw new NotFoundError('Agenda não encontrada');
            }

            if (agenda.paciente_id !== dados.paciente_id) {
                throw new ConflictError(
                    'A sessão não pertence ao paciente informado',
                );
            }
        }

        return anexoRepository.criar(dados);
    }

    async atualizar(
        id: number,
        dados: AtualizarAnexoRepositoryDTO,
    ) {
        const anexo = await anexoRepository.buscarPorId(id);

        if (!anexo) {
            throw new NotFoundError('Anexo não encontrado');
        }

        const usuarioId =
            dados.usuario_id ?? anexo.usuario_id;

        const pacienteId =
            dados.paciente_id ?? anexo.paciente_id;

        const sessaoId =
            dados.sessao_id !== undefined
                ? dados.sessao_id
                : anexo.sessao_id;

        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const paciente = await Paciente.findByPk(pacienteId);

        if (!paciente) {
            throw new NotFoundError('Paciente não encontrado');
        }

        if (sessaoId !== undefined && sessaoId !== null) {
            const sessao = await Sessao.findByPk(sessaoId);

            if (!sessao) {
                throw new NotFoundError('Sessão não encontrada');
            }

            const agenda = await Agenda.findByPk(sessao.agenda_id);

            if (!agenda) {
                throw new NotFoundError('Agenda não encontrada');
            }

            if (agenda.paciente_id !== pacienteId) {
                throw new ConflictError(
                    'A sessão informada não pertence ao paciente do anexo',
                );
            }
        }

        const atualizado = await anexoRepository.atualizar(
            id,
            dados,
        );

        if (!atualizado) {
            throw new NotFoundError('Anexo não encontrado');
        }

        return this.buscarPorId(id);
    }

    async deletar(id: number) {
        const anexo = await anexoRepository.buscarPorId(id);

        if (!anexo) {
            throw new NotFoundError('Anexo não encontrado');
        }

        const deletado = await anexoRepository.deletar(id);

        if (!deletado) {
            throw new NotFoundError('Anexo não encontrado');
        }
    }
}

export default new AnexoService();