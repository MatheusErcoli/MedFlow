import { DataTypes, QueryInterface } from 'sequelize';

export async function up({
    context,
}: {
    context: QueryInterface;
}) {
    await context.createTable('documentos', {
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

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}

export async function down({
    context,
}: {
    context: QueryInterface;
}) {
    await context.dropTable('documentos');
}

