import {Request, Response} from 'express';
import knex from '../data/connection';

class ItensController {
  async index(request: Request, response: Response) {
    const itens = await knex('itensColeta').select('*');

    const itemFormatado = itens.map(item => {
        return {
            id : item.id,
            title : item.titulo,
            image_url: `http://localhost:3333/temp/${item.imagem}`
        };
    });

    return response.json(itemFormatado);
}
}

export default ItensController;