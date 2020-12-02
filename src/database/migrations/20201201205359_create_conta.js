
exports.up = function(knex) {
    return knex.schema.createTable('conta', function(table){
        table.string('nome').notNullable();
        table.integer('numconta').notNullable();
        table.integer('valor').notNullable();
      });
};

exports.down = function(knex) {
   return knex.schema.dropTable('conta');
};