import {
    AtualizarModeloDocumentoRepositoryDTO,
    CriarModeloDocumentoRepositoryDTO,
} from '../../types/modelos-documentos.types';

import { NotFoundError } from '../../errors/NotFoundError';

import Usuario from '../usuarios/usuario.model';

import modeloDocumentoRepository from './modelo-documento.repository';

class ModeloDocumentoService {
    async listar(page: number, limit: number) {
        return await modeloDocumentoRepository.listar(page, limit);
    }

    async buscarPorId(id: number) {
        const modelo = await modeloDocumentoRepository.buscarPorId(id);

        if (!modelo) {
            throw new NotFoundError('Modelo de documento não encontrado');
        }

        return modelo;
    }

    async criar(dados: CriarModeloDocumentoRepositoryDTO) {
        const usuario = await Usuario.findByPk(dados.usuario_id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return await modeloDocumentoRepository.criar(dados);
    }

    async atualizar(id: number, dados: AtualizarModeloDocumentoRepositoryDTO) {
        const modelo = await modeloDocumentoRepository.buscarPorId(id);

        if (!modelo) {
            throw new NotFoundError('Modelo de documento não encontrado');
        }

        const atualizado = await modeloDocumentoRepository.atualizar(id, dados);

        if (!atualizado) {
            throw new Error('Modelo de documento não encontrado');
        }

        return this.buscarPorId(id);
    }

    async deletar(id: number) {
        const modelo = await modeloDocumentoRepository.buscarPorId(id);

        if (!modelo) {
            throw new NotFoundError('Modelo de documento não encontrado');
        }

        const deletado = await modeloDocumentoRepository.deletar(id);

        if (!deletado) {
            throw new Error('Modelo de documento não encontrado');
        }
    }
}

export default new ModeloDocumentoService();