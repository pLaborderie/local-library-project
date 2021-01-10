
exports.up = function(knex) {
  return knex.schema
    .createTable('books_genres', function(t) {
    t.increments('id').unsigned().primary();
    t.integer('book_id').references('books.id');
    t.integer('genre_id').references('genres.id');
  }).table('books', function(t) {
    t.dropColumn('genre_id');
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('book_genres')
    .table('books', function(t) {
      t.integer('genre_id').references('genres.id');
    });
};
