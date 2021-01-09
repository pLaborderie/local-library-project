const bookshelf = require('../bookshelf');

const BookInstance = bookshelf.model('BookInstance', {
    tableName: 'book_instances',
    book() {
        return this.belongsTo('Book');
    },
    virtuals: {
        url() {
            return '/catalog/bookinstance/' + this.get('id');
        }
    }
});

module.exports = BookInstance;