const toDoList = document.getElementById("todo");
const inProgressList = document.getElementById("inProgress");
const doneList = document.getElementById("done");

deleteTaskFromLocalStorage('adc5fa86e-6b2c-4356-8617-e3f232be91bc');
deleteTaskFromLocalStorage('aecb74718-1e61-4f8e-a7d1-c48126da3d75');
class Task {
    constructor(title, status, position, id = uuidv4()) {
        this._title = title;
        this._status = status;
        this._position = position;
        this._id = id;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
    }
    get id() {
        return this._id;
    }
}

// Arrows
const arrow1 = document.getElementById('arrow-right-1');
arrow1.addEventListener('click', function () {
    moveTask('right');
});

const arrow2 = document.getElementById('arrow-left-2');
arrow2.addEventListener('click', function () {
    moveTask('left');
});

const arrow3 = document.getElementById('arrow-right-3');
arrow3.addEventListener('click', function () {
    moveTask('right');
});

const arrow4 = document.getElementById('arrow-left-4');
arrow4.addEventListener('click', function () {
    moveTask('left');
});

function moveTask(direction) {
    const checkedCheckBoxes = getCheckedCheckbox();
    checkedCheckBoxes.forEach(checkbox => {
        const taskNode = checkbox.parentElement.parentElement;
        let newStatus;
        let newTaskList;
        if(direction === 'right'){
            if(taskNode.getAttribute('status') === 'todo'){
              newStatus = "inProgress";
              newTaskList = inProgressList;
            } else if(taskNode.getAttribute('status') === 'inProgress'){
              newStatus = "done";
              newTaskList = doneList;
            }
        }else {
            if(taskNode.getAttribute('status') === 'inProgress'){
              newStatus = "todo";
              newTaskList = toDoList;
            } else if(taskNode.getAttribute('status') === 'done'){
              newStatus = "inProgress";
              newTaskList = inProgressList;
            }
        }
        if(newStatus != undefined) {
          taskNode.setAttribute('status', newStatus);
          const position = getNewPositionIndex(newStatus);
          taskNode.setAttribute('position', position);
          newTaskList.insertAdjacentHTML("beforeend", taskNode.outerHTML);
          taskNode.parentNode.removeChild(taskNode);

          const title = taskNode.getElementsByClassName('edit')[0].value;
          const updatedTask = new Task(title, newStatus, position, taskNode.id);
          updateTaskInLocalStorage(updatedTask);
        }
    });
}

function getNewPositionIndex(status){
    const highestStatusTask = document.querySelector(`#${status} > .item:last-child`);
    let newPosition;
    if(highestStatusTask == null) {
      newPosition = 0;
    } else {
      newPosition = parseInt(highestStatusTask.getAttribute('position')) + 1;
      if(isNaN(newPosition)) {
        newPosition = 0;
      }
    }
    return newPosition;
}

function getCheckedCheckbox() {

    console.log('Click Arrow');
    const checkboxes = document.querySelectorAll('.item [type="checkbox"]');

    const checkedCheckboxes = [...checkboxes].filter(checkbox => checkbox.checked);
    
    return checkedCheckboxes;
}

function editTask(pen){
    const id = pen.parentElement.parentElement.id;
    const text = document.querySelector(`#${id} .text`);
    const edit = document.querySelector(`#${id} .edit`);
    if(text.style.display!== "none"){
        text.style.display = "none";
        edit.style.display = "inline-block";
    }else{
        if(edit.value === ''){
            alert('The task must not be empty!');
            return;
        }
        text.textContent = edit.value;
        text.style.display = "inline-block";
        edit.style.display = "none";

        updateTaskTitle(id, edit.value);
    }
}
function trashTask(trashbin){
    const taskNode = trashbin.parentElement.parentElement;
    taskNode.parentNode.removeChild(taskNode);

    deleteTaskFromLocalStorage(taskNode.id);
}

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
      newPosition = parseInt(highestToDoTask.getAttribute('position')) + 1;
    if(isNaN(newPosition)) {
      newPosition = 0;
    }
  }


  const uuid = uuidv4();
  const taskTemplate = getTaskTemplate("todo", inputValue, uuid, newPosition);

  toDoList.insertAdjacentHTML("beforeend", taskTemplate);
  document.getElementById("newItem").value = '';

  const newTask = new Task(inputValue, 'todo', newPosition, uuid);
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
  console.log("Called method restoreTasks. Following tasks are persisted: " , data);
  data = JSON.parse(data);
  console.log("Following stored tasks get restored:", data);

  data.sort((a, b) => a._position - b._position)
    .forEach(task => {
      restoreTask(task);
    });
}

function restoreTask(task) {
  console.log("Called method restoreTask");
  let taskElement;
  switch(task._status) {
    case 'todo':
      taskElement = getTaskTemplate("todo", task._title, task._id, task._position);
      toDoList.insertAdjacentHTML("beforeend", taskElement);
      break;
    case 'inProgress':
      taskElement = getTaskTemplate("inProgress", task._title, task._id, task._position);
      inProgressList.insertAdjacentHTML("beforeend", taskElement);
      break;
    case 'done':
      taskElement = getTaskTemplate("done", task._title, task._id, task._position);
      doneList.insertAdjacentHTML("beforeend", taskElement);
      break;
    default:
      console.error("Failed to restore folloing task: " + JSON.stringify(task));
      alert('Invalid stored status in: ' + JSON.stringify(task));
      return;
  }
}

restoreTasks();

function storeTask(task) {
    console.log("Called method 'storeTask");
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

function deleteTaskFromLocalStorage(taskIdToBeDeleted) {
  console.log('Delete task from local storage with id: ' , taskIdToBeDeleted);
  const serializedStoredTasks = window.localStorage.getItem('tasks');
  const storedTasks = JSON.parse(serializedStoredTasks);
  const taskListAfterLelete = removeItemFromArray(storedTasks, taskIdToBeDeleted);

  const items_json = JSON.stringify(taskListAfterLelete);
  console.log("Persisted tasks after delete: ", items_json);

  window.localStorage.setItem('tasks', items_json);
}

function removeItemFromArray(arr, taskIdToBeDeleted) {
  const index = arr.findIndex(task => {
    return task._id === taskIdToBeDeleted
  });
  if (index > -1) {
    arr.splice(index, 1);
  } else {
    console.log(`Error: Could not find the task with the id ${taskIdToBeDeleted}.`)
  }
  return arr;
}

function updateTaskTitle(id, title) {
  console.log(`Update task title of task with id ${id} to ${title}`);
  let serializedStoredTasks = window.localStorage.getItem('tasks');
  const storedTasks = JSON.parse(serializedStoredTasks);
  let task = storedTasks.find(currentTask => currentTask._id === id);
  task._title = title;
  const items_json = JSON.stringify(storedTasks);
  console.log("New persisted array: ", items_json);

  window.localStorage.setItem('tasks', items_json);
}

function updateTaskInLocalStorage(task) {
    let serializedStoredTasks = window.localStorage.getItem('tasks');
    const storedTasks = JSON.parse(serializedStoredTasks);
    let index = storedTasks.findIndex(currentTask => currentTask._id === task.id);
    storedTasks[index] = task;
    const items_json = JSON.stringify(storedTasks);
    console.log("New persisted array: ", items_json);
  
    window.localStorage.setItem('tasks', items_json);
  }