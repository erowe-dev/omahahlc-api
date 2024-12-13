const express = require("express");
const presentationsController = require("../controllers/presentations.controller");
const router = express.Router();

router.get("/", presentationsController.getPresentationInvitations);
router.post("/", presentationsController.createPresentationInvitation);
// router.delete("/:id", presentationsController.deletePresentation);

module.exports = router;
