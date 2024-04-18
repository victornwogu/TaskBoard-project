const createTaskBtn = document.querySelector('.addTodo-btn')
const createTaskPopUp = document.querySelector('.popup')
const removeTaskPopUpBtn = document.querySelector('.go-back')
const addTaskBtn = document.querySelector('.add-btn')
const taskTitle = document.querySelector('.todo-title')
const taskDescription = document.querySelector('.todo-description')
const taskContainer = document.querySelector('.todo-container')
const deletePopUp = document.querySelector('.delete-popup')
const blurPopUp = document.querySelector('.blur-background')
const movePopUp = document.querySelector('.move-popup')
const allowMove = document.querySelector('.allow-move')
const cancelMove = document.querySelector('.cancel-move')
const doneContainer = document.querySelector('.progress-container')
const alreadyExistsPopUp = document.querySelector('.already-exists')
const categoryHeader = document.querySelector('.category-header')
const yesDel = document.querySelector('.yes-del')
const noDel = document.querySelector('.no-del')


const doneDescription = document.querySelector('.done-description')

const allowCreateBtn = document.querySelector('.allow')
const changeBtn = document.querySelector('.change')

const chooseStatus = document.querySelector('.choose-status')

const personalBtn  = document.querySelector('.personal')
const workBtn = document.querySelector('.work')

const backgroundBlur = document.querySelector('.background-blur')
const personalNav = document.querySelector('.Personal-navigation')
const workNav = document.querySelector('.work-navigation')
const boardNav = document.querySelector('.Board-navigation')

const navDiv = document.querySelectorAll('.nav a')
let statusValue;

const emptyTask = document.querySelector('.empty-task')
const emptyDone = document.querySelector('.empty-done')

const searchInput = document.querySelector('.search-todo')
const noResult = document.querySelector('.no-result')

const taskArr = []

const day = new Date().getDate() < 9 ? '0' + new Date().getDate() : new Date().getDate();
const month = new Date().getMonth() + 1 < 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
const year = new Date().getFullYear()
const date = `${day}/${month}/${year}`


function checkEmptyTaskDisplay() {
  if (taskContainer.querySelectorAll('li').length === 0) {
    emptyTask.style.display = 'block';
  } else {
    emptyTask.style.display = 'none';
  }
}

function checkEmptyDoneDisplay(){
  if (doneContainer.querySelectorAll('li').length === 0) {
    emptyDone.style.display = 'block';
  } else {
    emptyDone.style.display = 'none';
  }
}

function load() {
createTaskBtn.addEventListener('click', createTask)

removeTaskPopUpBtn.addEventListener('click', removeTaskPopUp)

addTaskBtn.addEventListener('click', addTask)

blurPopUp.addEventListener('click', blurToggle)

backgroundBlur.addEventListener('click', ()=> {
  chooseStatus.classList.remove('show')
  backgroundBlur.style.display = 'none'
})
}



function createTask(){
 createTaskPopUp.style.visibility = 'initial'
 emptyTask.style.display = 'none'
 emptyDone.style.display = 'none'
}

function removeTaskPopUp(){
  createTaskPopUp.style.visibility = 'hidden'
  taskTitle.value = ''
  taskDescription.value = ''
  checkEmptyDoneDisplay()
  checkEmptyTaskDisplay()
}

