import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';

import { CriarSessaoRepositoryDTO, AtualizarSessaoRepositoryDTO } from '../../types/sessoes.types';

import sessaoRepository from './sessao.repository';
import agendaRepository from '../agenda/agenda.repository';


class SessaoService {

    async listar() {
        return await sessaoRepository.listar();
    }

    async buscarPorId(id: number) {
        const sessao = await sessaoRepository.buscarPorId(id);

        if (!sessao) {
            throw new NotFoundError('Sessão não encontrada.');
        }

        return sessao;
    }

    async criar(data: CriarSessaoRepositoryDTO) {

        const agenda = await agendaRepository.buscarPorId(data.agenda_id);

        if (!agenda) {
            throw new NotFoundError('Agenda não encontrada.');
        }

        if (agenda.status === 'cancelado') {
            throw new ConflictError(
                'Não é possível criar uma sessão para uma agenda cancelada.'
            );
        }

        if (!agenda.paciente_id) {
            throw new ConflictError(
                'A agenda não possui um paciente associado.'
            );
        }

        const ultimaSessao =
            await sessaoRepository.buscarUltimoNumeroPorPaciente(
                agenda.paciente_id
            );

        const numero = ultimaSessao
            ? ultimaSessao.numero + 1
            : 1;

        return await sessaoRepository.criar({
            ...data,
            numero,
        });
    }

    async atualizar(id: number, data: AtualizarSessaoRepositoryDTO) {

        const sessao = await sessaoRepository.buscarPorId(id);

        if (!sessao) {
            throw new NotFoundError('Sessão não encontrada.');
        }

        const dadosFinais = {
            ...sessao.toJSON(),
            ...data,
        };

        if (dadosFinais.inicio && dadosFinais.fim) {

            if (dadosFinais.fim <= dadosFinais.inicio) {
                throw new ConflictError(
                    'O horário de término deve ser posterior ao horário de início.'
                );
            }

            const duracao = Math.floor(
                (dadosFinais.fim.getTime() - dadosFinais.inicio.getTime()) / 60000
            );

            dadosFinais.duracao = duracao;
        } else {
            dadosFinais.duracao = null;
        }

        return await sessaoRepository.atualizar(id, {
            inicio: dadosFinais.inicio,
            fim: dadosFinais.fim,
            duracao: dadosFinais.duracao,
            valor: dadosFinais.valor,
            pago: dadosFinais.pago,
            observacoes: dadosFinais.observacoes,
        });
    }

    async deletar(id: number) {

        const sessao = await sessaoRepository.buscarPorId(id);

        if (!sessao) {
            throw new NotFoundError('Sessão não encontrada.');
        }

        return await sessaoRepository.deletar(id);
    }

    async finalizar(id: number) {
        const sessao = await sessaoRepository.buscarPorId(id);

        if (!sessao) {
            throw new NotFoundError('Sessão não encontrada.');
        }

        if (sessao.realizada) {
            throw new ConflictError('A sessão já foi finalizada.');
        }

        if (!sessao.inicio) {
            throw new ConflictError(
                'Não é possível finalizar uma sessão sem informar o horário de início.'
            );
        }

        if (!sessao.fim) {
            throw new ConflictError(
                'Não é possível finalizar uma sessão sem informar o horário de término.'
            );
        }

        if (sessao.fim <= sessao.inicio) {
            throw new ConflictError(
                'O horário de término deve ser posterior ao horário de início.'
            );
        }

        const duracao = Math.floor(
            (sessao.fim.getTime() - sessao.inicio.getTime()) / 60000
        );

        return await sessaoRepository.finalizar(id, duracao);
    }
}

export default new SessaoService();