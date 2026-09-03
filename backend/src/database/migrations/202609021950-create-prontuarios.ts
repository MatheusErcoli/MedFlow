import { DataTypes, QueryInterface } from 'sequelize';

export async function up({
    context,
}: {
    context: QueryInterface;
}) {
    await context.createTable('prontuarios', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        sessao_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'sessoes',
                key: 'id',
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },

        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        conteudo: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        }
    });
}

export async function down({
    context,
}: {
    context: QueryInterface;
}) {
    await context.dropTable('prontuarios');
}