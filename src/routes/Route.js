const express = require("express");
const router = express.Router();
const { getUser, Register, login, logout } = require("../controllers/Users");
require("dotenv").config();
const verifyToken = require("../middleware/VerifyToken");

router.get("/users", verifyToken, getUser);
router.post("/users", Register);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
