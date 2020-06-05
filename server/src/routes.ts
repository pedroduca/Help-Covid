import express from 'express';
import knex from './database/connection';

const routes = express.Router();

// Listagem dos itens
routes.get('/itens', async(request, response) => {
    const itens = await knex('itensColeta').select('*');

    const itemFormatado = itens.map(item => {
        return {
            title : item.titulo,
            image_url: `http://localhost:3333/temp/${item.imagem}`
        };
    });

    return response.json(itemFormatado);
});

// Post dos pontos de coleta
routes.post('/points', async(request,response) => {
    
// Obs.: Isso é a mesma coisa que fazer const nome = request.body;
    const {
        nome,
        email,
        telefone,
        endereco,
        cidade,
        latitude,
        longitude,
        uf,
        itens
    } = request.body;

    await knex('localColeta').insert({
        imagem: 'nada',
        nome,
        email,
        telefone,
        endereco,
        cidade,
        latitude,
        longitude,
        uf,
    });

    return response.json({sucess : true});

});

export default routes;