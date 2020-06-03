import express from 'express';


//importação de arquivos de rota
import ItemsController from './controllers/itemsController';
import PointsController from './controllers/pointsController';


const routes = express.Router();
const itemsController = new ItemsController();//instanciando  class
const pointsController = new PointsController();//instanciando  class

//ROTAS    
routes.get('/items', itemsController.index);//lista estatica de items

//Rotas de pontos
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);

//meu desafio == criar uma rota para listar todos os pontos

export default routes;

//service pattern
//repository parttern(data mapper)

