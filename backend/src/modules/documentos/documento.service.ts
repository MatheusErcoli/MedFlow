import {
    AtualizarDocumentoRepositoryDTO,
    CriarDocumentoRepositoryDTO,
} from '../../types/documentos.types';

import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';

import Usuario from '../usuarios/usuario.model';
import Paciente from '../pacientes/paciente.model';
import Sessao from '../sessoes/sessao.model';
import Agenda from '../agenda/agenda.model';

import documentoRepository from './documento.repository';

class DocumentoService {

    async listar(page: number, limit: number) {
        return documentoRepository.listar(page, limit);
    }

    async buscarPorId(id: number) {
        const documento = await documentoRepository.buscarPorId(id);

        if(!documento) {
            throw new NotFoundError('Documento não encontrado');
        }

        return documento;
    }

    async criar(dados: CriarDocumentoRepositoryDTO) {
        const usuario = await Usuario.findByPk(dados.usuario_id);

        if(!usuario) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const paciente = await Paciente.findByPk(dados.paciente_id);

        if(!paciente) {
            throw new NotFoundError('Paciente não encontrado');
        }

        if (dados.sessao_id !== undefined && dados.sessao_id !== null) {
            const sessao = await Sessao.findByPk(dados.sessao_id);

            if(!sessao) {
                throw new NotFoundError('Sessão não encontrada');
            }

            const agenda = await Agenda.findByPk(sessao.agenda_id);

            if(!agenda) {
                throw new NotFoundError('Agenda não encontrada');
            }

            if (agenda.paciente_id !== dados.paciente_id) {
                throw new ConflictError('A sessão não pertence ao paciente informado');
            }
        }

        return documentoRepository.criar(dados);
    }

    async atualizar(id: number, dados: AtualizarDocumentoRepositoryDTO) {
        const documento = await documentoRepository.buscarPorId(id);

        if(!documento) {
            throw new NotFoundError('Documento não encontrado');
        }

        const usuarioId = dados.usuario_id ?? documento.usuario_id;
        const pacienteId = dados.paciente_id ?? documento.paciente_id;
        const sessaoId = dados.sessao_id !== undefined
            ? dados.sessao_id
            : documento.sessao_id;

        const usuario = await Usuario.findByPk(usuarioId);

        if(!usuario) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const paciente = await Paciente.findByPk(pacienteId);

        if(!paciente) {
            throw new NotFoundError('Paciente não encontrado');
        }

        if (sessaoId !== undefined && sessaoId !== null) {

            const sessao = await Sessao.findByPk(sessaoId);

            if(!sessao) {
                throw new NotFoundError('Sessão não encontrada');
            }

            const agenda = await Agenda.findByPk(sessao.agenda_id);

            if(!agenda) {
                throw new NotFoundError('Agenda não encontrada');
            }

            if (agenda.paciente_id !== pacienteId) {
                throw new ConflictError(
                    'A sessão informada não pertence ao paciente do documento'
                );
            }
        }
        
        const atualizado = await documentoRepository.atualizar(id, dados);

        if (!atualizado) {
            throw new NotFoundError('Documento não encontrado');
        }

        return this.buscarPorId(id);
    }

    async deletar(id: number) {

        const documento = await documentoRepository.buscarPorId(id);

        if(!documento) {
            throw new NotFoundError('Documento não encontrado');
        }

        const deletado = await documentoRepository.deletar(id);

        if (!deletado) {
            throw new NotFoundError('Documento não encontrado');
        }
    }
}

export default new DocumentoService();