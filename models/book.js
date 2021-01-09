const bookshelf = require('../bookshelf');

const Book = bookshelf.model('Book', {
    tableName: 'books',
    genre() {
        return this.belongsTo('Genre');
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