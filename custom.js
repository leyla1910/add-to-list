document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const clearAllButton = document.getElementById("clearAllButton");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((taskText) => {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
      });
    }
  
    function createTaskElement(taskText) {
      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Sil";
      deleteButton.addEventListener("click", function () {
        taskItem.remove();
        tasks = tasks.filter((task) => task !== taskText);
        updateLocalStorage();
      });
  
      taskItem.appendChild(deleteButton);
      return taskItem;
    }
  
    function updateLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    addTaskButton.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        tasks.unshift(taskText);
        updateLocalStorage();
        renderTasks();
        taskInput.value = "";
      }
    });
  
    taskInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const taskText = taskInput.value.trim();
  
        if (taskText !== "") {
          tasks.unshift(taskText);
          updateLocalStorage();
          renderTasks();
          taskInput.value = "";
        }
      }
    });
  
    clearAllButton.addEventListener("click", function () {
      taskList.innerHTML = "";
      tasks = [];
      updateLocalStorage();
    });
  
    renderTasks();
  });
  