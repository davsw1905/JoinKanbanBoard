function HTMLTemplateTask(task) {
    return /*html*/`<div id="task${task.createdAt}" onclick="openTask(${task.createdAt})" draggable="true" ondragstart="startDragging('task${task.createdAt}')" class="card dFlex directionColumn alignStart cursorPointer">
            <div id="boardCategory${task.createdAt}">${task.category}</div>
            <div class="fontBold">${task.title}</div>
            <div class="fontGrey" >${task.description}</div>
            <div id="subtasksBoardOverDiv${task.createdAt}" class="dFlex justBetween width100Perc">
                <div class="flex1 posRelative">
                    <div class="greyProgressBarBoard posAbsolute" id="greyProgressBar${task.createdAt}"></div>
                    <div class="blueProgressBarBoard posAbsolute" id="blueProgressBar${task.createdAt}"></div>
                </div>
                <div class="padLeft8 fontSize12" id="subtasksBoard${task.createdAt}"></div>
            </div>
            <div class="dFlex justBetween width100Perc alignCenter">
                <div class="dFlex" id="contacts${task.createdAt}"></div>
                <div id="priority${task.createdAt}"></div>
            </div>
        </div>
    `;
}

function HTMLTemplatePopUpTask(task) {
    return /*html*/`<div class="dFlex alignCenter justCenter">
            <div class="card posRelative alignStart">
                <img onclick="closeTask()" class="posAbsolute cursorPointer closeImgBoard" src="./img/Close.png" alt="close">
                <div id="boardPopUpCategory${task.createdAt}">${task.category}</div>
                <div class="headline">${task.title}</div>
                <div>${task.description}</div>
                <div class="dFlex">
                    <span class="width100Px">Due date:</span>
                    <div>${task.date}</div>
                </div>
                <div id="boardPopUpPriority${task.createdAt}" class="dFlex"></div>
                <div>
                    <span>Assigned To:</span>
                    <div class="gap20 dFlex directionColumn padTop20" id="popUpContacts${task.createdAt}"></div>
                </div>
                <div>
                    <span>Subtasks</span>
                    <div class="padLeft16 gap10 dFlex directionColumn marTopMinus10 padTop20" id="popUpSubtasks${task.createdAt}"></div>
                </div>
                <div class="dFlex justEnd alignCenter width100Perc fontSize14 gap6">
                    <div class="dFlex cursorPointer" onmouseover="changeBoardTaskPopUpDeleteToBlue()" onmouseout="changeBoardTaskPopUpDeleteToBlack()">
                        <img id="boardTaskPopUpDeleteImg" class="height18" src="./img/delete.png" alt="dustbin">
                        <span id="boardTaskPopUpDeleteSpan" class="padLeft6">Delete</span>
                    </div>
                    <div class="lightGreyVerticalLine"></div>
                    <div class="dFlex cursorPointer width50" onclick="boardPopUpEdit(${task.createdAt})" onmouseover="changeBoardTaskPopUpEditToBlue()" onmouseout="changeBoardTaskPopUpEditToBlack()">
                        <img id="boardTaskPopUpEditImg" class="height18" src="./img/edit-black.png" alt="pencil">
                        <span id="boardTaskPopUpEditSpan" class="padLeft6">Edit</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function HTMLTemplatePopUpContact(contact) {
    return /*html*/`<div class="dFlex alignCenter padLeft16">
            <div class="initialsBoard" style="background-color:${contact.color}">${contact.initials}</div>
            <div class="padLeft16">${contact.firstName} ${contact.lastName}</div>
        </div>
    `;
}

function HTMLTemplatePopUpSubtask(subtask) {
    return /*html*/`<div class="dFlex alignCenter">
            <img class="cursorPointer height20" src="./img/checkboxNotChecked.png" alt="checkbox">
            <span class="padLeft16 fontSize14">${subtask.subtask}</span>
        </div>
    `;
}

function HTMLTemplatePopUpPriority(task) {
    return /*html*/`<span class="width100Px">Priority:</span>
        <div>${task.prio} 
            <img class="padLeft6" src="./img/${task.prio}Prio.png" alt="priority">
        </div>
    `;
}

function HTMLTemplatePopUpBoardEdit(task){
    return /*html*/`<div class="dFlex alignCenter justCenter">
        <div class="card posRelative alignStart">
            <img onclick="closeTask()" class="posAbsolute cursorPointer closeImgBoard" src="./img/Close.png" alt="close">
            <div class="dFlex directionColumn padTop35 width100Perc">
                <label for="boardPopUpInputTitle" class="padBot5">Title</label>
                <input id="boardPopUpInputTitle" class="inputBoardEdit" value="${task.title}" type="text">
            </div>
            <div class="dFlex directionColumn width100Perc">
                <label for="boardPopUpInputDescription" class="padBot5">Description</label>
                <textarea id="boardPopUpInputDescription" class="inputBoardEdit" type="text" cols="10" rows="3">${task.description}</textarea>
            </div>
            <div class="dFlex directionColumn width100Perc">
                <label for="boardPopUpInputDate" class="padBot5">Due date</label>
                <input id="boardPopUpInputDate" class="inputBoardEdit" value=${task.date} type="date">
            </div>
            <div class="dFlex directionColumn width100Perc">
                <div class="padBot5">Priority</div>
                <div class="dFlex">
                    <div>Urgent</div>
                    <div>Medium</div>
                    <div>Low</div>
                </div>
            </div>
            <div class="dFlex directionColumn width100Perc">
                <label for="boardPopUpSelectContacts" class="padBot5">Assigned to</label>
                <input class="inputBoardEdit" type="text" value="Select contacts to assign">
                <div id="boardPopUpSelectContacts${task.createdAt}" class="d-none"></div>
                <div class="dFlex padTop5" id="boardPopUpEditColorfulContacts${task.createdAt}"></div>
            </div>
            <div class="dFlex directionColumn width100Perc">
                <label for="boardPopUpInputSubtasks" class="padBot5">Subtasks</label>
                <div class="posRelative marRight28">
                    <input placeholder="Add new subtask" id="boardPopUpInputSubtasks" class="inputBoardEdit width100Perc" type="text">
                    <div id="boardPopUpInputSubtasksImg" class="posAbsolute"></div>
                </div>
                <ul class="dFlex directionColumn gap10" id="boardPopUpAllSubtasks"></ul>
            </div>
            <div class="dFlex justEnd width100Perc">
                <button class="darkBtn cursorPointer fontBold">Ok <img class="padLeft2 height10" src="./img/check.png" alt="check"></button>
            </div>
        </div>
    </div>
    `;
}