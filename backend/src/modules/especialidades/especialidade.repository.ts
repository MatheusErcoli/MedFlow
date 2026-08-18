import { AtualizarEspecialidadeRepositoryDTO, CriarEspecialidadeRepositoryDTO } from '../../types/especialidade.types';
import Especialidade from './especialidade.model';

class EspecialidadeRepository {
    async listar(ativo: boolean) {
        return Especialidade.findAll({
            where: { ativo },
            order: [['nome', 'ASC']],
        });
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

    async atualizar( id: number, data: AtualizarEspecialidadeRepositoryDTO) {
        const [quantidade] = await Especialidade.update(data, {
            where: { id },
        });

        return quantidade > 0;
    }

    async ativar(id: number) {
        const [quantidade] = await Especialidade.update(
            { ativo: true },
            {
                where: { id },
            }
        );

        return quantidade > 0;
    }

    async inativar(id: number) {
        const [quantidade] = await Especialidade.update(
            { ativo: false },
            {
                where: { id },
            }
        );

        return quantidade > 0;
    }
}

export default new EspecialidadeRepository();