function taskAdded(){

  navDiv.forEach(btn => {
    btn.classList.remove('active')
  })
   boardNav.classList.add('active')

  const task = document.createElement('li')
task.classList.add('todo-box')

task.innerHTML = `  <span class="todo-date">
${date}
</span>
<div class="des-todo">
<span class="todo">
  ${taskTitle.value}
</span>
<span class="des">
 ${taskDescription.value}
</span>
<textarea class="edited"></textarea>
</div>
<div class="todo-btn">
  <i style="float: left;" class='bx bx-edit-alt todo-edit' title="edit"></i>
  <p class="status">${statusValue}</p>
  <i class='bx bx-move todo-move' title="move todo to in progress"></i>
  <i class='bx bxs-trash todo-delete' title="delete"></i>
</div>`


const statusEl = task.querySelector('.status')

navDiv.forEach(btn => {
  
  btn.addEventListener('click', () => {
    navDiv.forEach(btn => {
      btn.classList.remove('active')
    })
    btn.classList.add('active')
  })
})

boardNav.addEventListener('click', () => {
  categoryHeader.innerHTML = 'Task Board'
  categoryHeader.style.color = 'black'
  searchInput.value = ''
  task.style.display = 'block'
  
})

personalNav.addEventListener('click', () => {
  categoryHeader.innerHTML = 'Personal'
  categoryHeader.style.color = 'blue'
  searchInput.value = ''
  if(statusEl.innerHTML === 'Work'){
    task.style.display = 'none'
  }else{
    task.style.display = 'block'
  }

 
})

workNav.addEventListener('click', () => {
  categoryHeader.innerHTML = 'Work'
  categoryHeader.style.color = 'Orange'
  searchInput.value = ''
  if(statusEl.innerHTML === 'Personal'){
    task.style.display = 'none'
  }else{
    task.style.display = 'block'
  }
})

if(statusValue === 'Work'){
  task.querySelector('.status').style.color = 'orange'
}else{
  task.querySelector('.status').style.color = 'blue'
}
taskArr.push(taskTitle.value)

const descriptionContent = task.querySelector('.des')
const editContent = task.querySelector('.edited')
const todo = task.querySelector('.todo')

const editBtn = task.querySelector('.todo-edit')

editBtn.addEventListener('click', () => {
   if(editBtn.classList.contains('bx-edit-alt')){
    editBtn.classList.replace('bx-edit-alt', 'bx-save')
  
    editContent.value = descriptionContent.innerHTML.trim()
    
    descriptionContent.style.display = 'none'
    editContent.style.display = 'block'

   }else if(editBtn.classList.contains('bx-save')){
    editBtn.classList.replace('bx-save', 'bx-edit-alt')
    
    descriptionContent.innerHTML = editContent.value.trim()

    descriptionContent.style.display = 'block'
    editContent.style.display = 'none'
   }
})

const delBtn = task.querySelector('.todo-delete')

delBtn.addEventListener('click', () => {
   deletePopUp.classList.toggle('show')
   blurPopUp.classList.toggle('pop')

   yesDel.addEventListener('click', () => {
      taskArr.splice(todo.innerHTML, 1)
      task.remove()
      deletePopUp.classList.remove('show')
      blurPopUp.classList.remove('pop')
      
      checkEmptyTaskDisplay()
   })

   noDel.addEventListener('click', () => {
    deletePopUp.classList.remove('show')
    blurPopUp.classList.remove('pop')
   })
   
})

const MoveBtn = task.querySelector('.todo-move')

const descriptionDone = task.querySelector('.des')
const taskStatus = task.querySelector('.status')

MoveBtn.addEventListener('click', () => {
   movePopUp.classList.toggle('show')
   blurPopUp.classList.toggle('pop')

   const movedTask = document.createElement('li')
   allowMove.addEventListener('click', () => {
    movePopUp.classList.remove('show')
    blurPopUp.classList.remove('pop')
    taskArr.splice(todo.innerHTML, 1)
    
    
    movedTask.classList.add('in-progress')

    movedTask.innerHTML = ` <div class="in-progressBox" title="Click to see details">
    <span class="todo">
     ${todo.innerHTML}
    </span>
    <div class="successful">
<span style="color: green;">Successful</span>
<i  color: green;" class='bx bx-check-circle'></i>
<button class="delete-button">Delete</button>
</div>
<div style="display: none;" class="done-content">as</div>
  </div>
  `

  movedTask.querySelector('.in-progressBox').addEventListener('mouseover', () => {
    movedTask.querySelector('.delete-button').style.opacity = '1';
  });
  
  movedTask.querySelector('.in-progressBox').addEventListener('mouseout', () => {
    movedTask.querySelector('.delete-button').style.opacity = '0';
  });


 

  setTimeout(() => {
    movedTask.remove()
    checkEmptyDoneDisplay()
  }, 1728000000)
  doneContainer.appendChild(movedTask)
  task.remove()

  checkEmptyDoneDisplay()
  checkEmptyTaskDisplay()
})





   cancelMove.addEventListener('click', () => {
    movePopUp.classList.remove('show')
    blurPopUp.classList.remove('pop')
   })

   movedTask.addEventListener('click', (e) => {
    doneContainer.querySelector('.date-done').innerHTML = `${date}`
if(e.target.innerHTML === 'Delete'){
  movedTask.remove()
  checkEmptyDoneDisplay()
}else{
  blurPopUp.classList.toggle('pop')
  doneDescription.style.display = 'block'

if(taskStatus.innerHTML === 'Work'){
 taskStatus.style.color = 'orange'
}else{
  taskStatus.style.color = 'blue'
}
  doneDescription.querySelector('.title-done').innerHTML = `${todo.innerHTML}`
  doneDescription.querySelector('.des-done').innerHTML = `${descriptionDone.innerHTML}`
  doneDescription.querySelector('.date-done').innerHTML = `${date}`
  doneDescription.querySelector('.status-done').innerHTML = `${taskStatus.innerHTML}`
  
  if(doneDescription.querySelector('.status-done').innerHTML === 'Work'){
    doneDescription.querySelector('.status-done').style.color = 'orange'
  }else{
    doneDescription.querySelector('.status-done').style.color = 'blue'
  }
}
    
   
   })

   doneDescription.querySelector('.close').addEventListener('click', () => {
    doneDescription.style.display = 'none'
    blurPopUp.classList.remove('pop')
   
   })

})



taskTitle.value = ''
taskDescription.value = ''

removeTaskPopUp()
taskContainer.appendChild(task)

searchInput.addEventListener('input', () => {
  noResult.style.display = 'none'
  const searchValue = searchInput.value.trim().toLowerCase();
  taskContainer.querySelectorAll('li').forEach(task => {
    const title = task.querySelector('.todo').textContent.trim().toLowerCase();
    if (!title.includes(searchValue)) {
      task.style.display = 'none';
      noResult.classList.toggle('dis')
    } else {
      task.style.display = 'block';
      noResult.classList.toggle('dis')
    }
  });
});

checkEmptyDoneDisplay()
checkEmptyTaskDisplay()
}

