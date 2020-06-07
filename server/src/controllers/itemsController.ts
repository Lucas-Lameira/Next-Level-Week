import {Request, Response} from 'express';//importação para typescript: com a primeira letra maiuscula
import knex from '../database/connection';

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image: `http://192.168.0.23:3333/uploads/${item.image}`,
            };
        })
    
        return response.json(serializedItems);
    }
}

export default ItemsController;