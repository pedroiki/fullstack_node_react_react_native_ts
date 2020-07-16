// O Knex não aceita o export default
import path from "path";

module.exports = {
    client: 'sqlite3',
    connection: {
        // 'src', 'database', 'database.sqlite'-> Significa -> src/database/database.sqlite'
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
    seeds: { // Massa de dados
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
};
