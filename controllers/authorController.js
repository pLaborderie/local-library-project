const Author = require('../models/author');

// Display list of all Authors.
exports.author_list = async function(req, res, next) {
    try {
        const authors = await Author.orderBy('family_name', 'asc').fetchAll()
        res.render('author_list', { title: 'Author List', author_list: authors.toJSON() });
    } catch (err) {
        return next(err);
    }
};

// Display detail page for a specific Author.
exports.author_detail = async function(req, res, next) {
    try {
        const author = await new Author({ id: req.params.id }).fetch({ withRelated: ['books'] });
        if (!author) {
            const err = new Error('Author not found');
            err.status(404);
            throw err;
        }
        res.render('author_detail', { title: 'Author Detail', author: author.toJSON() });
    } catch (err) {
        next(err);
    }
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};