const bookshelf = require('../bookshelf');

const Book = bookshelf.model('Book', {
    tableName: 'books',
    genres() {
        return this.belongsToMany('Genre');
    },
    bookinstance() {
        return this.hasMany('BookInstance');
    },
    author() {
        return this.belongsTo('Author');
    },
    virtuals: {
        url() {
            return '/catalog/book/' + this.get('id');
        }
    }
});

module.exports = Book;