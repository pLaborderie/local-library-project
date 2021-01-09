const bookshelf = require('../bookshelf');

const Author = bookshelf.model('Author', {
    tableName: 'authors',
    books() {
        return this.hasMany('Book');
    },
    virtuals: {
         name() {
            return this.get('first_name') + ' ' + this.get('family_name');
        },
         lifespan() {
            return ((this.get('date_of_death') || new Date()).getYear() - this.get('date_of_birth').getYear()).toString();
        },
         url() {
            return '/catalog/author/' + this.get('id');
        },
    },
});

module.exports = Author;