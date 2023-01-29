import express from "express";
import { ITask } from "./type/task.type";
const app = express();
app.use(express.json());
import { v4 as uuidv4 } from "uuid";

const PORT = 5000;

let task: ITask[] = [];

app.get("/api/task", (req, res) => {
  try {
    res.json(task);
  } catch (error) {
    console.log(error);
  }
});



app.get("/api/task/:id", (req, res) => {
    const { id } = req.params;
    var taskItem: ITask
    const getTask = task.filter((item) => {
        taskItem.id = item.id
        taskItem.name = item.name
        
      return taskItem
    });
    
    res.json({
      message: task.map(item=>id),
    });
  });
app.post("/api/task", (req, res) => {
  const newTask = req.body as ITask;
  newTask.id = uuidv4();
  task.push(newTask);
  res.json({
    message: "added task",
  });
});

app.put("/api/task/:id", (req, res) => {
  const { id } = req.params;
  const updateTask = req.body as ITask;
  const updateTaskList = task.filter((item) => {
    return item.id !== id;
  });
  updateTaskList.push(updateTask);
  task = updateTaskList;

  res.json({
    message: "updeted  task",
  });
});

app.delete("/api/task/:id", (req, res) => {
  const { id } = req.params;
  const deleteTask = task.filter((item) => {
    return item.id !== id;
  });
  task = deleteTask;
  res.json({
    message: "deleted task",
  });
});

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});