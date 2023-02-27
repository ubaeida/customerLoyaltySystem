const express = require("express");
const router = express.Router();

const isAuthenticated = require("../authenticator/isAuthenticated");
const isAuthorized = require("../authenticator/isAuthorized");
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/ruleController");
const {
  conditiontValdation,
  pointsValdation,
} = require("../validator/validator");

router.post(
  "/",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  conditiontValdation,
  pointsValdation,
  store
);
router.get(
  "/",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  index
);
router.get(
  "/:id",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  show
);
router.put(
  "/:id",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  conditiontValdation,
  pointsValdation,
  update
);

router.delete(
  "/:id",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  destroy
);
module.exports = router;
