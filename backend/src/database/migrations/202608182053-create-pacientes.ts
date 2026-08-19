import { DataTypes, QueryInterface } from 'sequelize';

export async function up({
    context,
}: {
    context: QueryInterface;
}) {
    await context.createTable('pacientes',
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

            foto: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            sexo: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            data_nascimento: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            estado_civil: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            telefone: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },

            cep: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            logradouro: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            numero: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            complemento: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            bairro: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            cidade: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            estado: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            profissao: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            contato_emergencia: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            telefone_emergencia: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            observacoes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'ativo',
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
    await context.dropTable('pacientes');
}