import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';
import { AtualizarAgendaRepositoryDTO, CriarAgendaRepositoryDTO } from '../../types/agenda.types';
import usuarioRepository from '../usuarios/usuario.repository';
import agendaRepository from './agenda.repository';
import pacienteRepository from '../pacientes/paciente.repository';
import { ListarAgendaDTO } from './agenda.schema';

class AgendaService {
    async listar(data: ListarAgendaDTO) {

        const page = data.page ?? 1;
        const limit = data.limit ?? 10;

        const resultado = await agendaRepository.listar({
            ...data,
            page,
            limit,
        });

        const totalPaginas = Math.ceil(resultado.total / limit);

        return {
            dados: resultado.dados,
            paginacao: {
                page,
                limit,
                total: resultado.total,
                totalPaginas,
            },
        };
    }

    async buscarPorId(id: number) {
        const agenda = await agendaRepository.buscarPorId(id);

        if(!agenda) {
            throw new NotFoundError('Agenda não encontrada.');
        }

        return agenda;
    }

    async criar(data: CriarAgendaRepositoryDTO) {
        const usuario = await usuarioRepository.buscarPorId(data.usuario_id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        if (
            ['atendimento', 'avaliacao', 'retorno'].includes(data.tipo)
            && !data.paciente_id
        ) {
            throw new ConflictError(
                'O paciente é obrigatório para esse tipo de agendamento.'
            );
        }

        if (data.paciente_id) {
            const paciente = await pacienteRepository.buscarPorId(data.paciente_id);

            if (!paciente) {
                throw new NotFoundError('Paciente não encontrado.');
            }

            if (paciente.usuario_id !== data.usuario_id) {
                throw new ConflictError(
                    'O paciente não pertence ao usuário informado.'
                );
            }
        }

        if (data.fim <= data.inicio) {
            throw new ConflictError(
                'O horário de término deve ser posterior ao horário de início.'
            );
        }

        const conflito = await agendaRepository.buscarConflitoHorario(
            data.usuario_id,
            data.inicio,
            data.fim
        );

        if (conflito) {
            throw new ConflictError(
                'Já existe um agendamento nesse horário.'
            );
        }

        return await agendaRepository.criar(data);
    }

    async atualizar(id: number, data: AtualizarAgendaRepositoryDTO) {
        const agenda = await agendaRepository.buscarPorId(id);
        
        if (!agenda) {
            throw new NotFoundError('Agenda não encontrada.');
        }

        const dadosFinais = {
            ...agenda.toJSON(),
            ...data,
        };

        if (data.status && data.status !== agenda.status) {
            const transicoesPermitidas: Record<string, string[]> = {
                agendado: ['confirmado', 'cancelado'],
                confirmado: ['realizado', 'cancelado'],
                cancelado: [],
                realizado: [],
            };

            const permitidos = transicoesPermitidas[agenda.status] ?? [];

            if (!permitidos.includes(data.status)) {
                throw new ConflictError(
                    `Não é possível alterar o status de "${agenda.status}" para "${data.status}".`
                );
            }
        }

        const usuario = await usuarioRepository.buscarPorId(dadosFinais.usuario_id);

        if (!usuario) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        if(
            ['atendimento', 'avaliacao', 'retorno'].includes(dadosFinais.tipo)
            && !dadosFinais.paciente_id
        ) {
            throw new ConflictError(
                'O paciente é obrigatório para esse tipo de agendamento.'
            );
        }

        if (dadosFinais.paciente_id) {
            const paciente = await pacienteRepository.buscarPorId(
                dadosFinais.paciente_id
            );

            if (!paciente) {
                throw new NotFoundError('Paciente não encontrado.');
            }

            if (paciente.usuario_id !== dadosFinais.usuario_id) {
                throw new ConflictError(
                    'O paciente não pertence ao usuário informado.'
                );
            }
        }

        if (dadosFinais.fim <= dadosFinais.inicio) {
            throw new ConflictError(
                'O horário de término deve ser posterior ao horário de início.'
            );
        }

        const conflito = await agendaRepository.buscarConflitoHorario(
            dadosFinais.usuario_id,
            dadosFinais.inicio,
            dadosFinais.fim,
            id
        );

        if (conflito) {
            throw new ConflictError(
                'Já existe um agendamento nesse horário.'
            );
        }

    }

    async cancelar(id: number) {
        const agenda = await agendaRepository.buscarPorId(id);

        if (!agenda) {
            throw new NotFoundError('Agenda não encontrada.');
        }

        if (agenda.status === 'cancelado') {
            throw new ConflictError('A agenda já está cancelada.');
        }

        if (agenda.status === 'realizado') {
            throw new ConflictError(
                'Não é possível cancelar uma agenda já realizada.'
            );
        }

        return await agendaRepository.cancelar(id);
    }
}