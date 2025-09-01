const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const tree = document.getElementById("tree");
const progressText = document.getElementById("progressText");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedCount = tasks.filter(t => t.completed).length;

// Render saved tasks on load
renderTasks();
updateTree();

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    const newTask = { text, completed: false };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    // Before
if (task.completed) span.classList.add("completed");
// After
if (task.completed) li.classList.add("completed");
    li.appendChild(span);

    // Button container
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Done";
    toggleBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      updateTree();
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      updateTree();
    };

    btnGroup.appendChild(toggleBtn);
    btnGroup.appendChild(delBtn);
    li.appendChild(btnGroup);

    taskList.appendChild(li);
  });
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  completedCount = tasks.filter(t => t.completed).length;
}

function updateTree() {
  completedCount = tasks.filter(t => t.completed).length;
  progressText.textContent = `${completedCount} tasks completed`;

  let stage = 0;
  if (completedCount >= 3) stage = 1;
  if (completedCount >= 6) stage = 2;
  if (completedCount >= 9) stage = 3;

  tree.src = `assets/tree${stage}.PNG`;
}

