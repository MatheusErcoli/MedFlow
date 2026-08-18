import slugify from "slugify";

import especialidadeRepository from "./especialidade.repository";
import { ConflictError } from "../../errors/ConflictError";
import { AtualizarEspecialidadeDTO, CriarEspecialidadeDTO } from "../especialidades/especialidade.schema";
import { NotFoundError } from "../../errors/NotFoundError";
class EspecialidadeService {
    async listar(ativo: boolean) {
        return especialidadeRepository.listar(ativo);
    }

    async buscarPorId(id: number) {
        const especialidade = await especialidadeRepository.buscarPorId(id);

        if (!especialidade) {
            throw new NotFoundError('Especialidade não encontrada.');
        }

        return especialidade;
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

    async atualizar(id: number, data: AtualizarEspecialidadeDTO) {
        const especialidade = await especialidadeRepository.buscarPorId(id);

        if (!especialidade) {
            throw new NotFoundError('Especialidade não encontrada.');
        }

        if (data.nome) {
            const slug = slugify(data.nome, {
                lower: true,
                strict: true,
                locale: 'pt',
            });

            const especialidadeExistente =
                await especialidadeRepository.buscarPorSlug(slug);

            if (
                especialidadeExistente &&
                especialidadeExistente.id !== id
            ) {
                throw new ConflictError(
                    'Já existe uma especialidade com esse nome.'
                );
            }

            await especialidadeRepository.atualizar(id, {
                ...data,
                slug,
            });
        } else {
            await especialidadeRepository.atualizar(id, data);
        }

        return especialidadeRepository.buscarPorId(id);
    }

    async ativar(id: number) {
        const especialidade = await especialidadeRepository.buscarPorId(id);

        if (!especialidade) {
            throw new NotFoundError('Especialidade não encontrada.');
        }

        await especialidadeRepository.ativar(id);

        return especialidadeRepository.buscarPorId(id);
    }

    async inativar(id: number) {
        const especialidade = await especialidadeRepository.buscarPorId(id);

        if (!especialidade) {
            throw new NotFoundError('Especialidade não encontrada.');
        }

        await especialidadeRepository.inativar(id);

        return especialidadeRepository.buscarPorId(id);
    }
}

export default new EspecialidadeService();