import Usuario from '../modules/usuarios/usuario.model';
import Especialidade from '../modules/especialidades/especialidade.model';
import Paciente from '../modules/pacientes/paciente.model';
import Agenda from '../modules/agenda/agenda.model';
import Sessao from '../modules/sessoes/sessao.model';
import Prontuario from '../modules/prontuarios/prontuario.model';
import Documento from '../modules/documentos/documento.model';
import ModeloDocumento from '../modules/modelos-documentos/modelo-documento.model';
import Anexo from '../modules/anexos/anexo.model';

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

Sessao.hasOne(Prontuario, {
    foreignKey: 'sessao_id',
    as: 'prontuario',
});

Prontuario.belongsTo(Sessao, {
    foreignKey: 'sessao_id',
    as: 'sessao',
});

Documento.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario',
});

Usuario.hasMany(Documento, {
    foreignKey: 'usuario_id',
    as: 'documentos',
});

Documento.belongsTo(Paciente, {
    foreignKey: 'paciente_id',
    as: 'paciente',
});

Paciente.hasMany(Documento, {
    foreignKey: 'paciente_id',
    as: 'documentos',
});

Documento.belongsTo(Sessao, {
    foreignKey: 'sessao_id',
    as: 'sessao',
});

Sessao.hasMany(Documento, {
    foreignKey: 'sessao_id',
    as: 'documentos',
});

ModeloDocumento.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario',
});

Usuario.hasMany(ModeloDocumento, {
    foreignKey: 'usuario_id',
    as: 'modelosDocumentos',
});

Anexo.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario',
});

Usuario.hasMany(Anexo, {
    foreignKey: 'usuario_id',
    as: 'anexos',
});

Anexo.belongsTo(Paciente, {
    foreignKey: 'paciente_id',
    as: 'paciente',
});

Paciente.hasMany(Anexo, {
    foreignKey: 'paciente_id',
    as: 'anexos',
});

Anexo.belongsTo(Sessao, {
    foreignKey: 'sessao_id',
    as: 'sessao',
});

Sessao.hasMany(Anexo, {
    foreignKey: 'sessao_id',
    as: 'anexos',
});