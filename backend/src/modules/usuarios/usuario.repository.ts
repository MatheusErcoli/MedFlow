import { CriarUsuarioRepositoryDTO } from '../../types/usuario.types';
import Usuario from './usuario.model';
import Especialidade from '../especialidades/especialidade.model';

class UsuarioRepository {
    async listar(page: number, limit: number) {
        const offset = (page - 1) * limit;

        const { rows, count } = await Usuario.findAndCountAll({
            attributes: {
                exclude: ['senha'],
            },
            include: [
                {
                    model: Especialidade,
                    as: 'especialidade',
                    attributes: ['id', 'nome', 'slug'],
                }
            ],
            order: [['nome', 'ASC']],
            limit,
            offset,
        });

        return {
            dados: rows,
            total: count,
        };
    }

    async buscarPorId(id: number) {
        return Usuario.findByPk(id, {
            attributes: {
                exclude: ['senha'],
            },
            include: [
                {
                    model: Especialidade,
                    as: 'especialidade',
                    attributes: ['id', 'nome', 'slug'],
                }
            ],
        });
    }

    async buscarPorEmail(email: string) {
        return Usuario.findOne({
            where: { email },
        });
    }

    async criar(data: CriarUsuarioRepositoryDTO) {
        const usuario = await Usuario.create(data);

        return this.buscarPorId(usuario.id);
    }

    async atualizar(id: number, data: Partial<CriarUsuarioRepositoryDTO>) {
        const [quantidade] = await Usuario.update(data, {
            where: { id },
        });

        return quantidade > 0;
    }

    async deletar(id: number) {
        const quantidade = await Usuario.destroy({
            where: { id },
        });

        return quantidade > 0;
    }
}

export default new UsuarioRepository();