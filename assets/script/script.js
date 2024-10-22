const addTaskDiv = document.querySelector('.add-task-wrap');
const taskInput = document.querySelector('.task-input');
const taskListUl = document.getElementById('task-list');
const clearListButton = document.querySelector('.clear-list-button');

//обработчик события для добавления задачи
addTaskDiv.addEventListener('click', function(event) {
  event.preventDefault();
  const newTask = taskInput.value.trim();

// //проверка, пустое ли поле ввода
//   if (newTask === '') {
//       alert('Список задач пуст, введите задачу!');
//       return;
//   }

  addTask(newTask); 
  //чистим поле ввода
  taskInput.value = '';
});

//функция для добавления задач
const addTask = (task) => {
  const listItem = document.createElement('li');
  listItem.textContent = task;

  taskListUl.appendChild(listItem);

  clearListButton.disabled = false;
}

//очиска списка
function clearList() {
  taskListUl.innerHTML = '';
  //отключаем кнопку
  clearListButton.disabled = true;
}