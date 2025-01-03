const express = require("express");
const router = express.Router();
const { getUser, Register, login, logout } = require("../controllers/Users");
require("dotenv").config();
const verifyToken = require("../middleware/VerifyToken");
const refreshToken = require("../middleware/RefreshToken");
const {testingApi} = require("../test/testing");

router.get("/", (req, res) => res.send("API AUTH FERTA JUNINDI"));
router.get("/testing", testingApi); 
router.get("/users", verifyToken, getUser);
router.post("/users", Register);
router.post("/login", login);
router.post("/token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
