{
    const welcome = () => {
        console.log("Welcome everyone searching for a new adventures with HTML, CSS and JS!")
    };

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

        for(const task of tasks) {
            htmlString += `
                <li>
                ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
        welcome();
    };

    init();
}