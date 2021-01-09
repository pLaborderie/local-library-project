const bookshelf = require('../bookshelf');
const { DateTime } = require('luxon');

const BookInstance = bookshelf.model('BookInstance', {
    tableName: 'book_instances',
    book() {
        return this.belongsTo('Book');
    },
    virtuals: {
        url() {
            return '/catalog/bookinstance/' + this.get('id');
        },
        due_back_formatted() {
            return DateTime.fromJSDate(this.get('due_back')).toLocaleString(DateTime.DATE_MED);
        }
    }
});

module.exports = BookInstance;