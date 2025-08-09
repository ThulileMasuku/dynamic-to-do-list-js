document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  if (!addButton || !taskInput || !taskList) {
    console.error('One or more required elements are missing in HTML.');
    return;
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  function addTaskFromText(taskText, save = true) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // your test requires this class

    removeBtn.onclick = () => {
      li.remove();
      // Remove task from local storage
      let tasks = getTasksFromLocalStorage();
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage(tasks);
      }
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      // Save the new task to local storage
      let tasks = getTasksFromLocalStorage();
      tasks.push(taskText);
      saveTasksToLocalStorage(tasks);
    }
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

  // Extracted loadTasks function
  function loadTasks() {
    const storedTasks = getTasksFromLocalStorage();
    if (storedTasks.length === 0) {
      // If no tasks stored yet, add default tasks and save them
      const initialTasks = ['English', 'French', 'Python'];
      initialTasks.forEach(task => addTaskFromText(task, false));
      saveTasksToLocalStorage(initialTasks);
    } else {
      storedTasks.forEach(task => addTaskFromText(task, false));
    }
  }

  addButton.addEventListener('click', () => addTask(false));

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(false);
    }
  });

  // Call loadTasks to initialize the task list
  loadTasks();
});