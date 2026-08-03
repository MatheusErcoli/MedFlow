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
}

export default new EspecialidadeRepository();