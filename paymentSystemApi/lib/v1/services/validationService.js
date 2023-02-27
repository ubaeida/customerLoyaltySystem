const { validationResult, body, check, query } = require("express-validator");

const errorResponse = (req, res, next) => {
  const httpResponse = {
    success: false,
    data: null,
    messages: [],
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors
      .array()
      .forEach((error) => httpResponse.messages.push(`${error.msg}`));
    res.status(422);
    return res.send(httpResponse);
  }
  return next();
};

const nameValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for the name")
    .escape()
    .notEmpty()
    .withMessage("Name can not be empty!")
    .bail(),
  errorResponse,
];

const emailValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is invalid")
    .notEmpty()
    .withMessage("Email is required")
    .bail(),
  errorResponse,
];

const passwordValidation = [
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .withMessage(
      "Password should be at least 6 charaters and contains capital, small ,numbers and spical charaters"
    )
    .notEmpty()
    .withMessage("Password can not be empty!"),
  errorResponse,
];

const phoneValdation = [
  body("phone")
    .isLength({ min: 6 })
    .optional({ nullable: true })
    .withMessage("Minimum 6 characters required for the phone!"),
  errorResponse,
];

const amountValdation = [
  body("amount")
    .trim()
    .notEmpty()
    .withMessage("Amount should not be null")
    .isInt()
    .withMessage("amount should be a number")
    .bail(),
  errorResponse,
];

const billNumberValdation = [
  query("billNumber")
    .trim()
    .notEmpty()
    .withMessage("bill Number should not be null")
    .bail()
    .isInt()
    .withMessage("bill number must be a number")
    .bail(),
  errorResponse,
];


const pointsValdation = [
  body("points")
    .trim()
    .notEmpty()
    .withMessage("Points should not be null")
    .bail()
    .isInt()
    .withMessage("Points should be a Integer")
    .bail(),
  errorResponse,
];

const memberShipNumberValidation = [
  body("membershipNumber")
  .trim()
  .notEmpty()
  .withMessage("membershipNumber should not be null")
  .bail(),
errorResponse,
]

const configurationsKeys = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
];
const membershipTierValidation = [
  body("currentMembershipTier")
    .notEmpty()
    .withMessage("Configuration can not be empty!")
    .bail()
    .custom((value) => {
      if (!configurationsKeys.includes(value)) {
        throw new Error(
          "Please enter a valid configuration type like: Bronze, Silver, Gold, Platinum"
        );
      }
      return true;
    }),
  errorResponse,
];

module.exports = {
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  amountValdation,
  billNumberValdation,
  pointsValdation,
  membershipTierValidation,
  memberShipNumberValidation
};