function blurToggle(){
  blurPopUp.classList.toggle('pop')
  deletePopUp.classList.remove('show')
  movePopUp.classList.remove('show')
  doneDescription.style.display = 'none'
  alreadyExistsPopUp.classList.remove('show')
}


  allowCreateBtn.addEventListener('click', () => {
    alreadyExistsPopUp.classList.remove('show')
    blurPopUp.classList.remove('pop')  
    statusOpt()
    
  })

  changeBtn.addEventListener('click', () => {
    alreadyExistsPopUp.classList.remove('show')
    blurPopUp.classList.remove('pop') 
  })


function addTask(){
const name = taskTitle.value
const description = taskDescription.value

if(name === '' || description === ''){
  return
}

else if(taskArr.includes(taskTitle.value)){
  alreadyExistsPopUp.classList.add('show')
  blurPopUp.classList.add('pop')     
}else{
statusOpt()
}

}

function statusOpt(){
  chooseStatus.classList.toggle('show')
  backgroundBlur.style.display = 'block'
}




personalBtn.addEventListener('click', () => {
  categoryHeader.innerHTML = 'Task Board'
  categoryHeader.style.color = 'black'
  statusValue = 'Personal'
  backgroundBlur.style.display = 'none'
  chooseStatus.classList.remove('show')
  searchInput.value = ''
  taskAdded()
})

workBtn.addEventListener('click', () => {
  categoryHeader.innerHTML = 'Task Board'
  categoryHeader.style.color = 'black'
  statusValue = 'Work'
  backgroundBlur.style.display = 'none'
  chooseStatus.classList.remove('show')
  searchInput.value = ''
  taskAdded()
})


checkEmptyDoneDisplay()
checkEmptyTaskDisplay()

load()