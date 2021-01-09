
exports.up = function(knex) {
  return knex.schema.createTable('authors', function(t) {
      t.increments('id').unsigned().primary();
      t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').nullable();
      t.string('first_name').notNull();
      t.string('family_name').notNull();
      t.date('date_of_birth');
      t.date('date_of_death');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('authors');
};
