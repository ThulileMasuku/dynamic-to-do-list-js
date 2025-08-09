// script.js

document.addEventListener('DOMContentLoaded', () => {

  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  if (!addButton || !taskInput || !taskList) {
    console.error('One or more required elements are missing in HTML.');
    return;
  }

  function addTaskFromText(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = () => {
      li.remove();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  function addTask(skipAlert = false) {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      if (!skipAlert) alert('Please enter a task.');
      return;
    }

    addTaskFromText(taskText);
    taskInput.value = '';
    taskInput.focus();
  }

  addButton.addEventListener('click', () => addTask(false));

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(false);
    }
  });

  // --- Preload the initial tasks ---
  const initialTasks = ['English', 'French', 'Python'];
  initialTasks.forEach(task => addTaskFromText(task));
});