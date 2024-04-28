const express = require("express");
const cache = require("../middleware/cache-helper");
const hospitalsContoller = require("../controllers/hospitals.controller");
const router = express.Router();

router.get("/", cache(30), hospitalsContoller.getHospitals);
router.get("/:id", hospitalsContoller.getHospital);
router.post("/", hospitalsContoller.createHospital);
router.put("/:id", hospitalsContoller.updateHospital);
router.delete("/:id", hospitalsContoller.deleteHospital);

module.exports = router;
