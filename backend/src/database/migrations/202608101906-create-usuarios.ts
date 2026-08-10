import { DataTypes, QueryInterface } from 'sequelize';

export async function up({
    context,
}: {
    context: QueryInterface;
}) {
    await context.createTable('usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        especialidade_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'especialidades',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        registro_profissional: {
            type: DataTypes.STRING,
            allowNull: true
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ativo'
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
    }
);
}

export async function down({
    context,
}: {
    context: QueryInterface;
}) {
    await context.dropTable('usuarios');
}