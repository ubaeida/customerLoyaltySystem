var express = require("express");
const { store, login } = require("../controllers/companyController");
const {
  nameValidation,
  phoneValdation,
  emailValidation,
  passwordValidation,
} = require("../services/validationService");
var router = express.Router();

router.post(
  "/register",
  nameValidation,
  phoneValdation,
  emailValidation,
  passwordValidation,
  store
);
router.post(
  "/login",
  emailValidation,
  passwordValidation,
  login
);


module.exports = router;
