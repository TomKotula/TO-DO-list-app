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
        tasks[taskIndex].done = ! tasks[taskIndex].done;
        render();
    };

    const tasks = [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="flex__listItem">
            <button class="js-done"></button>
            <div class="js-content">
            ${task.content}
            </div>
            ${task.done ? '<img src="bin.png" class="js-correctIcon">' : ''}
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

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    }

    const init = () => {
        render();
        welcome();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}