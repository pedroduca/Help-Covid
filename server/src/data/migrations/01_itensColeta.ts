import Knex from 'knex';

export async function up(knex: Knex) {
  // Criar a tabela
  return knex.schema.createTable('itensColeta', table => {
    table.increments('id').primary();
    table.string('titulo').notNullable();
    table.string('imagem').notNullable();
  });
}

export async function down(knex: Knex) {
  // Deletar a tabela
  return knex.schema.dropTable('itensColeta');
}