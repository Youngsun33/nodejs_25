const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

router.post("/", todoController.createALLTodos);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodosById);
router.put("/id", todoController.updateTodos);
router.delete("/:id", todoController.deleteTodos);

module.exports = router;
