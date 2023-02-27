var express = require("express");
const isAuthenticated = require("../authenticator/isAuthenticated");
const isAuthorized = require("../authenticator/isAuthorized");
const { store, destroy } = require("../controllers/billController");
var router = express.Router();

router.post(
  "/",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      admin: { matchId: false },
      company: { matchId: false },
      superadmin: { matchId: false },
    });
  },
  store
);

router.delete(
  "/",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      admin: { matchId: false },
      company: { matchId: false },
      superadmin: { matchId: false },
    });
  },
  destroy
);
module.exports = router;
