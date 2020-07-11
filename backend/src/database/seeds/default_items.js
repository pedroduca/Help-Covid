exports.seed = async function (knex) {
  await knex("items").insert([
    { title: "Alcool em Gel", image: "alcool.svg" },
    { title: "Alimentos", image: "alimentos.svg" },
    { title: "Dinheiro", image: "dinheiro.svg" },
    { title: "Roupas", image: "roupas.svg" },
    { title: "Sangue", image: "sangue.svg" },
    { title: "Máscaras", image: "mascaras.svg" },
    { title: "Respiradores", image: "respiradores.svg" },
  ]);
};
