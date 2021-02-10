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
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
      }

   static showAlert(message, className) {
     const div = document.createElement('div');
     div.className = `alert alert-${className}`;
     div.appendChild(document.createTextNode(message));
     const container = document.querySelector('.container');
     const form = document.querySelector('#book-form');
     container.insertBefore(div, form);
       // Vanish in 3 seconds
     setTimeout(() => document.querySelector('.alert').remove(), 3000);
   }
}


//Store class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title, pages) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.pages === pages && book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }
}

// Events

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();


    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#flexCheckChecked');

    function checkValue(read) {
        if (read.checked) {
            return "Read";
        } else {
          return "Not Read";
        }
      };

    const check = checkValue(read);

    // Validation
    if (title === '' || author === '' || pages === '') {
        UI.showAlert('Please fill in all the fields', 'danger');
    } else {
        const book = new Book(title, author, pages, check);

        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert('Book Added', 'success');
        UI.clearFields();
    }
});

// Remove a book 
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    let titlePar = e.target.parentElement.parentElement.firstElementChild.textContent;
    let pagesPar = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    Store.removeBook(titlePar, pagesPar);
    UI.showAlert('Book removed', 'success');
});