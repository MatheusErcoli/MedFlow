import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Sessao extends Model<
    InferAttributes<Sessao, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<Sessao, {
        omit: 'createdAt' | 'updatedAt';
    }>
> {
    declare id: CreationOptional<number>;

    declare agenda_id: number;

    declare numero: number;

    declare inicio: Date | null;
    declare fim: Date | null;
    declare duracao: number | null;

    declare valor: number | null;
    declare pago: CreationOptional<boolean>;
    declare realizada: CreationOptional<boolean>;

    declare observacoes: string | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Sessao.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        agenda_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'agenda',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        inicio: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        fim: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        duracao: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        pago: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        realizada: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'sessoes',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default Sessao;