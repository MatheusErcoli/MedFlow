import { ConflictError } from "../../errors/ConflictError";
import { NotFoundError } from "../../errors/NotFoundError";
import {
  CriarProntuarioRepositoryDTO,
  AtualizarProntuarioRepositoryDTO,
} from "../../types/prontuarios.types";
import prontuarioRepository from "./prontuario.repository";
import sessaoRepository from "../sessoes/sessao.repository";


class ProntuarioService {
    async criar(data: CriarProntuarioRepositoryDTO) {
        const sessao = await sessaoRepository.buscarPorId(data.sessao_id);

        if (!sessao) {
            throw new NotFoundError('Sessão não encontrada.');
        }

        const prontuarioExistente = await prontuarioRepository.buscarPorSessaoId(data.sessao_id);

        if (prontuarioExistente) {
            throw new ConflictError('Já existe um prontuário para esta sessão.');
        }

        if (!sessao.inicio) {
            throw new ConflictError('Não é possível criar um prontuário para uma sessão que ainda não ocorreu.');
        }

        return await prontuarioRepository.criar(data);
    }

    async buscarPorId(id: number) {
        const prontuario = await prontuarioRepository.buscarPorId(id);

        if (!prontuario) {
            throw new NotFoundError('Prontuário não encontrado.');
        }

        return prontuario;
    }

    async atualizar(id: number, data: AtualizarProntuarioRepositoryDTO) {
        const prontuario = await prontuarioRepository.buscarPorId(id);

        if (!prontuario) {
            throw new NotFoundError('Prontuário não encontrado.');
        }

        return await prontuarioRepository.atualizar(id, data);
    }
}

export default new ProntuarioService();