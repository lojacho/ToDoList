import _ from 'lodash';
import './style.css';

// function component() {
//     const element = document.createElement('div');

//     // Lodash, now imported by this script
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     return element;
//   }

//   document.body.appendChild(component());

const toDoTasks = [
  {
    description: 'index10',
    completed: true,
    index: 10,
  },
  {
    description: 'index3',
    completed: false,
    index: 3,
  },
  {
    description: 'index2',
    completed: true,
    index: 2,
  },
  {
    description: 'index1',
    completed: true,
    index: 1,
  },
  {
    description: 'index15',
    completed: false,
    index: 15,
  },
  {
    description: 'index25',
    completed: true,
    index: 25,
  },
];

const orderToDoTasks = toDoTasks.sort((a, b) => a.index > b.index ? 1 : -1);

let bookgenerator = '';
const listaUl = document.getElementById("list-ul");

for (const key in orderToDoTasks) {
  const element = orderToDoTasks[key];
  bookgenerator += `<li >"${element.description}"</li>`;
}

listaUl.innerHTML = bookgenerator;
