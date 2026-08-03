import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Especialidade extends Model<
    InferAttributes<Especialidade>,
    InferCreationAttributes<Especialidade>
> {
    declare id: CreationOptional<number>;

    declare nome: string;

    declare slug: string;

    declare ativo: CreationOptional<boolean>;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;
}

Especialidade.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'especialidades',
        timestamps: false,
    }
);

export default Especialidade;