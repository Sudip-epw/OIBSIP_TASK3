let tasks = loadTasks() || [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(task);
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const pendingTasksList = document.getElementById("pendingTasksList");
  const completedTasksList = document.getElementById("completedTasksList");

  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.innerText = `${task.text} 
    (Created: ${new Date(task.createdAt).toLocaleString()})`;
    taskElement.classList.add("task-item");

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit");
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteTask(task.id);

    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    if (!task.completed) {
      const completeButton = document.createElement("button");
      completeButton.innerText = "Complete";
      completeButton.classList.add("complete");
      completeButton.onclick = () => completeTask(task.id);
      taskActions.appendChild(completeButton);
      pendingTasksList.appendChild(taskElement);
    } else {
      taskElement.classList.add("completed");
      taskElement.innerText += ` 
      (Completed: ${new Date(task.completedAt).toLocaleString()})`;
      completedTasksList.appendChild(taskElement);
    }

    taskElement.appendChild(taskActions);
  });
}

function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  const newTaskText = prompt("Edit task:", task.text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    task.text = newTaskText.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks();
  renderTasks();
}

function completeTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  task.completed = true;
  task.completedAt = new Date();
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasksJSON = localStorage.getItem("tasks");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

renderTasks();
