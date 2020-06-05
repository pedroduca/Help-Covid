import Knex from 'knex';
export async function seed(knex: Knex){
  await knex('itensColeta').insert([ 
   { titulo: 'Plástico', imagem: 'plastico.png'},
   { titulo: 'Borracha', imagem: 'borracha.png'},
   { titulo: 'Vidro', imagem: 'vidro.png'},
   { titulo: 'Madeira', imagem: 'madeira.png'},
   { titulo: 'Entulho', imagem: 'entulho.png'},
   { titulo: 'Papel', imagem: 'papel.png'},
   { titulo: 'Metal', imagem: 'metal.png'},
   { titulo: 'Móveis', imagem: 'moveis.png'},
   { titulo: 'Eletronicos', imagem: 'eletronicos.png'},
   { titulo: 'Eletrodomésticos', imagem: 'eletrodomesticos.png'},
  ]); 
}