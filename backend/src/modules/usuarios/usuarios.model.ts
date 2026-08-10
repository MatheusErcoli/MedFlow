import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Usuario extends Model<
    InferAttributes<Usuario, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<Usuario, {
        omit: 'createdAt' | 'updatedAt';
    }>
> {
    declare id: CreationOptional<number>;

    declare especialidade_id: number;

    declare nome: string;
    declare email: string;
    declare senha: string;
    declare telefone: string;
    declare cpf: string;
    declare registro_profissional: string;
    declare foto: string;

    declare status: CreationOptional<string>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        especialidade_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'especialidades',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        cpf: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        registro_profissional: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        foto: {
            type: DataTypes.STRING,
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
        tableName: 'usuarios',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Usuario;