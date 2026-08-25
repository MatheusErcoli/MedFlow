import { DataTypes, QueryInterface } from 'sequelize';

export async function up({
    context,
}: {
    context: QueryInterface;
}) {
    await context.createTable('agenda', {
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
        },

        paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'pacientes',
                key: 'id',
            },
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
    });
}

export async function down({
    context,
}: {
    context: QueryInterface;
}) {
    await context.dropTable('agenda');
}