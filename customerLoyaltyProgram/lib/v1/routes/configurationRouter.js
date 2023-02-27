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
} = require("../controllers/configurationController");
const {
  configurationPointsValdation,
  configurationsKeysValidation,
} = require("../validator/validator");

router.post(
  "/",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  configurationPointsValdation,
  configurationsKeysValidation,
  store
);
router.get(
  "/",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, { company: { matchId: false } });
  },
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
    configurationPointsValdation,
    configurationsKeysValidation,  
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
