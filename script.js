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
    const books = [];

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
            <p>Read: ${book.read}</p>
            <button class="remove-btn">Remove</button>
        `;
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
        const modal = document.querySelector('#book-form');
        const overlay = document.querySelector('.overlay');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    function hideModal() {
        const modal = document.querySelector('#book-form');
        const overlay = document.querySelector('.overlay');
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    return { createBookCard, renderBooks, showModal, hideModal };
})();

// render all existing books
// attach event handler to new book button
// attach event handler to remove book button
// attach event handler to modal submit button
// attach event handler to click away or exit modal

const eventHandlers = (function () {})();
