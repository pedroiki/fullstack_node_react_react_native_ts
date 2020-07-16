import Knex from 'knex';

// Faz as alterções que precisamos no DB
export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title', 2).notNullable();
    });
}

// Para deletar a tabela, ao contrário da UP
export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}
