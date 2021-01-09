
exports.up = function(knex) {
    return knex.schema.createTable('books', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        t.dateTime('updatedAt').nullable();
        t.string('title').notNull();
        t.text('summary').notNull();
        t.string('isbn').notNull();
        t.integer('genre_id').references('genres.id');
        t.integer('author_id').references('authors.id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('books');
  };
  