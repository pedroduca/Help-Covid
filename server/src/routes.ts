import express from 'express';
import knex from './data/connection';

const routes = express.Router();

// Listagem dos itens
routes.get('/itens', async(request, response) => {
    const itens = await knex('itensColeta').select('*');

    const itemFormatado = itens.map(item => {
        return {
            id : item.id,
            title : item.titulo,
            image_url: `http://localhost:3333/temp/${item.imagem}`
        };
    });

    return response.json(itemFormatado);
});

// Post dos pontos de coleta
routes.post('/pontos', async (request,response) => {
// Obs.: Isso é a mesma coisa que fazer const nome = request.body;
    const {
        nome,
        email,
        telefone,
        endereco,
        cidade,
        uf,
        latitude,
        longitude,
        itens
    } = request.body;
    // Charles, aqui estou trabalhando com short syntax que quando o nome da váriavel é o mesmo nome do objeto
    // podemos omitir o nome da váriavel, exemplo nome : nome
    const setIds = await knex('localColeta').insert({
        imagem: 'nada',
        nome,
        email,
        telefone,
        endereco,
        cidade,
        uf,
        latitude,
        longitude,
    });

    const localColetas = setIds[0];

    const localItens = itens.map( (item_id : number)=> {
        return {
            item_id,
            local_id: localColetas
        };
    })

    await knex('localColeta_itensColeta').insert(localItens);

    return response.json({sucess : true});

});

export default routes;