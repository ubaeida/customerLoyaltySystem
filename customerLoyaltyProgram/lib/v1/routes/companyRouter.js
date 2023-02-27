const express = require("express");
const router = express.Router();
const { storage, uploadFilter } = require("../utils/storageUtil");
const multer = require("multer");
const {
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  logoValdation,
  urlValidation,
  checkUpload,
  addressValdation,
  pointsValdation,
  tiersValidation,
  nullablepasswordValidation,
  nullablelogoValdation,
} = require("../validator/validator");
const {
  store,
  show,
  update,
  destroy,
  index,
  paymentLogin,
  getCompanyMembers,
  getCompanyMembersRelations,
  exchangePoints,
  companyGift,
} = require("../controllers/companyController");
const isAuthenticated = require("../authenticator/isAuthenticated");
const isAuthorized = require("../authenticator/isAuthorized");

const upload = multer({
  storage: storage,
  fileFilter: uploadFilter("image"),
  limits: { fileSize: 1_000_000 },
}).single("logo");

router.post(
  "/register",
  (req, res, next) => {
    upload(req, res, (err) => {
      checkUpload(err, next);
    });
  },
  logoValdation,
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  urlValidation,
  addressValdation,
  store
);

router.post(
  "/login/paymentlogin",
  emailValidation,
  passwordValidation,
  paymentLogin
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
  "/members",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  getCompanyMembers
);
router.get(
  "/relations",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  getCompanyMembersRelations
);
router.post(
  "/exchange",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  phoneValdation,
  exchangePoints
);
router.post(
  "/gift",
  isAuthenticated,
  (req, res, next) =>
    isAuthorized(req, res, next, { company: { matchId: false } }),
  phoneValdation,
  pointsValdation,
  tiersValidation,
  companyGift
);
router.get(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      admin: { matchId: false },
      superadmin: { matchId: false },
      company: { matchId: true },
    });
  },
  show
);

router.put(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      company: { matchId: true },
    });
  },
  (req, res, next) => {
    upload(req, res, (err) => {
      checkUpload(err, next);
    });
  },
  nullablelogoValdation,
  nameValidation,
  emailValidation,
  nullablepasswordValidation,
  phoneValdation,
  urlValidation,
  addressValdation,
  update
);

router.delete(
  "/:id",
  isAuthenticated,
  (req, res, next) => {
    isAuthorized(req, res, next, {
      company: { matchId: true },
    });
  },
  destroy
);

module.exports = router;
