// getting required elements
const header = document.querySelector('.header');
const title = document.getElementById('title');
const left_title = document.querySelector('.left-title');
const right_title = document.querySelector('.right-title');
const new_list = document.querySelector('.new-list');
const new_item = document.querySelector('.new-item');
const close_btn = document.querySelector('.close-btn');
const listInput = document.querySelector('.list-input');
const itemInput = document.querySelector('.item-input');
const no_items = document.querySelector('.no-items');
const box = document.getElementById('dynamic-box');
const title2 = document.getElementById('title2');
const back_title = document.querySelector('.back-title');
const mid_title = document.querySelector('.mid-title');
const add_title_btn = document.querySelector('.add-title');


function popupList() {
    header.classList.toggle('disable');
    new_list.classList.toggle('active');
    listInput.value = "";
}

let arr = [];
function addList() {
    if (listInput.value !== "") {
        let obj = {
            id: Date.now(),
            listInput: listInput.value
        }
        arr.push(obj);
        no_items.style.display = "none";
        createCard();
        listInput.value = "";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please Enter valid card name!",
        });
    }
    popupList();
}

let flag;
function popupItem(val) {
    if(val !== false) {
        flag = val.parentNode.id;
        header.classList.toggle('disable');
        new_item.classList.toggle('active');
    } else {
        itemInput.value = "";
        header.classList.toggle('disable');
        new_item.classList.toggle('active');
    }
}

function createCard() {
    const card = document.createElement('div');
    card.setAttribute('class', 'dynamic-cards');
    for (let i = 0; i < arr.length; i++) {
        card.setAttribute("id", arr[i].id);
        card.innerHTML = `<div class="dt-1" onclick = "openCard(this)">${arr[i].listInput}</div><hr>
                        <div class="items"></div>
                        <button onclick="deleteCard(this)" class="del-icon"><span class="material-icons md-36 icon" >delete</span></button>
                        <button onclick="popupItem(this)" class="add-icon"><span class="material-icons md-36 icon" >add_circle</span></button>`;
        box.appendChild(card);
    }
}

function openCard(e) {
    e.parentElement.classList.toggle('active');
    let activeList = document.querySelectorAll('.dynamic-cards');
    for (let i = 0; i < activeList.length; i++) {
        if(activeList[i] !== e.parentElement) {
            activeList[i].classList.add('inactive');
            title.classList.add('inactive');
            title2.classList.add('active');
            mid_title.classList.add('active');

            mid_title.innerHTML = `${e.innerHTML}`;
        }
    }
}

function backToHome() {
    let activeList = document.querySelectorAll('.dynamic-cards');
    for (let i = 0; i < activeList.length; i++) {
        activeList[i].classList.remove('inactive');
            title.classList.remove('inactive');
            title2.classList.remove('active');
            mid_title.classList.remove('active');
    }
}

function addTitleBtn() {
    let activeList = document.querySelectorAll('.dynamic-cards');
    for (let i = 0; i < activeList.length; i++) {
        activeList[i].classList.remove('inactive');
        title.classList.remove('inactive');
        title2.classList.remove('active');
        mid_title.classList.remove('active');
    }
    popupList();
}

function deleteCard(val) {
    let rem = val.parentElement;
    const value = val.parentElement.id;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(value)) {
            arr.splice(i, 1);
            break;
        }
    }
    rem.remove();
    if (arr.length == 0) {
        no_items.style.display = "block";
    }
}


function addItem() {
    if(itemInput.value !== "") {
        let innerDiv = document.createElement('div');
        innerDiv.setAttribute("class", "innerDiv");
        for (let i = 0; i < arr.length; i++) {
            let cardNo = box.children[i];
            let  tasks = cardNo.children[2];
            if (arr[i].id === Number(flag)) {
                innerDiv.innerHTML = `<span class="intext">${itemInput.value}</span>
                                    <button onclick="markDone(this)" class="mark">Mark Done</button>`;
                tasks.appendChild(innerDiv);
            }
        }
        itemInput.value = "";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please Enter valid item name!",
        });
    }
    popupItem(false);
}

function markDone(param) {
    let innerDivChildren = param.parentNode.children;
    let innerDivText = innerDivChildren[0];
    let innerDivBtn = innerDivChildren[1];
    let cardId = param.parentNode.parentNode.parentNode.id;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id === Number(cardId)) {
            innerDivBtn.style.display = "none";
            innerDivText.style.color = "red";
            innerDivText.style.textDecoration = "line-through";
            innerDivText.style.textDecorationColor = "darkred";
            innerDivBtn.style.textAlign = "center";
            innerDivText.style.margin= "0% 20%";
            break;
        }
    }
}
