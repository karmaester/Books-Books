import Book from './dist/book.js';
import Store from './dist/storage.js';
import UI from './dist/ui.js';

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
      return 'Read';
    }
    return 'Not Read';
  }

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
  const titlePar = e.target.parentElement.parentElement.firstElementChild.textContent;
  const pagesPar = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
  Store.removeBook(titlePar, pagesPar);
  UI.showAlert('Book removed', 'success');
});
