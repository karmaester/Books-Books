import Store from './storage.js';

//UI class
export default class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static switcher() {
      let switchBtn = document.querySelectorAll('.status');

      for (let i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener('click', (e) => {
          const titlePar2 = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
          const pagPar = e.target.parentElement.parentElement.previousElementSibling.textContent;
          Store.readBook(titlePar2, pagPar);
        });
      }
      console.log(switchBtn);
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr')

        function checkRead(read) {
          if (read == 'Read') {
            return 'checked';
          }
          return '';
        }

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td class="status"><div class="form-check form-switch">
        <input
          class="form-check-input read"
          type="checkbox"
          id="flexCheck"
          ${checkRead(book.read)}
        />
        <label class="form-check-label" for="flexCheck">${book.read}</label>
      </div></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
        this.switcher();
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
