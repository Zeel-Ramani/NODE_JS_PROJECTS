let express = require("express");
let app = express();
let port = 5000;

app.use(express.urlencoded());
app.set("view engine", "ejs");

let tasks = [
    {
        id: "1",
        title: "Implement Backend",
        description: "Set up server and database",
        assignedTo: "jimmy",
        deadline: "2025-03-05T12:00"
    }
];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/addtask", (req, res) => {
    let { id, title, description, assignedTo, deadline } = req.body;
    tasks.push({ id, title, description, assignedTo, deadline });
    res.redirect("/");
});

app.get("/deletetask/:id", (req, res) => {
    tasks = tasks.filter(task => task.id !== req.params.id);
    res.redirect("/");
});

app.get("/edittask/:id", (req, res) => {
    let task = tasks.find(t => t.id === req.params.id);
    res.render("edit", { task });
});

app.post("/updatetask/:id", (req, res) => {
    let taskId = req.params.id;
    let { title, description, assignedTo, deadline } = req.body;

    tasks = tasks.map(task =>
        task.id === taskId
            ? { id: taskId, title, description, assignedTo, deadline }
            : task
    );

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});