var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        book_count: function(callback) {
            Book.count().then(res => callback(null, res)); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.count().then(res => callback(null, res));
        },
        book_instance_available_count: function(callback) {
            BookInstance.count({status: 'Available'}).then(res => callback(null, res));
        },
        author_count: function(callback) {
            Author.count().then(res => callback(null, res));
        },
        genre_count: function(callback) {
            Genre.count().then(res => callback(null, res));
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results, layout: 'layout.ejs' });
    });
};

// Display list of all books.
exports.book_list = function(req, res, next) {
    new Book().fetchAll({ columns: ['title', 'author_id', 'id'], withRelated: 'author' })
        .then((books) => {
            res.render('book_list', { title: 'Book List', book_list: books.toJSON() });
        })
        .catch((err) => {
            return next(err);
        });
};

// Display detail page for a specific book.
exports.book_detail = async function(req, res, next) {
    const { id } = req.params;
    try {
        const book = await new Book({ id }).fetch({ withRelated: ['bookinstance', 'author', 'genres'] });
        if (!book) {
            const err = new Error('Book not found');
            err.status = 404;
            throw err;
        }
        res.render('book_detail', { title: 'Book Details', book: book.toJSON() });
    } catch (err) {
        return next(err);
    }
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};