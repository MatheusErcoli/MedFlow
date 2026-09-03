import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Prontuario extends Model<
    InferAttributes<Prontuario, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<Prontuario, {
        omit: 'createdAt' | 'updatedAt';
    }>
> {
    declare id: CreationOptional<number>;

    declare sessao_id: number;

    declare titulo: string;

    declare conteudo: string | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Prontuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        sessao_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sessoes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        conteudo: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'prontuarios',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default Prontuario;