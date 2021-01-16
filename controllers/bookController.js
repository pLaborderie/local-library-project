const { body, validationResult } = require('express-validator');

const async = require('async');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

exports.index = function (req, res) {
  async.parallel({
    book_count(callback) {
      Book.count().then((result) => callback(null, result));
    },
    book_instance_count(callback) {
      BookInstance.count().then((result) => callback(null, result));
    },
    book_instance_available_count(callback) {
      BookInstance.count({ status: 'Available' }).then((result) => callback(null, result));
    },
    author_count(callback) {
      Author.count().then((result) => callback(null, result));
    },
    genre_count(callback) {
      Genre.count().then((result) => callback(null, result));
    },
  }, (err, results) => {
    res.render('index', {
      title: 'Local Library Home', error: err, data: results, layout: 'layout.ejs',
    });
  });
};

// Display list of all books.
exports.book_list = function (req, res, next) {
  new Book().fetchAll({ columns: ['title', 'author_id', 'id'], withRelated: 'author' })
    .then((books) => {
      res.render('book_list', { title: 'Book List', book_list: books.toJSON() });
    })
    .catch((err) => next(err));
};

// Display detail page for a specific book.
exports.book_detail = async function (req, res, next) {
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
exports.book_create_get = async function (req, res, next) {
  try {
    const authors = await Author.fetchAll();
    const genres = await Genre.fetchAll();
    return res.render('book_form', {
      title: 'Create Book',
      authors: authors.serialize(),
      genres: genres.serialize(),
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

// Handle book create on POST.
exports.book_create_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') {
        req.body.genre = [];
      } else {
        req.body.genre = new Array(req.body.genre);
      }
    }
    next();
  },
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty').trim().isLength({ min: 1 }).escape(),
  body('summary', 'Summary must not be empty').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const {
      title, author, summary, isbn, genre,
    } = req.body;
    const book = new Book({
      title, author_id: author, summary, isbn,
    });
    if (!errors.isEmpty()) {
      try {
        const [authors, genres] = await Promise.all(
          new Author().fetchAll(),
          new Genre().fetchAll(),
        );
        const updatedGenres = genres.serialize().map(({ id }) => {
          if (genre.indexOf(id) > -1) {
            return { ...genre, checked: 'true' };
          }
          return genre;
        });
        return res.render('book_form', {
          title: 'Create Book',
          authors: authors.serialize,
          genres: updatedGenres,
          book,
          errors: errors.array(),
        });
      } catch (err) {
        return next(err);
      }
    } else {
      try {
        const createdBook = await book.save();
        await book.genres().attach(genre);
        res.redirect(createdBook.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update POST');
};
