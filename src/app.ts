import express from "express";
import { ITask } from "./type/task.type";
const app = express();
app.use(express.json());
import { v4 as uuidv4 } from "uuid";

const PORT = 5000;

let tasks: ITask[] = [];

app.get("/api/task", (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});



app.get("/api/task/:taskname", (req, res) => {
    const { taskname } = req.params;

    let task = tasks.find(({name}) => name == taskname);
    res.json({
      task,
    });
  });
app.post("/api/task", (req, res) => {
  const newTask = req.body as ITask;
  newTask.id = uuidv4();
  tasks.push(newTask);
  res.json({
    message: "added task",
  });
});

app.put("/api/task/:id", (req, res) => {
  const { id } = req.params;
  const updateTask = req.body as ITask;
  const updateTaskList = tasks.filter((item) => {
    return item.id !== id;
  });
  updateTaskList.push(updateTask);
  tasks = updateTaskList;

  res.json({
    message: "updeted  task",
  });
});

app.delete("/api/task/:id", (req, res) => {
  const { id } = req.params;
  const deleteTask = tasks.filter((item) => {
    return item.id !== id;
  });
  tasks = deleteTask;
  res.json({
    message: "deleted task",
  });
});

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});