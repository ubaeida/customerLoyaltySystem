var express = require("express");
const { store, index } = require("../controllers/membersInfoController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  phoneValdation,
  pointsValdation,
  membershipTierValidation,
  memberShipNumberValidation,
} = require("../services/validationService");
var router = express.Router();

router.post(
  "/",
  isAuthenticated,
  phoneValdation,
  pointsValdation,
  membershipTierValidation,
  memberShipNumberValidation, 
  store
);
router.get('/', isAuthenticated, index)

module.exports = router;
