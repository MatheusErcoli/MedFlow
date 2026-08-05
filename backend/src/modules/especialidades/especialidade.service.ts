import slugify from "slugify";

import especialidadeRepository from "./especialidade.repository";
import { ConflictError } from "../../errors/ConflictError";
import { CriarEspecialidadeDTO } from "../especialidades/especialidade.schema";
class EspecialidadeService {
    async listar() {
        return especialidadeRepository.listar();
    }

    async criar(data: CriarEspecialidadeDTO) {
        const slug = slugify(data.nome, {
            lower: true,
            strict: true,
            locale: 'pt'
        });

        const especialidadeExistente = await especialidadeRepository.buscarPorSlug(slug);

        if (especialidadeExistente) {
            throw new ConflictError(
                'Já existe uma especialidade com esse nome.'
            )
        }

        return especialidadeRepository.criar({
            nome: data.nome,
            slug,
            ativo: true,
        });
    }
}

export default new EspecialidadeService();