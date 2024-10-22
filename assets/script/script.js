const addTaskDiv = document.querySelector('.add-task-wrap');
const taskInput = document.querySelector('.task-input');
const addTaskButton = document.querySelector('.add-task-button');
const taskListUl = document.getElementById('task-list');
const clearListButton = document.querySelector('.clear-list-button');

//обработчик события для добавления задачи
addTaskDiv.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = todoInput.value;

  //проверка, пустое ли поле ввода
  if (newTask === '') {
      alert('Список задач пуст, введите задачу!');
      return;
  }
  //чистим поле ввода
  taskInput.value = '';
  addTask(newTask);
});

//функция для добавления задач
const addTask = (task) => {
  const listItem = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;
  listItem.appendChild(taskText);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  listItem.appendChild(checkBox);

  taskListUl.appendChild(listItem);

//обозначение флажком, обработчик
  checkBox.addEventListener('change', function() {
    if (this.checked) {
        taskText.style.textDecoration = 'line-through';
        listItem.classList.add('completed');
    } else {
        taskText.style.textDecoration = 'none';
        listItem.classList.add('completed');
    }
    updateNoTasksMessage();
    saveTasksToLocalStorage();
  });

  //кнопка очистки
  clearListButton.disabled = false;
  updateNoTasksMessage();
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#tasks-list li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateNoTasksMessage() {
  if (taskListUl.children.length === 0) {
      noTasksMessage.style.display = 'block';
      clearListButton.disabled = true;
  } else {
      noTasksMessage.style.display = 'none';
  }
}

clearListButton.addEventListener('click', function() {
  taskListUl.innerHTML = ''; // Удаляем все задачи
  updateNoTasksMessage(); // Обновляем сообщение о задачах
  localStorage.removeItem('tasks'); // Очищаем Local Storage
});

document.addEventListener('DOMContentLoaded', function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
      addTask(task.text);
      if (task.completed) {
        const lastTaskItem = taskListUl.lastChild;
        lastTaskItem.querySelector('span').style.textDecoration = 'line-through';
        lastTaskItem.classList.add('completed');
        lastTaskItem.querySelector('input').checked = true; // Устанавливаем состояние чекбокса
    }
  });
  updateNoTasksMessage(); 
});