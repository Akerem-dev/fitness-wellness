const express = require("express");
const router = express.Router();
const ActiveMembersController = require("../controllers/activeMembersController");

router.get("/", ActiveMembersController.list);

module.exports = router;
