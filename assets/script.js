const main = document.querySelector(".main");
const input = document.querySelector(".input");
const btnAdd = document.querySelector(".btn-add");
const btnSave = document.querySelector(".btn-save");
const switcher = document.querySelector(".switch>input")
const msg = document.querySelector(".msg")
console.log(switcher.checked);

switcher.checked = JSON.parse(localStorage.getItem('autoSave'))

//check localStorage
if (localStorage.getItem('myList')) {
    main.innerHTML = JSON.parse(localStorage.getItem('myList'))
    if (main.childNodes.length > 0) {
        msg.classList.replace("fade-in", "fade-out")
    }
}

function addTask() {
    if (input.value) {
        const date = new Date()
        const dateId = date.getTime()
        console.log(dateId);
        const newItem = document.createElement("li")
        newItem.setAttribute("id", dateId)
        newItem.innerHTML = `<div id="item-${dateId}" class="item fade-in">
        <div class="item-text">${input.value}</div>
        <div class="item-icon" onclick="checkTask(${dateId})"><i id="icon-${dateId}" class="bi bi-circle"></i></div>
        <div class="btn-delete" onclick="deleteTask(${dateId})"><i class="bi bi-circle-fill"></i></div>
        </div>
        <small style="--delay: .2s" class="date fade-in">
        ${date.toDateString()} • ${date.toLocaleTimeString()}
        </small>
    `
        main.prepend(newItem)
        // main.append(newItem)
        input.value = ""
        msg.classList.replace("fade-in", "fade-out")
        input.focus()
    } else {
        input.focus()
        input.classList.add("input-attn")
        setTimeout(() => {
            input.classList.remove("input-attn")
        }, 1000);
    }
    if (switcher.checked) localStorage.setItem('myList', JSON.stringify(main.innerHTML))


}

input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault()
        btnAdd.click()
    }
});

function checkTask(id) {
    const li = document.getElementById(id);
    const item = document.getElementById("item-" + id)
    const icon = document.getElementById("icon-" + id)
    item.classList.toggle("item-done")

    li.parentNode.appendChild(li)
    if (icon.classList.contains("bi-check-circle-fill")
    ) li.parentNode.prepend(li)

    icon.classList.toggle("bi-circle")
    icon.classList.toggle("bi-check-circle-fill")

    if (switcher.checked) localStorage.setItem('myList', JSON.stringify(main.innerHTML))
}

function deleteTask(id) {
    const task = document.getElementById(id)
    task.classList.add("fade-out")
    setTimeout(() => {
        task.remove()
        main.classList.add("refresh-itens")
        if (switcher.checked) localStorage.setItem('myList', JSON.stringify(main.innerHTML))
        setTimeout(() => {
            main.classList.remove("refresh-itens")
        }, 700);
        if (main.childNodes.length == 0) {
            msg.classList.replace("fade-out", "fade-in")
            input.focus()
        }
    }, 900)

    screen.width > 375 && input.focus()
}

//save in localStorage
const saveList = () => {
    localStorage.setItem('myList', JSON.stringify(main.innerHTML))
    btnSave.innerHTML = `<i class="bi bi-save2-fill" ></i>`
    setTimeout(() => {
        btnSave.innerHTML = `save <i class="bi bi-save2-fill" ></i>`
    }, 1000);
}

switcher.addEventListener('change', () => {
    localStorage.setItem('autoSave', JSON.stringify(switcher.checked))
})