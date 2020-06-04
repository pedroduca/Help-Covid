import Knex from 'knex';

// Cria tabela
export async function up(knex: Knex) {
    return knex.schema.createTable('localColeta', table => {
        table.increments('id').primary();
        table.string('imagem').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.string('endereço').notNullable();
        table.string('cidade').notNullable();
        table.string('UF', 2).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
    });
}

// Apaga tabela
export async function down(knex: Knex) {
    return knex.schema.dropTable('localColeta');
}