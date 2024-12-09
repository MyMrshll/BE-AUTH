const express = require("express");
const router = express.Router();
const { getUser, Register, login } = require("../controllers/Users");
require("dotenv").config();
const verifyToken = require("../middleware/VerifyToken");

router.get("/users", verifyToken, getUser);
router.post("/users", Register);
router.post("/login", login);

module.exports = router;
