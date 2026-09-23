import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Anexo extends Model<
    InferAttributes<Anexo, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<Anexo, {
        omit: 'createdAt' | 'updatedAt';
    }>
> {
    declare id: CreationOptional<number>;
    declare usuario_id: number;
    declare paciente_id: number;
    declare sessao_id: number | null;
    declare nome: string;
    declare descricao: string | null;
    declare caminho_arquivo: string;
    declare tipo: string;
    declare mime_type: string;
    declare tamanho_bytes: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Anexo.init(
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
            allowNull: false,
            references: {
                model: 'pacientes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        sessao_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sessoes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        caminho_arquivo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        mime_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        tamanho_bytes: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'anexos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

export default Anexo;