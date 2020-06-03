import Knex from 'knex'; //os tipos do typescript, na maioria, começam com letra maiúscula

export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary(); //integer
        table.string('image').notNullable();//salva a referencia do arquivo da imagem e nao a imagem em si
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}