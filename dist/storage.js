//Store class
export default class Store {
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

    static readBook(title, pages) {
        const books = Store.getBooks();

        books.forEach((book) => {
            if(book.pages === pages && book.title === title) {
                if(book.read === 'Read') {
                    book.read = 'Not Read';
                } else {
                    book.read = 'Read';
            }
            }
            location.reload();
        });

        localStorage.setItem('books', JSON.stringify(books))

    }
}