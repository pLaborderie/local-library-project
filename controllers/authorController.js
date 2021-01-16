const { body, validationResult } = require('express-validator');
const Author = require('../models/author');

// Display list of all Authors.
exports.author_list = async function (req, res, next) {
  try {
    const authors = await Author.orderBy('family_name', 'asc').fetchAll();
    res.render('author_list', { title: 'Author List', author_list: authors.toJSON() });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res, next) {
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
exports.author_create_get = function (req, res) {
  res.render('author_form', { title: 'Create Author' });
};

// Handle Author create on POST.
exports.author_create_post = [
  body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('author_form', {
        title: 'Create Author',
        author: req.body,
        errors: errors.array()
      });
    }
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth || null,
      date_of_death: req.body.date_of_death || null,
    });
    author.save().then((data) => {
      res.redirect(data.url);
    }).catch(err => next(err));
  }
];

// Display Author delete form on GET.
exports.author_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};