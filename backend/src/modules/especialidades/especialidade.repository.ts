import { CriarEspecialidadeRepositoryDTO } from '../../types/especialidade.types';
import Especialidade from './especialidade.model';

class EspecialidadeRepository {
    async listar() {
        return Especialidade.findAll({
            order: [['nome', 'ASC']]
        })
    }

    async buscarPorId(id: number) {
        return Especialidade.findByPk(id);
    }

    async buscarPorSlug(slug: string) {
        return Especialidade.findOne({
            where: { slug }
        })
    }

    async criar(data: CriarEspecialidadeRepositoryDTO) {
        return Especialidade.create(data);
    }
}

export default new EspecialidadeRepository();