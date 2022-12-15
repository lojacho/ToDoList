import Book from './bookClass.js';

let notCompleted = [];
let filtered = [];
export default function clearAllTask(bookList) {
  notCompleted = [];
  filtered = bookList.filter((book) => book.completed !== true);
  for (let i = 0; i < filtered.length; i += 1) {
    const newBook = new Book(filtered[i].description, filtered[i].completed, i + 1);
    notCompleted.push(newBook);
  }
  return notCompleted;
}