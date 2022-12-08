// import _, { isLength } from 'lodash';
import './style.css';
import Book from '../module/boo.js'

let description;
let completed;
let index;
let bookList = JSON.parse(localStorage.getItem('bookList')) || [];
let bookgenerator = '';
const taskList = document.getElementById('taskList');
let bookListDeleted = [];
const input = document.getElementById('myInput');


function getTask() {
  description = input.value;
  completed = false;
  index = bookList.length + 1;
}

function addBook(description, completed, index) {
  const newBook = new Book(description, completed, index);
  bookList.push(newBook);
  localStorage.setItem('bookList', JSON.stringify(bookList));
}

function display(bookList) {
  bookgenerator = '';
  for (let i = 0; i < bookList.length; i += 1) {
    bookgenerator += `<div>
    <input type="text" id="${bookList[i].index * 10}" placeholder="${bookList[i].description}">
    <button type="button" id="${bookList[i].index}">Remove</button></div>`;
  }
  taskList.innerHTML = bookgenerator;
}

function remove(event) {
  const remove = event.target.closest('BUTTON');
  if (remove) {
    const buttonID = Number(event.target.id);
    bookList = bookList.filter((book) => book.index !== buttonID);
    bookListDeleted = [];
    for (let i = 0; i < bookList.length; i += 1) {
      const newBook = new Book(bookList[i].description, bookList[i].completed, i + 1);
      bookListDeleted.push(newBook);
    }
    bookList = bookListDeleted;
    localStorage.setItem('bookList', JSON.stringify(bookList));
    display(bookList);
  }
}

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getTask();
    addBook(description, completed, index);
    display(bookList);
  }
});

const btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
  getTask();
  addBook(description, completed, index);
  display(bookList);
});

taskList.addEventListener('click', remove);

taskList.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const edit = event.target.closest('INPUT');
    const editClass = Number(event.target.id) / 10;
    const editTask = edit.value;
    edit.value = editTask;
    bookList[editClass - 1].description = editTask;
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }
});

display(bookList);
