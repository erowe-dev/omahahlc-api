const express = require("express");
const presentationsController = require("../controllers/presentations.controller");
const router = express.Router();

router.get("/", presentationsController.getScheduledPresentations);
router.post("/", presentationsController.createScheduledPresentation);
// router.put(
//   "/:id/complete",
//   presentationsController.setPresentationCompleted
// );
// router.delete("/:id", presentationsController.deletePresentation);

module.exports = router;
