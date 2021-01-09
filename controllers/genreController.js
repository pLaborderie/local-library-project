const Genre = require('../models/genre');
const Book = require('../models/book');

// Display list of all Genre.
exports.genre_list = async function(req, res, next) {
    try {
        const genre_list = await Genre.fetchAll();
        res.render('genre_list', { title: 'Genre List', genre_list: genre_list.serialize() });
    } catch (err) {
        return next(err);
    }
};

// Display detail page for a specific Genre.
exports.genre_detail = async function(req, res, next) {
    try {
        const [genre, books] = await Promise.all([
            new Genre({ id: req.params.id }).fetch(),
            new Book({ genre_id: req.params.id }).fetchAll(),
        ]);
        if (!genre) {
            const err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', { title: 'Genre Detail', genre: genre.serialize(), genre_books: books.serialize() });
    } catch (err) {
        return next(err);
    }
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};