const express = require("express");
const checklistsController = require("../controllers/checklists.controller");
const router = express.Router();

router.put("/:id", checklistsController.updateChecklist);

module.exports = router;
