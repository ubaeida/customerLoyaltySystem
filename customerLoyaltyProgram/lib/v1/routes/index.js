var express = require("express");
var router = express.Router();

router.use("/bills", require("./billRouter"));
router.use("/users", require("./userRouter"));
router.use("/admins", require("./adminRouter"));
router.use("/companies", require("./companyRouter"));
router.use("/memberships", require("./membershipRouter"));
router.use("/rules", require("./ruleRouter"));
router.use("/configurations", require("./configurationRouter"));
router.use("/relations", require("./memberrelationRouter"));
router.use("/activities", require("./activityRouter"));
router.use("/login", require("./loginRouter"));

module.exports = router;
