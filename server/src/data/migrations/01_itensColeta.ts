import Knex from 'knex';

export async function up(knex: Knex) {
  // Criar a tabela
  return knex.schema.createTable('itensColeta', table => {
    table.increments('id').primary();
    table.string('imagem').notNullable();
    table.string('titulo').notNullable();
  });
}

export async function down(knex: Knex) {
  // Deletar a tabela
  return knex.schema.dropTable('itensColeta');
}