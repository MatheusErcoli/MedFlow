import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from '../../config/database';

class ModeloDocumento extends Model<
    InferAttributes<ModeloDocumento, {
        omit: 'createdAt' | 'updatedAt';
    }>,
    InferCreationAttributes<ModeloDocumento, {
        omit: 'createdAt' | 'updatedAt';
    }>
> {
    declare id: CreationOptional<number>;

    declare usuario_id: number;

    declare nome: string;
    declare descricao: string | null;
    declare tipo: string;
    declare conteudo: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ModeloDocumento.init(
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

        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        conteudo: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'modelos_documentos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default ModeloDocumento;

