const express = require("express");
const userManagementController = require("../controllers/user-management.controller");
const router = express.Router();

router.get("/permissions", userManagementController.getPermissions);
router.get("/roles", userManagementController.getRoles);
router.put("/role-permissions", userManagementController.updateRolePermissions);

router.post("/", userManagementController.createUser);
router.put("/:id", userManagementController.updateUser);
router.put("/:id/reset-password", userManagementController.resetPassword);
router.delete("/:id", userManagementController.deleteUser);

module.exports = router;
