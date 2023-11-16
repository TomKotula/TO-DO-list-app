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

    const tasks = [
        {
            content: "Nagrać lekcję",
            done: false,
        },
        {
            content: "Zjesc piergoi",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li ${task.done ? " style=\"text-decoration: line-through\"" : ""}>
                ${task.content}
                <img class="js-remove" src="bin.png" height= 30px width= 30px>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeIcons = document.querySelectorAll(".js-remove");
        console.log(removeIcons);

        removeIcons.forEach((removeIcon, taskIndex) => {
            removeIcon.addEventListener("click", () => {
                removeTask(taskIndex);
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