const express = require("express");
const router = express.Router();
const { current, register, login } = require("../controllers/users");
const { auth } = require("../middleware/auth");
// req - доступ к Header, params
// res - доступ к ответу сервера
//api/user/login
router.post("/login", login);
//api/user/register
router.post("/register", register);
//api/user/current
router.get("/current", auth, current);

module.exports = router;
