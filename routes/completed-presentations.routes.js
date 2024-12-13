const express = require("express");
const presentationsController = require("../controllers/presentations.controller");
const router = express.Router();

router.get("/", presentationsController.getCompletedPresentations);
router.post("/", presentationsController.createCompletedPresentation);
// router.delete("/:id", presentationsController.deletePresentation);

module.exports = router;
