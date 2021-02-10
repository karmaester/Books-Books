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
        UI.showAlert('Book Added', 'success');
        UI.clearFields();
    }
});

// Remove a book 
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book removed', 'success');
});