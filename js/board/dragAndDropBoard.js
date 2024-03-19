/**
 * Initializes the dragging-process by setting the "draggingOnce"-variable to true and transforming the look of the current dragged element.
 * 
 * @param {string} id - Passes the id from the current dragged element.
 */
function startDragging(id) {
    draggingOnce = true;
    currentDraggedElement = id;
    let element = document.getElementById(id);
    element.style.transform = 'rotate(5deg)';
}

/**
 * Allows to drop a task down on another element by preventing the default mode of the specific element.
 * 
 * @param {Event} event - The event object representing the drop event.
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Shows an empty div.
 * 
 * @param {string} id - Uses the id of a specific element as parameter.
 */
function showEmptyDiv(id) {
    if(draggingOnce) {
        let element = document.getElementById(id);
        let emptyDiv = document.createElement('div');
        emptyDiv.id = id + 'EmptyDiv';
        emptyDiv.className = 'emptyDivForDraggedElement zIndexMinus1';
        emptyDiv.style.width = (document.getElementById(currentDraggedElement).clientWidth - 5) + 'px';    
        emptyDiv.style.height = (document.getElementById(currentDraggedElement).clientHeight - 5) + 'px';
        element.appendChild(emptyDiv);
        draggingOnce = false;
    }
}

/**
 * Changes the value of the key "status" from a specific task and stores the edited data in the remote storage.
 * 
 * @param {string} newStatus 
 */
async function moveTo(newStatus) { 
    let id = currentDraggedElement.slice(currentDraggedElement.length -13);
    let element = tasks.find(task => task.createdAt == id);
    element.status = newStatus;
    await setItem('tasks', tasks);
    renderAllTasks();
}

/**
 * Hides an empty div.
 * 
 * @param {string} id - Uses the id of a specific element as parameter.
 */
function removeEmptyDiv(id) {
    if(!draggingOnce) {
        let element = document.getElementById(`${id}EmptyDiv`);
        if(element) {
            element.remove();
            draggingOnce = true;
        }
    }
}

function drag(event) {
    if(screenMobile()) {
        preventReload(event);

        movingTask(event);
   

        let toDoRect = document.getElementById('divToDo').getBoundingClientRect();
        let inProgressRect = document.getElementById('divInProgress').getBoundingClientRect();
        let awaitFeedbackRect = document.getElementById('divAwaitFeedback').getBoundingClientRect();
        let doneRect = document.getElementById('divDone').getBoundingClientRect();
        let targetRect = event.target.getBoundingClientRect();

        if(targetRect.top+targetRect.height/2 < toDoRect.bottom && targetRect.top+targetRect.height/2 > toDoRect.top) {
            currentDropElement = 'divToDo';
            showEmptyDiv(currentDropElement);
        } else {
            removeEmptyDiv(currentDropElement);
        } 

         if (targetRect.top+targetRect.height/2 < inProgressRect.bottom && targetRect.top+targetRect.height/2 > inProgressRect.top) {
            currentDropElement = 'divInProgress';
            showEmptyDiv(currentDropElement);
        } else {
            removeEmptyDiv(currentDropElement);
        } 

        if (targetRect.top+targetRect.height/2 < awaitFeedbackRect.bottom && targetRect.top+targetRect.height/2 > awaitFeedbackRect.top) {
            currentDropElement = 'divAwaitFeedback';
            showEmptyDiv(currentDropElement);
        } else {
            removeEmptyDiv(currentDropElement);
        } 

        if (targetRect.top+targetRect.height/2 < doneRect.bottom && targetRect.top+targetRect.height/2 > doneRect.top) {
            currentDropElement = 'divDone';
            showEmptyDiv(currentDropElement);
        } else {
            removeEmptyDiv(currentDropElement);
        }  

        scrollDownOrUpWithTask(event);
    }
}

function screenMobile() {
    return window.innerWidth <= 1100;
}

function preventReload(event) {
    event.preventDefault();
}

function movingTask(event) {
    event.target.style.position = "absolute";
    event.target.style.zIndex = "2";
    event.target.style.left = event.touches[0].pageX-event.target.clientWidth/2 + 'px';
    event.target.style.top = event.touches[0].pageY-event.target.clientHeight/2 + 'px';
}

function scrollDownOrUpWithTask(event) {
    scrollUpWithTask(event);
    scrollDownWithTask(event);
}

function scrollUpWithTask(event) {
    if(event.touches[0].clientY-event.target.clientHeight/2 <= 0) {
        scroll(0, window.scrollY-15);
    }
}

function scrollDownWithTask(event) {
    if(event.touches[0].clientY+event.target.clientHeight/2 > screen.height && window.scrollY <= (document.body.scrollHeight - screen.height)) {
        console.log(event.touches[0].pageY+event.target.clientHeight/2)
        scroll(0, window.scrollY+15);
    }
}

function drop() {
    if(window.innerWidth <= 1100) {
        if(currentDropElement) {
            removeEmptyDiv(currentDropElement);
            let newStatusFirstLetter = currentDropElement.slice(3).charAt(0).toLowerCase(0);
            let newStatus = newStatusFirstLetter + currentDropElement.slice(4);
            moveTo(newStatus);
        }
    }
}