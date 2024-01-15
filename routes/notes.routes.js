const express = require("express");
const notesController = require("../controllers/notes.controller");
const router = express.Router();

router.get("/", notesController.getNotes);
router.get("/interaction-statistics", notesController.getStatistics);
router.post("/", notesController.createNote);

module.exports = router;