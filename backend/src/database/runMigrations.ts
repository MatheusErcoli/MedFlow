import { migrate } from './migrator';

async function run() {
    try {
        console.log('Executando migrations...');
    
        await migrate();

        console.log('Migrations executadas com sucesso!');

        process.exit(0);
    } catch (error) {
        console.error('Erro ao executar migrations.');

        console.error(error);

        process.exit(1);
    }
}

run();