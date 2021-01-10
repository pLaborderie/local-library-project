const { body, validationResult } = require("express-validator");

const Genre = require('../models/genre');
const Book = require('../models/book');

// Display list of all Genre.
exports.genre_list = async function (req, res, next) {
  try {
    const genre_list = await Genre.fetchAll();
    res.render('genre_list', { title: 'Genre List', genre_list: genre_list.toJSON() });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res, next) {
  try {
    const genre = await new Genre({ id: req.params.id })
      .fetch({ withRelated: 'books' });
    if (!genre) {
      const err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }
    res.render('genre_detail', { title: 'Genre Detail', genre: genre.toJSON() });
  } catch (err) {
    return next(err);
  }
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res, next) {
  res.render('genre_form', { title: 'Create Genre' });
};

// Handle Genre create on POST.
exports.genre_create_post = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name });
    if (!errors.isEmpty()) {
      return res.render('genre_form', { title: 'Create Genre', genre: genre.toJSON(), errors: errors.array() });
    }
    new Genre({ name: req.body.name }).fetch({ require: false })
      .then((found_genre) => {
        if (found_genre) {
          res.redirect(found_genre.get('url'));
        } else {
          genre.save({}, { require: false })
            .then((createdGenre) => res.redirect(createdGenre.get('url')))
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};