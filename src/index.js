import './style.css';
import Book from '../module/bookClass.js';
import remove from '../module/remove.js';
import clearAllTask from '../module/checkbox.js';

let description;
let completed;
let index;
let bookList = JSON.parse(localStorage.getItem('bookList')) || [];
let bookgenerator = '';
const taskList = document.getElementById('taskList');
const input = document.getElementById('myInput');
const btnAdd = document.getElementById('btnAdd');
const clearAll = document.querySelector('.footer');

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
    bookgenerator += `<li>
    <input  class="checkbox" type="checkbox" id="${bookList[i].index}checkbox" name="taskCheck">
    <input type="text" id="${bookList[i].index}task" class="taskInput" placeholder="${bookList[i].description}">
    <button type="button" id="${bookList[i].index}">Remove</button></li>`;
  }
  taskList.innerHTML = bookgenerator;
}

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

// Checking if a task need to be added

btnAdd.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  getTask();
  addBook(description, completed, index);
  display(bookList);
});

// checking if a task has to be removed

taskList.addEventListener('click', (event) => {
  const ID = burbujeo(event);
  if (ID) {
    bookList = remove(ID, bookList);
    localStorage.setItem('bookList', JSON.stringify(bookList));
    display(bookList);
  }
});

taskList.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const edit = event.target.closest('INPUT');
    const editClass = Number(event.target.id.replace(/\D/g, ""));
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
      checkID = Number(event.target.id.replace(/\D/g, ""));
      bookList[checkID - 1].completed = true;
      localStorage.setItem('bookList', JSON.stringify(bookList));
    } else if (checkTask.checked === false) {
      checkID = Number(event.target.id) / 100;
      bookList[checkID - 1].completed = false;
      localStorage.setItem('bookList', JSON.stringify(bookList));
    }
  }
});

clearAll.addEventListener('click', () => {
  bookList = clearAllTask(bookList);
  localStorage.setItem('bookList', JSON.stringify(bookList));
  display(bookList);
});

display(bookList);