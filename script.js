{
    const welcome = () => {
        console.log("Welcome everyone searching for a new adventures with HTML, CSS and JS!")
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const tasks = [];

    const render = () => {
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