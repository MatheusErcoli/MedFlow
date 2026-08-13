import Usuario from '../modules/usuarios/usuario.model';
import Especialidade from '../modules/especialidades/especialidade.model';

Usuario.belongsTo(Especialidade, {
    foreignKey: 'especialidade_id',
    as: 'especialidade',
});

Especialidade.hasMany(Usuario, {
    foreignKey: 'especialidade_id',
    as: 'usuarios',
});