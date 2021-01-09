const { DateTime } = require('luxon');
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
             console.log(this.get('date_of_birth'));
            return ((this.get('date_of_death') || new Date()).getYear() - (this.get('date_of_birth') || new Date()).getYear()).toString();
        },
         url() {
            return '/catalog/author/' + this.get('id');
        },
        date_of_birth_formatted() {
            const date = this.get('date_of_birth')
            return date ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED) : 'Unknown';
        },
        date_of_death_formatted() {
            const date = this.get('date_of_death')
            return date ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED) : 'Unknown';
        }
    },
});

module.exports = Author;