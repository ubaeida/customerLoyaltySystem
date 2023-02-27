const express = require("express");
const isAuthenticated = require("../authenticator/isAuthenticated");
const isAuthorized = require("../authenticator/isAuthorized");
const {
  store,
  index,
  show,
  destroy,
} = require("../controllers/membershipController");
const { phoneValdation } = require("../validator/validator");
const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      company: { matchId: false },
    });
  },
  phoneValdation,
  store
);
router.get(
  "/",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      admin: { matchId: false },
      superadmin: { matchId: false },
    });
  },
  index
);

router.get(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      admin: { matchId: false },
      superadmin: { matchId: false },
      company: {matchId: false}, 
      user: {matchId: false}
    });
  },
  show
);

router.delete(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      user: { matchId: false },
    });
  },
  destroy
);
module.exports = router;
