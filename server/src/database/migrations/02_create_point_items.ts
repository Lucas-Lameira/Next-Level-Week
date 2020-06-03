import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('point_items', table => {
        //chave primaria dessa tabela 'point_items
        table.increments('id').primary();

        //todo id nessa tabela precisa ser um id valido na tabela ponts
        table.integer('point_id') //integer pois o id referenciado é do tipo integer
            .notNullable()
            .references('id')
            .inTable('points'); 
           
        //todo id nessa tabela precisa ser um id valido na tabela items
        table.integer('item_id')  //integer pois o id referenciado é do tipo integer
            .notNullable()
            .references('id')
            .inTable('items');
    })
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items');
}
