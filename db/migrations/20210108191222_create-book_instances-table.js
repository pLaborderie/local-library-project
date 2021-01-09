
exports.up = function(knex) {
    return knex.schema.createTable('book_instances', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.string('imprint').notNull();
        t.enu('status', ['Available', 'Maintenance', 'Loaned', 'Reserved']).notNull().defaultTo('Maintenance');
        t.dateTime('due_back').notNull().defaultTo(knex.fn.now());
        t.integer('book_id').references('books.id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('book_instances');
  };
  