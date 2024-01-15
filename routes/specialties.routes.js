const express = require("express");
const specialtiesController = require("../controllers/specialties.controller");
const router = express.Router();

router.get("/", specialtiesController.getSpecialties);
router.get("/needed", specialtiesController.getSpecialtiesNeeded);

module.exports = router;
