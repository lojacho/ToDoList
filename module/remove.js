import Book from './bookClass.js';

let bookListDeleted = [];
let bookListFiltered = [];

export default function remove(ID, bookList) {
  bookListFiltered = bookList.filter((book) => book.index !== ID);
  bookListDeleted = [];
  for (let i = 0; i < bookListFiltered.length; i += 1) {
    const newBook = new Book(bookListFiltered[i].description, bookListFiltered[i].completed, i + 1);
    bookListDeleted.push(newBook);
  }
  return bookListDeleted;
}