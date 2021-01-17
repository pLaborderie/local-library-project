const { body, validationResult } = require('express-validator');

const Book = require('../models/book');
const BookInstance = require('../models/bookinstance');

// Display list of all BookInstances.
exports.bookinstance_list = async function (req, res, next) {
  try {
    const bookInstances = await BookInstance.fetchAll({ withRelated: ['book', 'book.author'] });
    res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: bookInstances.toJSON() });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async function (req, res, next) {
  try {
    const bookinstance = await new BookInstance({ id: req.params.id }).fetch({ withRelated: 'book' });
    if (!bookinstance) {
      const error = new Error('Book copy not found');
      err.status = 404;
      throw err;
    }
    const instanceJson = bookinstance.toJSON();
    return res.render(
      'bookinstance_detail',
      { title: `Copy: ${instanceJson.book.title}`, bookinstance: instanceJson },
    );
  } catch (err) {
    return next(err);
  }
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async function (req, res, next) {
  try {
    const books = await Book.fetchAll({ columns: ['title', 'id'] });
    return res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books.toJSON() });
  } catch (err) {
    return next(err);
  }
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const {
      book, imprint, status, due_back,
    } = req.body;
    const bookinstance = new BookInstance({
      book_id: book,
      imprint,
      status,
      due_back,
    });
    if (!errors.isEmpty()) {
      try {
        const books = Book.fetchAll({ columns: ['title', 'id'] });
        return res.render('bookinstance_form', {
          title: 'Create BookInstance',
          book_list: books.toJSON(),
          selected_book: book,
          errors: errors.array(),
          bookinstance,
        });
      } catch (err) {
        return next(err);
      }
    } else {
      try {
        const createdBook = await bookinstance.save();
        return res.redirect(createdBook.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};
