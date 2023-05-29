const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { all, add } = require("../controllers/employees");
// req - доступ к Header, params
// res - доступ к ответу сервера

// api/employees
router.get("/", auth, all);
// api/employees:id
router.get("/:id", auth, () => {});
//api/employees/add
router.post("/add", auth, add);
//api/employees/remove/:id
router.post("/remove/:id", auth, () => {});
//api/employees/edit/:id
router.put("/edit/:id", auth, () => {});
//
//
module.exports = router;
