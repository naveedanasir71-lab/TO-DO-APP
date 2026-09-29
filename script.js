var input = document.getElementById("taskInput");
var addButton = document.getElementById("addTaskBtn");
var list = document.getElementById("taskList");

var total = document.getElementById("totalTasks");
var completed = document.getElementById("completedTasks");
var pending = document.getElementById("pendingTasks");

var tasks = [];
var currentFilter = "all";


// ADD TASK
addButton.onclick = function () {

    var text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = "";

    showTasks();
};


// SHOW TASKS
function showTasks() {

    list.innerHTML = "";

    var visibleTasks = tasks;

    if (currentFilter === "active") {
        visibleTasks = tasks.filter(function (task) {
            return task.completed === false;
        });
    }

    if (currentFilter === "completed") {
        visibleTasks = tasks.filter(function (task) {
            return task.completed === true;
        });
    }


    for (var i = 0; i < visibleTasks.length; i++) {

        var task = visibleTasks[i];

        var box = document.createElement("div");
        box.className = "task-item";

        if (task.completed === true) {
            box.className = "task-item completed";
        }


        var left = document.createElement("div");
        left.className = "task-left";


        var check = document.createElement("button");
        check.className = "check-btn";

        if (task.completed === true) {
            check.innerHTML = "✓";
        }

        check.onclick = function () {

            var id = task.id;

            for (var j = 0; j < tasks.length; j++) {

                if (tasks[j].id === id) {
                    tasks[j].completed = !tasks[j].completed;
                }

            }

            showTasks();
        };


        var text = document.createElement("span");
        text.className = "task-text";
        text.innerHTML = task.text;


        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "Delete";


        deleteBtn.onclick = function () {

            var id = task.id;

            tasks = tasks.filter(function (item) {
                return item.id !== id;
            });

            showTasks();
        };


        left.appendChild(check);
        left.appendChild(text);

        box.appendChild(left);
        box.appendChild(deleteBtn);

        list.appendChild(box);
    }


    updateNumbers();
}


// UPDATE NUMBERS
function updateNumbers() {

    var totalNumber = tasks.length;
    var completedNumber = 0;

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].completed === true) {
            completedNumber++;
        }
    }

    var pendingNumber = totalNumber - completedNumber;

    total.innerHTML = totalNumber;
    completed.innerHTML = completedNumber;
    pending.innerHTML = pendingNumber;
}


// FILTER BUTTONS
var filters = document.querySelectorAll(".filter");

for (var i = 0; i < filters.length; i++) {

    filters[i].onclick = function () {

        for (var j = 0; j < filters.length; j++) {
            filters[j].classList.remove("active");
        }

        this.classList.add("active");

        currentFilter = this.getAttribute("data-filter");

        showTasks();
    };
}


// ENTER KEY
input.onkeydown = function (event) {

    if (event.key === "Enter") {
        addButton.click();
    }
};


// START
showTasks();