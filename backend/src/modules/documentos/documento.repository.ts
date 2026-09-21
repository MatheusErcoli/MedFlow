import { AtualizarPacienteRepositoryDTO, CriarPacienteRepositoryDTO } from '../../types/paciente.types';
import Paciente from '../pacientes/paciente.model';
import Usuario from '../usuarios/usuario.model';
import {
    AtualizarDocumentoRepositoryDTO,
    CriarDocumentoRepositoryDTO,
} from '../../types/documentos.types';
import Documento from './documento.model';

class DocumentoRepository {

    async listar(page: number, limit: number) {
        const offset = (page - 1) * limit;

        const { rows, count } = await Documento.findAndCountAll({
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
        return Documento.findByPk(id);
    }

    async criar(dados: CriarDocumentoRepositoryDTO) {
        const documento = await Documento.create(dados);
        return this.buscarPorId(documento.id);
    }

    async atualizar(id: number, dados: AtualizarDocumentoRepositoryDTO) {
        const [quantidade] = await Documento.update(dados, {
            where: { id },
        });

        return quantidade > 0;
    }

    async deletar(id: number) {
        const quantidade = await Documento.destroy({
            where: { id },
        });

        return quantidade > 0;
    }

}

export default new DocumentoRepository();

