const express = require("express");
const userManagementController = require("../controllers/user-management.controller");
const router = express.Router();

router.put("/:id/reset-password", userManagementController.resetPassword);

module.exports = router;
