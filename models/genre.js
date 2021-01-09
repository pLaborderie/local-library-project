const bookshelf = require('../bookshelf');

const Genre = bookshelf.model('Genre', {
    tableName: 'genres',
    books() {
        return this.hasMany('Book');
    },
    virtuals: {
        url() {
            return '/catalog/genre/' + this.get('id');
        }
    }
});

module.exports = Genre;