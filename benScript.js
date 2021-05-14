const toDoList = document.getElementById("todo");
const inProgressList = document.getElementById("inProgress");
const doneList = document.getElementById("done");
const toDoListItems = toDoList.getElementsByClassName("item");


document.getElementById("newItem").addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    createNewTask();
  }
}); 

function getTaskTemplate(status, inputValue, uuid, position) {
  return  `
    <div class="item" id="${uuid}" status="${status}" position=${position}>
      <div>
        <input type="checkbox">
        <span class="text">${inputValue}</span>
        <input class="edit" type="text" value="${inputValue}">
      </div>
      <div class="itemItems">
        <i onClick="editTask(this)" class="fas fa-pen fa-2x"></i>
        <i onClick="trashTask(this)" class="fas fa-trash-alt fa-2x"></i>
      </div>
    </div>
    `;
}

function createNewTask(inputValue = document.getElementById("newItem").value) {
  console.log("Called createNewTask");
  if(inputValue === '') {
    alert('The todo task must be named!');
    return;
  }

  const highestToDoTask = document.querySelector('#todo > .item:last-child');
  let newPosition;
  if(highestToDoTask == null) {
    newPosition = 0;
  } else {
    let newPosition = parseInt(highestToDoTask.getAttribute('position')) + 1;
    if(isNaN(newPosition)) {
      newPosition = 0;
    }
  }


  const uuid = uuidv4();
  const taskTemplate = getTaskTemplate("toDo", inputValue, uuid, newPosition);

  toDoList.insertAdjacentHTML("beforeend", taskTemplate);
  document.getElementById("newItem").value = '';

  const newTask = {id: uuid, task: inputValue, position: newPosition, status: 'toDo'};
  storeTask(newTask)
}

function uuidv4() {
  return 'axxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const restoreTasks = () => {
  let data = window.localStorage.getItem('tasks');
  data = JSON.parse(data);
  console.log("Following stored tasks get restored:", data);

  data.sort((a, b) => a.position - b.position)
    .forEach(task => {
      restoreTask(task);
    });
}

function restoreTask(task) {
  let taskElement;
  switch(task.status) {
    case 'toDo':
      taskElement = getTaskTemplate("toDo", task.task, task.id, task.position);
      toDoList.insertAdjacentHTML("beforeend", taskElement);
      break;
    case 'inProgress':
      taskElement = getTaskTemplate("inProgress", task.task, task.id, task.position);
      inProgressList.insertAdjacentHTML("beforeend", taskElement);
      break;
    case 'done':
      taskElement = getTaskTemplate("done", task.task, task.id, task.position);
      doneList.insertAdjacentHTML("beforeend", taskElement);
      break;
    default:
      console.error("Failed to restore folloing task: " + task);
      alert('Invalid stored status in: ' + task);
      return;
  }
}

restoreTasks();

function storeTask(task) {
    let data = window.localStorage.getItem('tasks');
    data = JSON.parse(data);

    const filteredTasks = data.filter(currentTask => currentTask.id === task.id);
    if(filteredTasks.length > 0) {  // update
      console.log("Update task with id: " + task.id);
      filteredTasks[0] = task;
    } else {  // insert
      console.log("Insert task with id: " + task.id);
      data.push(task);
    }
    const items_json = JSON.stringify(data);
    console.log("New persisted array: ", items_json);

    window.localStorage.setItem('tasks', items_json);
}

function deleteTask(task) {
  const storedTasks = window.localStorage.getItem('tasks');
  const serializedStoredTasks = JSON.parse(storedTasks);
  const taskListAfterLelete = removeItemFromArray(serializedStoredTasks, task);

  const items_json = JSON.stringify(taskListAfterLelete);
  console.log("New persisted array: ", items_json);

  window.localStorage.setItem('tasks', items_json);
}

function removeItemFromArray(arr, task) {
  const index = arr.findIndex(item => {
    return item.id === task.id
  });
  if (index > -1) {
    console.log("Delete element with index", index);
    arr.splice(index, 1);
  }
  return arr;
}