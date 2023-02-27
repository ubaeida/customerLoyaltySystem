const express = require("express");
const { generalLogin } = require("../controllers/loginController");
const { emailValidation, passwordValidation } = require("../validator/validator");
const router = express.Router();

router.post("/",emailValidation, passwordValidation , generalLogin);
module.exports = router;
