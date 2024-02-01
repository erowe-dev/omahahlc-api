const express = require("express");
const presentationsController = require("../controllers/presentations.controller");
const router = express.Router();

router.get("/", presentationsController.getPresentations);
router.post("/", presentationsController.createPresentation);
router.delete("/:id", presentationsController.deletePresentation);

module.exports = router;
