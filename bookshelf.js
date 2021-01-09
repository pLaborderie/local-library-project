const knexConfig = require('./knexfile');
const knex = require('knex')(process.env.NODE_ENV === 'production' ? knexConfig.production : knexConfig.development);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('bookshelf-virtuals-plugin');
bookshelf.plugin(require('bookshelf-eloquent'));
module.exports = bookshelf;