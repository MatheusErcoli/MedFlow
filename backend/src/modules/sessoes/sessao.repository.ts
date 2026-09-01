import Sessao from './sessao.model';
import Agenda from '../agenda/agenda.model';

import {
    CriarSessaoRepositoryDTO,
    AtualizarSessaoRepositoryDTO,
} from '../../types/sessoes.types';

class SessaoRepository {

    async listar() {
        return await Sessao.findAll({
            include: [
                {
                    model: Agenda,
                    as: 'agenda',
                    attributes: [
                        'id',
                        'usuario_id',
                        'paciente_id',
                        'titulo',
                        'inicio',
                        'fim',
                        'status',
                    ],
                },
            ],
            order: [['numero', 'ASC']],
        });
    }

    async buscarPorId(id: number) {
        return await Sessao.findByPk(id, {
            include: [
                {
                    model: Agenda,
                    as: 'agenda',
                    attributes: [
                        'id',
                        'usuario_id',
                        'paciente_id',
                        'titulo',
                        'inicio',
                        'fim',
                        'status',
                    ],
                },
            ],
        });
    }

    async buscarUltimoNumeroPorPaciente(paciente_id: number) {
        return await Sessao.findOne({
            include: [
                {
                    model: Agenda,
                    as: 'agenda',
                    attributes: [],
                    where: {
                        paciente_id,
                    },
                },
            ],
            order: [['numero', 'DESC']],
        });
    }

    async criar(data: CriarSessaoRepositoryDTO & { numero: number }) {
        return await Sessao.create(data);
    }

    async atualizar(
        id: number,
        dados: AtualizarSessaoRepositoryDTO
    ) {
        await Sessao.update(dados, {
            where: { id },
        });

        return await this.buscarPorId(id);
    }

    async finalizar(id: number, duracao: number) {
        await Sessao.update(
            {
                realizada: true,
                duracao,
            },
            {
                where: { id },
            }
        );

        return await this.buscarPorId(id);
    }

    async deletar(id: number) {
        return await Sessao.destroy({
            where: { id },
        });
    }
}

export default new SessaoRepository();