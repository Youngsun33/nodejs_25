//express + sequlize curd 제공하는 서버를 이 파일에 코딩함
//todos restful api 서버 코딩
//관련된 모듈 임포트
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/todos", async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(200).json({ massege: "ok", data: todo });
});

app.get("/todos", async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ massege: "ok", data: todos });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    res.status(200).json({ massege: "ok", data: todo });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (completed) todo.completed = completed;
    if (priority) todo.priority = priority;
    await todo.save();
    res.status(200).json({ massege: "ok", data: todo });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Todo.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(200).json({ massege: "삭제 성공!!" });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
});

app.listen(PORT, () => {
  console.log(`투두 서버가 http://localhost:${PORT}에서 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
