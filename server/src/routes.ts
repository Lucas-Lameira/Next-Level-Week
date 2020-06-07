import express from 'express';
import {celebrate, Joi} from 'celebrate'
//Biblioteca de upload e as suas configurações
import multer from 'multer';
import multerConfig from  './config/multer';

//importação de arquivos de rota
import ItemsController from './controllers/itemsController';
import PointsController from './controllers/pointsController';



const routes = express.Router();
const upload = multer(multerConfig);


const itemsController = new ItemsController();//instanciando  class
const pointsController = new PointsController();//instanciando  class

     
//lista estatica de items
routes.get('/items', itemsController.index);

//Rotas de pontos
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);
    
routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),                                
        })
    },{
           abortEarly: false 
    }),
    pointsController.create
);

//meu desafio == criar uma rota para listar todos os pontos

export default routes;

//service pattern
//repository parttern(data mapper)

