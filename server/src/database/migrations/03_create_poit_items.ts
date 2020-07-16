import Knex from 'knex';

// Faz as alterções que precisamos no DB
export async function up(knex: Knex) {
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();

        table.integer('point_id')
            .references('id')
            .inTable('points')
            .notNullable();

        table.integer('item_id')
            .references('id')
            .inTable('items')
            .notNullable();
    });
}

// Para deletar a tabela, ao contrário da UP
export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items');
}
