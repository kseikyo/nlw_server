import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import multerConfig from './config/multer';

import { celebrate } from 'celebrate';
import  Joi  from '@hapi/joi';
import multer from 'multer';

const routes = express.Router();
const upload = multerConfig.upload;

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post(
  '/points',
  (req, res, next) => {
    upload.single('image')(req, res, (err: any) => {
      if(err instanceof multer.MulterError) {
        res.json({ message: 'File is bigger than 2MB.' });
      }
      else if(err) {
        res.status(400).json({ message: 'File type is not accepted.'})
      }
      next();
    })
  },
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false
  }),
  pointsController.create
  );

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;