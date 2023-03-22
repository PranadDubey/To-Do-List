let tasks = {};
let currentId = 1;

const setAddTaskForm = () => {
  document.getElementById("task").value = "";
  document.getElementById("description").value = "";
  document.getElementById("add").innerHTML = "Add to list";
  document.getElementById("add").onclick = () => addNewTask();
  document.getElementById("new_task_form_header").innerHTML = "Add New Task";
};

const addNewTask = () => {
  const title = document.getElementById("task").value;
  const description = document.getElementById("description").value;

  const task = {
    title: title,
    description: description,
    isComplete: false,
    id: currentId,
  };
  tasks[currentId] = task;
  currentId++;
  displayTasks();
  document.getElementById("task").value = "";
  document.getElementById("description").value = "";
};

const displayTasks = () => {
  const list = Object.values(tasks);
  tablebody = document.getElementById("tableBody");
  let str = "";
  list.forEach((element, index) => {
    str += `<tr class="tasks_table_data_row">
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td class="tasks_table_data_actions">
                
                  ${
                    element.isComplete
                      ? `<button data-toggle="tooltip" data-placement="top" title="Mark As Incomplete" type="button" onclick="markAsIncomplete(${element.id})">
                          <i class="fa fa-check-circle" style="color:#1fd655" aria-hidden="true" ></i>
                         </button>`
                      : `<button data-toggle="tooltip" data-placement="top" title="Mark As Complete" type="button" onclick="markAsComplete(${element.id})">
                          <i class="fa fa-check" aria-hidden="true"></i>
                         </button>`
                  }
                
                  <button data-toggle="tooltip" data-placement="top" title="Edit Task" type="button" onclick="setUpdateForm(${
                    element.id
                  })">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button data-toggle="tooltip" data-placement="top" title="Delete Task" type="button" onclick="deleteTask(${
                    element.id
                  })">
                    <i class="fa fa-trash" aria-hidden="true"   ></i>
                  </button>
                </td>
             </tr>`;
  });
  tableBody.innerHTML = str;
};

const deleteTask = (key) => {
  delete tasks[key];
  displayTasks();
};
const clearList = () => {
  tasks = {};
  displayTasks();
};

const setUpdateForm = (key) => {
  const title = tasks[key].title;
  const description = tasks[key].description;
  document.getElementById("task").value = title;
  document.getElementById("description").value = description;
  document.getElementById("add").innerHTML = "Update";
  document.getElementById("add").onclick = () => updateTask(key);
  document.getElementById("new_task_form_header").innerHTML = "Edit Task";
};

const updateTask = (key) => {
  const title = document.getElementById("task").value;
  const description = document.getElementById("description").value;
  tasks[key] = {
    ...tasks[key],
    title,
    description,
  };
  displayTasks();
  setAddTaskForm();
};

const markAsComplete = (key) => {
  tasks[key].isComplete = true;
  displayTasks();
};
const markAsIncomplete = (key) => {
  tasks[key].isComplete = false;
  displayTasks();
};
