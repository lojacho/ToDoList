// import _, { isLength } from 'lodash';
import './style.css';
import Book from '../module/bookClass.js';
import {remove, bookListDeleted} from '../module/remove.js';

let description;
let completed;
let index;
let bookList = JSON.parse(localStorage.getItem('bookList')) || [];
let bookgenerator = '';
const taskList = document.getElementById('taskList');
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

taskList.addEventListener('click', (event) => {
  remove(event);
  bookList = bookListDeleted;
  localStorage.setItem('bookList', JSON.stringify(bookList));
  display(bookList);
});

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

export { bookList, Book };