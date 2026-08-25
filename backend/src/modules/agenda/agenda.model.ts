import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Agenda extends Model<
    InferAttributes<Agenda, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<Agenda, {
        omit: 'createdAt' | 'updatedAt';
    }>
>   {
    declare id: CreationOptional<number>;

    declare usuario_id: number;
    declare paciente_id: number;

    declare titulo: string;
    declare tipo: string;
    declare inicio: Date;
    declare fim: Date;
    declare status: string;
    declare lembrete_minutos: number | null;
    declare observacoes: Text | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Agenda.init(
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

        paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pacientes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        fim: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lembrete_minutos: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'agenda',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default Agenda;