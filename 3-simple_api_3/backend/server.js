const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Our Data container / where we will keep our data (local Database)
let books = [];

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Create a single book
app.post('/book', (req, res) => {
    const book = req.body;
    // Output the book to the console for debugging and push it the books array
    console.log(book);
    books.push(book);

    res.send('Book is successfully added to the database');
});

// Get All books from the database or our array
app.get('/books', (req, res) => {
    res.json(books);
});


// Get A single Book from the database or our array
app.get('/book/:isbn', (req, res) => {
    // Reading or Retrieving the isbn from the URL
    const isbn = req.params.isbn;

    // Searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});


// Delete a single book from the database
app.delete('/book/:isbn', (req, res) => {
    // Reading or Retrieving the isbn from the URL
    const isbn = req.params.isbn;

    // Removing a single book from the database
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });

    res.send("Book has been deleted");
});


// Editing an existing book
app.post('/book/:isbn', (req, res) => {
    // Reading or Retrieving data from our database
    const isbn = req.params.isbn;
    const newBook = req.body;

    // Remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send("Book has been edited");
});





app.listen(port, () => console.log(`Server is listening on port ${port}`));

