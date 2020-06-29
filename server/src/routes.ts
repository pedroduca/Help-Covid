import express from 'express';

import LocalController from './controllers/LocalController';
import ItensController from './controllers/ItensController';

const routes = express.Router();
const localController = new LocalController();
const itensController = new ItensController();

// Listagem dos itens
routes.get('/itens', itensController.index);

// Post dos pontos de coleta
routes.post('/pontos', localController.create);
routes.get('/pontos/:id', localController.show);
routes.get('/pontos', localController.index);

export default routes;
