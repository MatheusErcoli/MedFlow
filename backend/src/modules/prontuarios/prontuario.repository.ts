import Prontuario from "./prontuario.model";
import Sessao from "../sessoes/sessao.model";
import Agenda from "../agenda/agenda.model";

import {
  CriarProntuarioRepositoryDTO,
  AtualizarProntuarioRepositoryDTO,
} from "../../types/prontuarios.types";


class ProntuarioRepository {
    async criar(data: CriarProntuarioRepositoryDTO) {
        return await Prontuario.create(data);
    }

    async buscarPorId(id: number) {
        return await Prontuario.findByPk(id, {
            include: [
                {
                    model: Sessao,
                    as: 'sessao',
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
                },
            ],
        });
    }

    async buscarPorSessaoId(sessao_id: number) {
        return await Prontuario.findOne({
            where: {
                sessao_id,
            },
        });
    }

    async atualizar(id: number, data: AtualizarProntuarioRepositoryDTO) {
        await Prontuario.update(data, {
            where: {
                id
            },
        });

        return await this.buscarPorId(id);
    }
}

export default new ProntuarioRepository();

