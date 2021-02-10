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
            return true;
        } else {
          return false;
        }
      };

    const check = checkValue(read);

    const book = new Book(title, author, pages, check);

    UI.addBookToList(book);

    UI.clearFields();

});

// Remove a book 
document.querySelector('#book-list').addEventListener('click', (e) => {
    console.log(e.target);
});