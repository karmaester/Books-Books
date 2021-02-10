// Book class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//UI class
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Harry Potter',
                author: 'J.K. Rowling',
                pages: '560',
                read: true
            },
            {
                title: 'Por quien doblan las campanas',
                author: 'Hernest Hemingway',
                pages: '370',
                read: true
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>`;
        list.appendChild(row);
    }
}


//Store class

// Get form values
//   const title = document.querySelector('#title').value;
//   const author = document.querySelector('#author').value;
//   const pages = document.querySelector('#pages').value;
//   const read = document.querySelector('#read').value;

// Events

document.addEventListener('DOMContentLoaded', UI.displayBooks);