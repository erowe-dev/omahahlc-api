const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();

router.get("/me", usersController.getUser);
router.get("/my-menu", usersController.getUserMenu);

module.exports = router;
