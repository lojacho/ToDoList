/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */
// import _, { isLength } from 'lodash';

import './style.css';
import Book from '../module/bookClass.js';
import { remove, bookListDeleted } from '../module/remove.js';
import { clearAllTask, notCompleted } from '../module/checkbox.js';

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
    <input type="checkbox" id="${bookList[i].index * 100}" name="taskCheck">
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

function burbujeo(event) {
  const removeBtn = event.target.closest('BUTTON');
  let buttonID;
  if (removeBtn) {
    buttonID = Number(event.target.id);
    return buttonID;
  }
  buttonID = false;
  return buttonID;
}

taskList.addEventListener('click', (event) => {
  // event.stopPropagation();
  const ID = burbujeo(event);
  if (ID) {
    remove(ID);
    bookList = bookListDeleted;
    localStorage.setItem('bookList', JSON.stringify(bookList));
    display(bookList);
  }
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

taskList.addEventListener('click', (event) => {
  const checkTask = event.target.closest('INPUT');
  if (event.target.name) {
    let checkID;
    if (checkTask.checked === true) {
      checkID = Number(event.target.id) / 100;
      bookList[checkID - 1].completed = true;
      localStorage.setItem('bookList', JSON.stringify(bookList));
    } else if (checkTask.checked === false) {
      checkID = Number(event.target.id) / 100;
      bookList[checkID - 1].completed = false;
      localStorage.setItem('bookList', JSON.stringify(bookList));
    }
  }
});

const clearAll = document.querySelector('.footer');

clearAll.addEventListener('click', () => {
  clearAllTask();
  bookList = notCompleted;
  localStorage.setItem('bookList', JSON.stringify(bookList));
  display(bookList);
});

display(bookList);

export { bookList, Book };