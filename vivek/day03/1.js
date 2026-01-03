/* MAP */
function openMap() {
    const address = "Hyderabad Telangana";
    const mapURL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
    window.open(mapURL, "_blank");
}

/* TO DO LIST */
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask() {
    const task = taskInput.value.trim();
    if (!task) return;

    createTask(task);
    saveTask(task);
    taskInput.value = "";
}

function createTask(task) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${task}</span><button onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(li);
}

function removeTask(btn) {
    const li = btn.parentElement;
    deleteTask(li.innerText.replace("Remove","").trim());
    li.remove();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTask);
}

function deleteTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
}

/* TIMER */
let seconds = 0;
let timer = setInterval(updateTimer, 1000);
let running = true;

function updateTimer() {
    seconds++;
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    document.getElementById("timerDisplay").innerText =
        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function pauseTimer() {
    if (running) {
        clearInterval(timer);
        running = false;
    } else {
        timer = setInterval(updateTimer, 1000);
        running = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    document.getElementById("timerDisplay").innerText = "00:00:00";
    timer = setInterval(updateTimer, 1000);
    running = true;
}
