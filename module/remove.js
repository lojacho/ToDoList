/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */

import { bookList, Book } from '../src/index.js';

let bookListDeleted = [];
let bookListFiltered = [];

function remove(ID) {
  bookListFiltered = bookList.filter((book) => book.index !== ID);
  bookListDeleted = [];
  for (let i = 0; i < bookListFiltered.length; i += 1) {
    const newBook = new Book(bookListFiltered[i].description, bookListFiltered[i].completed, i + 1);
    bookListDeleted.push(newBook);
  }
}

export { remove, bookListDeleted };