import { Request, Response } from 'express';
import knex from '../data/connection';

class LocalController {
  // rotas referente aos filtros - cidade, estado, itens, etc...

  async index(request: Request, response: Response) {
    // quey params para filtos

    const { cidade, uf, itens } = request.query;

    const parsedItens = String(itens)
      .split(',')
      .map((itens) => Number(itens.trim()));

    const local = await knex('local')
      .join('local_itens', 'local.id', '=', 'local_itens.local.id')
      .where('local_itens.itens_id', parsedItens)
      .where('cidade', String(cidade))
      .where('uf', String(uf))
      .distinct()
      .select('local.*');

    const locaisFormatado = local.map((locais) => {
      return {
        ...locais,
        image_url: `http://192.168.1.12:3333/uploads/${locais.image}`,
      };
    });

    return response.json(locaisFormatado);
  }

  // fim da rota

  // rota referente ao ponto especifico de coleta

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const local = await knex('local').where('id', id).first();

    if (!local) {
      return response.status(400).json({ message: 'Local não encontrado.' });
    }

    const itens = await knex('itens')
      .join('local_itens', 'itens.id', '=', 'local_itens.itens.id')
      .where('local_itens.local_id', id)
      .select('itens.titulo');

    return response.json({ local, itens });
  }

  // fim do ponto específico

  async create(request: Request, response: Response) {
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
      itens,
    } = request.body;
    // Charles, aqui estou trabalhando com short syntax que quando o nome da váriavel é o mesmo nome do objeto
    // podemos omitir o nome da váriavel, exemplo nome : nome

    const trx = await knex.transaction();

    const local = {
      imagem: 'nada',
      nome,
      email,
      telefone,
      endereco,
      cidade,
      uf,
      latitude,
      longitude,
    };

    const setIds = await trx('localColeta').insert(local);

    const local_id = setIds[0];

    const localItens = itens.map((item_id: number) => {
      return {
        item_id,
        local_id,
      };
    });

    await trx('localColeta_itensColeta').insert(localItens);

    await trx.commit(); /* sempre que se usa transact tem que dar . commit
          para que ele faça os insert dentro do banco de dados */

    return response.json({
      id: local_id,
      ...local,
    });
  }
}

export default LocalController;
