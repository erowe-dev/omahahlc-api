const express = require("express");
const presentationsController = require("../controllers/presentations.controller");
const router = express.Router();

router.get("/", presentationsController.getPresentationContacts);
router.get("/:id", presentationsController.getPresentationContact);
router.post("/", presentationsController.createPresentationContact);
router.put("/:id", presentationsController.updatePresentationContact);
// router.delete("/:id", presentationsController.deletePresentation);

module.exports = router;
