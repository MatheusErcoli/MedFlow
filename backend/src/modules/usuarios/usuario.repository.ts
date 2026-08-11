import { CriarUsuarioRepositoryDTO } from '../../types/usuario.types';
import Usuario from './usuario.model';

class UsuarioRepository {
    async listar() {
        return Usuario.findAll({
            attributes: {
                exclude: ['senha'],
            },
            order: [['nome', 'ASC']]
        })
    }

    async buscarPorId(id: number) {
        return Usuario.findByPk(id, {
            attributes: {
                exclude: ['senha'],
            },
        });
    }

    async buscarPorEmail(email: string) {
        return Usuario.findOne({
            where: { email },
        });
    }

    async criar(data: CriarUsuarioRepositoryDTO) {
        return Usuario.create(data);
    }
}

export default new UsuarioRepository();