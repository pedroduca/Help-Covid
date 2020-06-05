import Knex from 'knex';

export async function up(knex: Knex) {
  // Criar a tabela
  return knex.schema.createTable('localColeta_itensColeta', table => {
    table.increments('id').primary();
    table.integer('local_id')
      .notNullable()
      .references('id')
      .inTable('localColeta');
    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('itensColeta');
  });
}

export async function down(knex: Knex) {
  // Deletar a tabela
  return knex.schema.dropTable('localColeta_itensColeta');
}