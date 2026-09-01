import Usuario from '../modules/usuarios/usuario.model';
import Especialidade from '../modules/especialidades/especialidade.model';
import Paciente from '../modules/pacientes/paciente.model';
import Agenda from '../modules/agenda/agenda.model';
import Sessao from '../modules/sessoes/sessao.model';

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

Sessao.belongsTo(Agenda, {
    foreignKey: 'agenda_id',
    as: 'agenda',
});

Agenda.hasMany(Sessao, {
    foreignKey: 'agenda_id',
    as: 'sessoes',
});