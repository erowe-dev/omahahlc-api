const express = require("express");
const cooperativeDoctorsController = require("../controllers/cooperative-doctors.controller");
const router = express.Router();

router.get("/", cooperativeDoctorsController.getCooperativeDoctors);
router.get("/new", cooperativeDoctorsController.getNewCooperativeDoctors);
router.get("/:id", cooperativeDoctorsController.getCooperativeDoctor);
router.post("/", cooperativeDoctorsController.createCooperativeDoctor);
router.put("/:id", cooperativeDoctorsController.updateCooperativeDoctor);
router.delete("/:id", cooperativeDoctorsController.deleteCooperativeDoctor);

module.exports = router;
