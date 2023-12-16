{
    let tasks = [];
    let hideDoneTasks = false;

    const welcome = () => {
        console.log("Welcome everyone searching for a new adventures with HTML, CSS and JS!")
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => (
            index === taskIndex ? { ...task, done: !task.done } : task
        ));

        render();
    };

    const toggleButtonsEvents = () => {

        const hideCompletedTasksButton = document.querySelector(".js-toggleButtonEvents .js-hideCompletedTasksButton");

        if (hideCompletedTasksButton) {
            hideCompletedTasksButton.addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;
                render();
            });
        }

        const markAllTasksAsDone = document.querySelector(".js-toggleButtonEvents.js-markAllTasksAsDone");

        if (markAllTasksAsDone) {
            markAllTasksAsDone.addEventListener("click", () => {
                tasks = tasks.map(task => ({ ...task, done: true }));
                render();
            });
        }
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const [index, task] of tasks.entries()) {
            if (!hideDoneTasks || !task.done) {
                htmlString += `
                    <li class="flex__listItem">
                        <button class="js-done">
                            ${task.done ? '<img src="checkmark.png" class="js-checkmarkIcon">' : ''}
                        </button>
                        <div class="js-content ${task.done ? 'js-contentLineThrough' : ''}">
                            ${task.content}
                        </div>
                        <img class="js-remove" src="bin.png">
                    </li>
                `;
            }
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const toggleButtonEvents = document.querySelector(".js-toggleButtonEvents");

        if (tasks.length === 0) {
            toggleButtonEvents.innerHTML = "";
            return;
        }

        toggleButtonEvents.innerHTML = `
            <button class="js-toggleButtonEvents js-hideCompletedTasksButton">${hideDoneTasks ? 'Show' : 'Hide'} completed tasks</button>
            <button class="js-toggleButtonEvents js-markAllTasksAsDone">Complete all tasks</button>
        `;
    };

    const render = () => {

        renderTasks();
        renderButtons();

        const removeIcons = document.querySelectorAll(".js-remove");

        removeIcons.forEach((removeIcon, taskIndex) => {
            removeIcon.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });

        toggleButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        newTaskInput.value = "";
    }

    const init = () => {
        render();
        welcome();

        const form = document.querySelector(".js-form");
        const newTaskInput = document.querySelector(".js-newTask");
        const addButton = document.querySelector(".form__button");

        form.addEventListener("submit", onFormSubmit);

        addButton.addEventListener("click", () => {

            if (newTaskInput.value.trim() === "") {
                newTaskInput.focus();
            }
        });
    };

    init();
}