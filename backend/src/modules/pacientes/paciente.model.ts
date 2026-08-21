import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Paciente extends Model<
    InferAttributes<Paciente, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<Paciente, {
        omit: 'createdAt' | 'updatedAt';
    }>
> {
    declare id: CreationOptional<number>;

    declare usuario_id: number;

    declare nome: string;
    declare foto: string | null;
    declare cpf: string;
    declare sexo: string | null
    declare data_nascimento: string | null;
    declare estado_civil: string | null;
    declare telefone: string | null;
    declare email: string;

    declare cep: string | null;
    declare logradouro: string | null;
    declare numero: string | null;
    declare complemento: string | null
    declare bairro: string | null;
    declare cidade: string | null;
    declare estado: string | null;
    
    declare profissao: string | null
    declare contato_emergencia: string | null;
    declare telefone_emergencia: string | null
    declare observacoes: Text | null;
    declare status: CreationOptional<'ativo' | 'inativo'>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Paciente.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        sexo: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        data_nascimento: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        estado_civil: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        cep: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        logradouro: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        numero: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        complemento: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        bairro: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        cidade: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        estado: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        profissao: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        contato_emergencia: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        telefone_emergencia: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ativo',
        },
    },
    {
        sequelize,
        tableName: 'pacientes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Paciente;