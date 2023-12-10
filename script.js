{
    const welcome = () => {
        console.log("Welcome everyone searching for a new adventures with HTML, CSS and JS!")
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
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

    let tasks = [];
    let buttonsRendered = false;

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
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

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {

        if (tasks.length === 0) {
            document.querySelector(".js-toggleButtonEvents").innerHTML = "";
            return;
        }

        if (buttonsRendered) {
            return;
        }

        let htmlString = "";

        htmlString += `
            <button class="js-toggleButtonEvents js-hideCompletedButtons">Hide completed</button>
            <button class="js-toggleButtonEvents js-markAllAsDoneButtons">Complete all</button>
            `;

        document.querySelector(".js-toggleButtonEvents").innerHTML = htmlString;
    };

    const toggleButtonsEvents = () => {

    };

    const render = () => {

        renderTasks();
        renderButtons();
        toggleButtonsEvents();

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