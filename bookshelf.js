const knexConfig = require('./knexfile');

const knex = require('knex')(knexConfig.development);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('bookshelf-virtuals-plugin');
module.exports = bookshelf;