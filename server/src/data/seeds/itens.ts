import Knex from 'knex';
export async function seed(knex: Knex) {
  await knex('itensColeta').insert([
    { titulo: 'Plástico', imagem: 'plastico.svg' },
    { titulo: 'Borracha', imagem: 'borracha.svg' },
    { titulo: 'Vidro', imagem: 'vidro.svg' },
    { titulo: 'Madeira', imagem: 'madeira.svg' },
    { titulo: 'Entulho', imagem: 'entulho.svg' },
    { titulo: 'Papel', imagem: 'papel.svg' },
    { titulo: 'Metal', imagem: 'metal.svg' },
    { titulo: 'Móveis', imagem: 'moveis.svg' },
    { titulo: 'Eletronicos', imagem: 'eletronicos.svg' },
    { titulo: 'Eletrodomésticos', imagem: 'eletrodomesticos.svg' },
  ]);
}
