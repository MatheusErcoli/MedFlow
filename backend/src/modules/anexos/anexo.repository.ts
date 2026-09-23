import {
    AtualizarAnexoRepositoryDTO,
    CriarAnexoRepositoryDTO,
} from '../../types/anexos.types';

import Anexo from './anexo.model';

class AnexoRepository {
    async listar(page: number, limit: number) {
        const offset = (page - 1) * limit;

        const { rows, count } = await Anexo.findAndCountAll({
            order: [['created_at', 'DESC']],
            limit,
            offset,
        });

        return {
            dados: rows,
            total: count,
        };
    }

    async buscarPorId(id: number) {
        return await Anexo.findByPk(id);
    }

    async criar(dados: CriarAnexoRepositoryDTO) {
        const anexo = await Anexo.create(dados);

        return this.buscarPorId(anexo.id);
    }

    async atualizar(
        id: number,
        dados: AtualizarAnexoRepositoryDTO,
    ) {
        const [quantidade] = await Anexo.update(dados, {
            where: { id },
        });

        return quantidade > 0;
    }

    async deletar(id: number) {
        const quantidade = await Anexo.destroy({
            where: { id },
        });

        return quantidade > 0;
    }
}

export default new AnexoRepository();