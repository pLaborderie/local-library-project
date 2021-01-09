
exports.up = function(knex) {
    return knex.schema.createTable('genres', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.string('name').notNull();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('genres');
  };
  