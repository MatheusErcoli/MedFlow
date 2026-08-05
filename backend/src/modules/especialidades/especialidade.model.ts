import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Especialidade extends Model<
    InferAttributes<
        Especialidade,
        {
            omit: 'createdAt' | 'updatedAt';
        }
    >,
    InferCreationAttributes<
        Especialidade,
        {
            omit: 'createdAt' | 'updatedAt';
        }
    >
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
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'especialidades',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Especialidade;