import { bookList, Book } from '../src/index.js';

let bookListDeleted = [];
let bookListFiltered = [];

function remove(event) {
    const remove = event.target.closest('BUTTON');
    if (remove) {
        const buttonID = Number(event.target.id);
        console.log(bookList)
        bookListFiltered = bookList.filter((book) => book.index !== buttonID);
        bookListDeleted = [];
        for (let i = 0; i < bookListFiltered.length; i += 1) {
            const newBook = new Book(bookListFiltered[i].description, bookListFiltered[i].completed, i + 1);
            bookListDeleted.push(newBook);
        }
        return bookListDeleted;   
    }
}

export { remove, bookListDeleted}