


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
    }
}




