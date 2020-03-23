const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./auth-user-model.js");

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {
	// implement login
});

module.exports = router;
