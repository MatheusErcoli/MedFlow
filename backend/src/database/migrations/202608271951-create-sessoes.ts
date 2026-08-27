import { DataTypes, QueryInterface } from 'sequelize';

export async function up({
    context,
}: {
    context: QueryInterface;
}) {
    await context.createTable('sessoes',
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
    await context.dropTable('sessoes');
}