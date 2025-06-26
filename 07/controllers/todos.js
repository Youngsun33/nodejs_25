const models = require("../models");

exports.createALLTodos = async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(200).json({ massege: "ok", data: todo });
};

exports.getAllTodos = async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ massege: "ok", data: todos });
};

exports.getTodosById = async (req, res) => {
  const id = req.params.id;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    res.status(200).json({ massege: "ok", data: todo });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
};

exports.updateTodos = async (req, res) => {
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
};

exports.deleteTodos = async (req, res) => {
  const id = req.params.id;
  const result = await models.Todo.destroy({ where: { id: id } });
  if (result > 0) {
    //지운 행이 0개 이상이면, 즉 삭제를 하나라도 했으면
    res.status(200).json({ massege: "삭제 성공!!" });
  } else {
    res.status(404).json({ massege: "ERROR" });
  }
};
