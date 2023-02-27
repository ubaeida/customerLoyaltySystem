const express = require("express");
const router = express.Router();
const isAuthenticated = require("../authenticator/isAuthenticated");
const isAuthorized = require("../authenticator/isAuthorized");
const {
  store,
  index,
  show,
  destroy,
  getUserRelation,
} = require("../controllers/memberrelationController");
const {
  phoneValdation,
  companyNameValidation,
} = require("../validator/validator");

router.post(
  "/",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { user: { matchId: false } }),
  phoneValdation,
  companyNameValidation,
  store
);

router.get(
  "/",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, {
      admin: { matchId: false },
      superadmin: { matchId: false },
    }),
  index
);

router.get(
  "/myrelation",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, {
      user: { matchId: false },
    }),
  getUserRelation
);

router.get(
  "/:id",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, {
      admin: { matchId: false },
      superadmin: { matchId: false },
      user: { matchId: false },
      company: { matchId: false },
    }),
  show
);

router.delete(
  "/:id",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, {
      user: { matchId: false },
    }),
  destroy
);

module.exports = router;
