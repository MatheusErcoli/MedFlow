import especialidadeRepository from "./especialidade.repository";

class EspecialidadeService {
    async listar() {
        return especialidadeRepository.listar();
    }
}

export default new EspecialidadeService();