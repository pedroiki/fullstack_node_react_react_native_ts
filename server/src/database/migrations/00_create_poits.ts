import Knex from 'knex';

// Faz as alterções que precisamos no DB
export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

// Para deletar a tabela, ao contrário da UP
export async function down(knex: Knex) {
    return knex.schema.dropTable('point');
}
