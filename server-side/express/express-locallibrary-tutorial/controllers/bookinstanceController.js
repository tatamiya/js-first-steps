var async = require('async');
const { body, validationResult } = require('express-validator');
var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');

exports.bookinstance_list = function (req, res, next) {

    BookInstance.find()
        .populate('book')
        .exec(function (err, list_bookinstances) {
            if (err) { return next(err); }
            res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
        });
};

exports.bookinstance_detail = function (req, res, next) {

    BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookinstance) {
            if (err) { return next(err); }
            if (bookinstance == null) {
                var err = new Error("Book copy not found");
                err.status = 404;
                return next(err);
            }

            res.render('bookinstance_detail', { title: 'Copy: ' + bookinstance.book.title, bookinstance: bookinstance });
        })
};

exports.bookinstance_create_get = function (req, res, next) {

    Book.find({}, 'title')
        .exec(function (err, books) {
            if (err) { return next(err); }
            res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
        });
};

exports.bookinstance_create_post = [
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back_formatted', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        var bookinstance = new BookInstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                due_back_formatted: req.body.due_back_formatted,
            }
        );

        if (!errors.isEmpty()) {
            Book.find({}, 'title')
                .exec(function (err, books) {
                    if (err) { return next(err); }
                    res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
                });
            return;
        }
        else {
            bookinstance.save(function (err) {
                if (err) { return next(err); }
                res.redirect(bookinstance.url);
            });
        }
    }



];

exports.bookinstance_delete_get = function (req, res, next) {

    BookInstance.findById(req.params.id)
        .exec(function (err, bookinstance) {
            if (err) { return next(err); }
            if (bookinstance == null) {
                redirect('/catalog/bookinstances')
            }
            res.render('bookinstance_delete', { title: 'Delete BookInstance', bookinstance: bookinstance });
        });
};

exports.bookinstance_delete_post = function (req, res, next) {

    BookInstance.findById(req.body.bookinstanceid)
        .exec(function (err, bookinstance) {
            if (err) { return next(err); }
            BookInstance.findByIdAndRemove(bookinstance._id, function deleteBookInstance(err) {
                if (err) { return next(err); }
                res.redirect('/catalog/bookinstances')
            })
        });
};

exports.bookinstance_update_get = function (req, res) {
    async.parallel({
        books: function (callback) {
            Book.find({}, 'title').exec(callback)
        },
        bookinstance: function (callback) {
            BookInstance.findById(req.params.id).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.bookinstance == null) {
            var err = new Error('Book Instance not found');
            err.status = 404;
            return next(err);
        }
        res.render('bookinstance_form', { title: 'Update BookInstance', book_list: results.books, bookinstance: results.bookinstance });
    }
    );
};

exports.bookinstance_update_post = [
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back_formatted', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        var bookinstance = new BookInstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                due_back_formatted: req.body.due_back_formatted,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            res.render('bookinstance_form', { title: 'Update BookInstance', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
            return;
        }
        else {
            BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, function (err, thebookinstance) {
                if (err) { return next(err); }
                res.redirect(thebookinstance.url);
            });
        }
    }
];