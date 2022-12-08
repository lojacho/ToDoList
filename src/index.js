import _ from 'lodash';
import './style.css';

const toDoTasks = [
  {
    description: 'index10',
    completed: true,
    index: 10,
  },
];

const orderToDoTasks = toDoTasks.sort((a, b) => (a.index > b.index ? 1 : -1));

let bookgenerator = '';
const listaUl = document.getElementById('list-ul');

for (let i = 0; i < orderToDoTasks.length; i += 1) {
  bookgenerator += `<li >"${orderToDoTasks[i].description}"</li>`;
}

listaUl.innerHTML = bookgenerator;
