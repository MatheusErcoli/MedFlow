import {
    AtualizarModeloDocumentoRepositoryDTO,
    CriarModeloDocumentoRepositoryDTO,
} from '../../types/modelos-documentos.types';

import ModeloDocumento from './modelo-documento.model';

class ModeloDocumentoRepository {
    async listar(page: number, limit: number) {
        const offset = (page - 1) * limit;

        const { rows, count } = await ModeloDocumento.findAndCountAll({
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
        return await ModeloDocumento.findByPk(id);
    }

    async criar(dados: CriarModeloDocumentoRepositoryDTO) {
        const modelo = await ModeloDocumento.create(dados);

        return this.buscarPorId(modelo.id);
    }

    async atualizar(id: number, dados: AtualizarModeloDocumentoRepositoryDTO) {
        const [quantidade] = await ModeloDocumento.update(dados, {
            where: { id },
        });


        return quantidade > 0;
    }

    async deletar(id: number) {
        const quantidade = await ModeloDocumento.destroy({
            where: { id },
        });
        
        return quantidade > 0;
    }
}

export default new ModeloDocumentoRepository();