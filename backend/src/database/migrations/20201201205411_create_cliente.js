

exports.up = function(knex) {
    return knex.schema.createTable('cliente', function(table){
        table.string('idcliente').primary();
        table.string('nomecliente').notNullable();
        table.date('datNascimento').notNullable();
        table.integer('telcliente').notNullable();
        table.integer('RGcliente').notNullable();
        table.integer('CPFcliente').notNullable();
        table.string('ruacliente').notNullable();
        table.string('bairro').notNullable();
        table.integer('numcliente').notNullable();
      });
};

exports.down = function(knex) {
   return knex.schema.dropTable('cliente');
};