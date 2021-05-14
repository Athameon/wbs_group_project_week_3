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
    const toDoList = document.getElementById("todo");
    const inProgressList = document.getElementById("inProgress");
    const doneList = document.getElementById("done");
    const checkedCheckBoxes = getCheckedCheckbox();
    checkedCheckBoxes.forEach(checkbox => {
        const task = checkbox.parentElement.parentElement;
        if(direction === 'right'){
            if(task.getAttribute('status') === 'toDo'){
                task.setAttribute('status', 'inProgress');
                const highestPosition = getNewPosition('inProgress');
                task.setAttribute('position', highestPosition);
                inProgressList.insertAdjacentHTML("beforeend", task.outerHTML);
                task.parentNode.removeChild(task);
            } else if(task.getAttribute('status') === 'inProgress'){
                task.setAttribute('status', 'done');
                const highestPosition = getNewPosition('done');
                task.setAttribute('position', highestPosition);
                doneList.insertAdjacentHTML("beforeend", task.outerHTML);
                task.parentNode.removeChild(task);
            }
        }else{
            if(task.getAttribute('status') === 'inProgress'){
                task.setAttribute('status', 'toDo');
                const highestPosition = getNewPosition('toDo');
                task.setAttribute('position', highestPosition);
                toDoList.insertAdjacentHTML("beforeend", task.outerHTML);
                task.parentNode.removeChild(task);
            } else if(task.getAttribute('status') === 'done'){
                task.setAttribute('status', 'inProgress');
                const highestPosition = getNewPosition('inProgress');
                task.setAttribute('position', highestPosition);
                inProgressList.insertAdjacentHTML("beforeend", task.outerHTML);
                task.parentNode.removeChild(task);
            }
        } 
    });
}

function getNewPosition(status){
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
