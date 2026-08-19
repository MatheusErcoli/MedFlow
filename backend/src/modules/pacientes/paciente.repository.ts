import { CriarPacienteRepositoryDTO } from '../../types/paciente.types';
import Paciente from './paciente.model';
import Usuario from '../usuarios/usuario.model';

class PacienteRepository {
    async listar(
        page: number,
        limit: number,
        status: 'ativo' | 'inativo'
    ) {
        const offset = (page - 1) * limit;

        const { rows, count } = await Paciente.findAndCountAll({
            where: {
                status,
            },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nome', 'email'],
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
        return Paciente.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nome', 'email'],
                }
            ],
        });
    }

    async buscarPorCpf(cpf: string) {
        return Paciente.findOne({
            where: { cpf },
        });
    }

    async buscarPorEmail(email: string) {
        return Paciente.findOne({
            where: { email },
        });
    }

    async criar(data: CriarPacienteRepositoryDTO) {
        const paciente = await Paciente.create(data);

        return this.buscarPorId(paciente.id);
    }

    async atualizar(id: number, data: Partial<CriarPacienteRepositoryDTO>) {
        const [quantidade] = await Paciente.update(data, {
            where: { id },
        });

        return quantidade > 0;
    }

    async inativar(id: number) {
        const [quantidade] = await Paciente.update(
            { status: 'inativo' },
            { where: { id } }
        );

        return quantidade > 0;
    }

    async ativar(id: number) {
        const [quantidade] = await Paciente.update(
            { status: 'ativo' },
            { where: { id } }
        );

        return quantidade > 0;
    }
    
}

export default new PacienteRepository();