'use strict';

class Book {
    #title;
    #author;
    #pages;
    #read;
    #cover;
    #id;

    constructor(title, author, pages, cover, read) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#cover = cover;
        this.#read = read;
        this.#id = crypto.randomUUID();
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    get cover() {
        return this.#cover;
    }

    get read() {
        return this.#read;
    }

    get id() {
        return this.#id;
    }

    set read(status) {
        this.#read = status;
    }
}

const libraryController = (function () {
    const books = [
        {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            pages: 295,
            cover: 'Hardcover',
            read: 'Read',
            id: '123e4567-e89b-12d3-a456-426614174000',
        },
        {
            title: 'Dune',
            author: 'Frank Herbert',
            pages: 412,
            cover: 'Paperback',
            read: 'Unread',
            id: '987fcdeb-51a2-43d7-9b56-254714174000',
        },
        {
            title: 'Project Hail Mary',
            author: 'Andy Weir',
            pages: 496,
            cover: 'Hardcover',
            read: 'Read',
            id: '550e8400-e29b-41d4-a716-446655440000',
        },
    ];

    function getBooks() {
        return books;
    }

    function addBook(book) {
        books.push(book);
    }

    function removeBook(book) {
        const bookSpot = books.indexOf(book);
        books.splice(bookSpot, 1);
    }

    function changeReadStatus(book) {
        const bookSpot = books.indexOf(book);
        const selectedBook = books[bookSpot];

        if (selectedBook.read === 'Read') {
            selectedBook.read = 'Unread';
        } else {
            selectedBook.read = 'Read';
        }
    }

    return { getBooks, addBook, removeBook, changeReadStatus };
})();

const displayController = (function () {
    function createBookCard(book) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        bookDiv.innerHTML = `
            <h2>Title: ${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Cover: ${book.cover}</p>
            <div class="read-status">
                <p>Book Status: ${book.read}</p>
                <button class="toggle-read-btn" data-id="${book.id}">Change</button>
            </div>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
        `;
        return bookDiv;
    }

    function renderBooks(bookArray) {
        const container = document.querySelector('.books-container');
        container.innerHTML = '';

        bookArray.forEach((book) => {
            const bookCard = createBookCard(book);
            container.appendChild(bookCard);
        });
    }

    function showModal() {
        const modal = document.querySelector('.book-form');
        const overlay = document.querySelector('.overlay');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    function hideModal() {
        const modal = document.querySelector('.book-form');
        const overlay = document.querySelector('.overlay');
        const form = document.querySelector('#book-form');
        form.reset();
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    return { createBookCard, renderBooks, showModal, hideModal };
})();

const eventHandlers = (function () {
    function handleNewBookClick() {
        displayController.showModal();
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const title = document.querySelector('#book-title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const cover = document.querySelector('#cover').value;
        const read = document.querySelector('#read').checked ? 'Read' : 'Unread';

        const newBook = new Book(title, author, pages, cover, read);
        libraryController.addBook(newBook);
        displayController.renderBooks(libraryController.getBooks());
        displayController.hideModal();
    }

    function handleOverlayClick() {
        displayController.hideModal();
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            displayController.hideModal();
        }
    }

    function handleToggleRead(e) {
        const bookId = e.target.dataset.id;
        const book = libraryController.getBooks().find((b) => b.id === bookId);
        libraryController.changeReadStatus(book);
        displayController.renderBooks(libraryController.getBooks());
    }

    function handleRemoveBook(e) {
        const bookId = e.target.dataset.id;
        const book = libraryController.getBooks().find((book) => book.id === bookId);
        libraryController.removeBook(book);
        displayController.renderBooks(libraryController.getBooks());
    }

    return {
        handleNewBookClick,
        handleFormSubmit,
        handleOverlayClick,
        handleEscapeKey,
        handleToggleRead,
        handleRemoveBook,
    };
})();

// App Module
const app = (function () {
    function initializeEventListeners() {
        // New book button
        document.querySelector('#new-book-btn').addEventListener('click', eventHandlers.handleNewBookClick);

        // Form submission
        document.querySelector('#add-book-btn').addEventListener('click', eventHandlers.handleFormSubmit);

        // Modal closing
        document.querySelector('.overlay').addEventListener('click', eventHandlers.handleOverlayClick);
        document.addEventListener('keydown', eventHandlers.handleEscapeKey);

        // Toggle read status buttons
        document.querySelector('.books-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-read-btn')) {
                eventHandlers.handleToggleRead(e);
            }
            if (e.target.classList.contains('remove-btn')) {
                eventHandlers.handleRemoveBook(e);
            }
        });
    }

    function init() {
        initializeEventListeners();
        displayController.renderBooks(libraryController.getBooks());
    }

    return { init };
})();

// Start the application
app.init();
