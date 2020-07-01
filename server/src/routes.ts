import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/muller';

import LocalController from './controllers/LocalController';
import ItensController from './controllers/ItensController';

const routes = express.Router();
const upload = multer(multerConfig);

const localController = new LocalController();
const itensController = new ItensController();

// Listagem dos itens
routes.get('/itens', itensController.index);
routes.get('/pontos', localController.index);
routes.get('/pontos/:id', localController.show);

routes.post(
  '/pontos',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  localController.create
);

export default routes;
