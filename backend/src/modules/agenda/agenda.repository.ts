import { 
    Op,
    WhereOptions,
 } from 'sequelize';

import Agenda from './agenda.model';

import {
    CriarAgendaRepositoryDTO,
    AtualizarAgendaRepositoryDTO,
    ListarAgendaRepositoryDTO,
} from '../../types/agenda.types';

class AgendaRepository {

    async listar(filtros: ListarAgendaRepositoryDTO) {
        const {
            usuario_id,
            paciente_id,
            status,
            tipo,
            inicio,
            fim,
            page,
            limit,
        } = filtros;

        const where: WhereOptions = {};

        if (usuario_id) {
            Object.assign(where, {
                usuario_id,
            });
        }

        if (paciente_id) {
            Object.assign(where, {
                paciente_id,
            });
        }

        if (status) {
            Object.assign(where, {
                status,
            });
        }

        if (tipo) {
            Object.assign(where, {
                tipo,
            });
        }

        if (inicio && fim) {
            Object.assign(where, {
                [Op.and]: [
                    {
                        fim: {
                            [Op.gt]: inicio,
                        },
                    },
                    {
                        inicio: {
                            [Op.lt]: fim,
                        },
                    },
                ],
            });
        } else if (inicio) {
            Object.assign(where, {
                fim: {
                    [Op.gt]: inicio,
                },
            });
        } else if (fim) {
            Object.assign(where, {
                inicio: {
                    [Op.lt]: fim,
                },
            });
        }

        const offset = (page - 1) * limit;

        const { rows, count } = await Agenda.findAndCountAll({
            where,
            order: [['inicio', 'ASC']],
            limit: limit,
            offset,
        });

        return {
            dados: rows,
            total: count,
        };
    }

    async buscarPorId(id: number) {
        return await Agenda.findByPk(id);
    }

    async buscarConflitoHorario(
        usuario_id: number,
        inicio: Date,
        fim: Date,
        ignorarId?: number
    ) {
        const where: WhereOptions = {
            usuario_id,
            status: {
                [Op.ne]: 'cancelado',
            },
            [Op.and]: [
                {
                    fim: {
                        [Op.gt]: inicio,
                    },
                },
                {
                    inicio: {
                        [Op.lt]: fim,
                    },
                },
            ],
        };

        if (ignorarId) {
            Object.assign(where, {
                id: {
                    [Op.ne]: ignorarId,
                },
            });
        }

        return await Agenda.findOne({
            where,
        });
    }

    async criar(data: CriarAgendaRepositoryDTO) {
        return await Agenda.create(data);
    }

    async atualizar(
        id: number,
        data: Partial<AtualizarAgendaRepositoryDTO>
    ) {
        await Agenda.update(data, {
            where: { id },
        });

        return await this.buscarPorId(id);
    }

    async cancelar(id: number) {
        await Agenda.update(
            { status: 'cancelado' },
            { where: { id } },
        );

        return await this.buscarPorId(id);
    }


}

export default new AgendaRepository();