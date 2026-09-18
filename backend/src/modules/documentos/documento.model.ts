import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class Documento extends Model<
    InferAttributes<Documento, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<Documento, {
        omit: 'createdAt' | 'updatedAt';
    }>
> {
    declare id: CreationOptional<number>;

    declare usuario_id: number;
    declare paciente_id: number;
    declare sessao_id: number | null;
    declare modelo_documento_id: number | null;

    declare titulo: string;
    declare tipo: string;
    declare caminho_arquivo: string | null;
    declare observacoes: string | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Documento.init(
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

        modelo_documento_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        caminho_arquivo: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'documentos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Documento;

