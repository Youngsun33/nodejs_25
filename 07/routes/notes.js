const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes");

router.post("/", noteController.createAllNotes);
router.get("/", noteController.getAllNotes);
router.get("/:tag", noteController.getNotes);
router.put("/:id", noteController.updateNote);
router.delete("//:id", noteController.deleteNotes);

module.exports = router;
