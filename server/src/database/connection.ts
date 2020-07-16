import knex from 'knex';
import path from 'path';

// __dirname - Caminho do diretório executando ele, nesse caso src/database
// path.resolve() - Ele retorna igual para Win e Linux
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;
