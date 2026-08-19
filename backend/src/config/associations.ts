import Usuario from '../modules/usuarios/usuario.model';
import Especialidade from '../modules/especialidades/especialidade.model';
import Paciente from '../modules/pacientes/paciente.model';

Usuario.belongsTo(Especialidade, {
    foreignKey: 'especialidade_id',
    as: 'especialidade',
});

Especialidade.hasMany(Usuario, {
    foreignKey: 'especialidade_id',
    as: 'usuarios',
});

Paciente.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario',
});

Usuario.hasMany(Paciente, {
    foreignKey: 'usuario_id',
    as: 'pacientes',
});