const express = require("express");
const cache = require("../middleware/cache-helper");
const prospectiveDoctorsContoller = require("../controllers/prospective-doctors.controller");
const router = express.Router();

router.get("/", cache(10), prospectiveDoctorsContoller.getProspectiveDoctors);
router.get("/:id", prospectiveDoctorsContoller.getProspectiveDoctor);
router.post("/", prospectiveDoctorsContoller.createProspectiveDoctor);
router.put("/:id", prospectiveDoctorsContoller.updateProspectiveDoctor);
router.delete("/:id", prospectiveDoctorsContoller.deleteProspectiveDoctor);
router.put(
  "/:id/move-to-cooperative-doctors",
  prospectiveDoctorsContoller.moveToCooperativeDoctors
);

module.exports = router;
