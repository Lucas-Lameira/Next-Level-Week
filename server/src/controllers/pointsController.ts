import {Request, Response} from 'express';//importação para typescript: com a primeira letra maiuscula
import knex from '../database/connection';


class PointsController {
    async show (request: Request, response: Response) {
        const { id } = request.params; //const id = request.params.id

        const point = await knex('points').where('id', id).first();
        
        if(!point)
            return response.status(400).json({message: 'erou!'})
        
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({point, items});
    }

    async index (request: Request, response: Response) {
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct() 
            .select('points.*');

        return response.json(points);
    }

    async create (request: Request, response: Response) {
        //recurso de desestruturação
        const {name, email, whatsapp, latitude, longitude, city, uf, items} = request.body; //items é um vetor contendo o id dos items selecionados (de 1 a6)
        
        const trx = await knex.transaction();
    
        //short sintaxe nome da variavel é igual a do objeto (name: name) === name,
        //id como increments() no banco de dados
        const points = {
            image: 'deep-https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

        const insertedIds = await trx('points').insert(points); //O método insert() retorna os ids dos dados que foram inseridos
        const point_id = insertedIds[0];
        //console.log(id);
    
        //inserir na tabela de relacionamento n:n ('point_items')
        const pointItems = items.map((item_id: number) => { //items é um array contendo o id dos items que foram escolhidos
            //console.log(item_id);
            return {
                item_id,
                point_id,
            }
        });

        await trx('point_items').insert(pointItems);
    
        await trx.commit();
        return response.json({
            id: point_id,
            ...points,
        });
    }
}

export default PointsController;