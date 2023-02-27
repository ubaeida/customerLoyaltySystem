const express = require("express");
const isAuthenticated = require("../authenticator/isAuthenticated");
const isAuthorized = require("../authenticator/isAuthorized");
const {
  store,
  update,
  show,
  destroy,
  index,
  addBill,
} = require("../controllers/adminController");
const {
  nameValidation,
  emailValidation,
  passwordValidation,
} = require("../validator/validator");

const router = express.Router();

router.post(
  "/register",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, {
      superadmin: { matchId: false },
    }),
  nameValidation,
  emailValidation,
  passwordValidation,
  store
);
router.get(
  "/",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      superadmin: { matchId: false },
    });
  },
  index
);

router.post(
  "/addbill",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      superadmin: { matchId: false },
    });
  },
  addBill
);
router.put(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, { admin: { matchId: true }, superadmin:{ matchId: true} });
  },
  nameValidation,
  emailValidation,
  update
);

router.get(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      admin: { matchId: true },
      superadmin: { matchId: false },
    });
  },
  show
);

router.delete(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      superadmin: { matchId: false },
    });
  },
  destroy
);

module.exports = router;
