const toDoList = document.getElementById("todo");
const toDoListItems = toDoList.getElementsByClassName("item");


document.getElementById("newItem").addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    createNewTask();
  }
}); 

function createNewTask(inputValue = document.getElementById("newItem").value) {
  console.log("Called createNewTask");
  if(inputValue === '') {
    alert('The todo task must be named!');
    return;
  }

  const taskTemplate = `
    <div class="item" id="${uuidv4()}">
      <div>
        <input type="checkbox">
        <span>${inputValue}</span>
        <input class="edit" type="text" value="${inputValue}">
      </div>
      <div class="itemItems">
        <i class="fas fa-pen fa-2x"></i>
        <i class="fas fa-trash-alt fa-2x"></i>
      </div>
    </div>
    `
    toDoList.insertAdjacentHTML("beforeend", taskTemplate);
    document.getElementById("newItem").value = '';
}

// function createNewTask(inputValue = document.getElementById("newItem").value) {
//   if(inputValue === '') {
//     alert('The todo task must be named!');
//     return;
//   }

//   const toDoTaskElement = document.createElement("div");

//   const checkboxAndTitleSide = createCheckboxAndTitle(inputValue);
//   toDoTaskElement.appendChild(checkboxAndTitleSide);
//   const iconSide = createRightSideIcons();
//   toDoTaskElement.appendChild(iconSide);

//   toDoTaskElement.setAttribute("class", "item");
//   toDoTaskElement.setAttribute("id", uuidv4());
//   toDoList.appendChild(toDoTaskElement);
//   console.log(toDoTaskElement);
// }

// function createCheckboxAndTitle(inputValue) {
//   const checkboxAndTitleSide = document.createElement("div");

//   document.getElementById("newItem").value = '';

//   const checkboxElement = document.createElement("INPUT");
//   checkboxElement.setAttribute("type", "checkbox");
//   checkboxAndTitleSide.appendChild(checkboxElement);

//   const spans = document.createElement("span");
//   spans.textContent = inputValue;
//   checkboxAndTitleSide.appendChild(spans);

//   const editTitleElement = document.createElement("INPUT");
//   editTitleElement.setAttribute("type", "text");
//   editTitleElement.setAttribute("value", inputValue);
//   editTitleElement.setAttribute("class", "edit");
//   checkboxAndTitleSide.appendChild(editTitleElement);

//   return checkboxAndTitleSide;
// }

// function createRightSideIcons() {
//   const iconSide = document.createElement("div");

//   iconSide.setAttribute("class", "itemItems");
//   const editElement = document.createElement("i");
//   editElement.setAttribute("class", "fas fa-pen fa-2x");
//   iconSide.appendChild(editElement);
//   const deleteElement = document.createElement("i");
//   deleteElement.setAttribute("class", "fas fa-trash-alt fa-2x");
//   iconSide.appendChild(deleteElement);

//   return iconSide;
// }

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}