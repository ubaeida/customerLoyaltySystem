const models = require("../models");
const {
  failedWithMessage,
  createdWithMessage,
  successWithMessage,
} = require("../responser/responses");
const { addBill, removeBill } = require("../services/billServices");

const store = async (req, res, next) => {
  try {
    const bill = await addBill(req.tokenHolder.id, req.body);
    if (bill) createdWithMessage(bill.message, res, bill);
    else
      failedWithMessage(
        "Your company does not logged in or registerd in the loyalty application, The customer's bill has been added successfully in your system. However! Please let the custmer call the loyaty application call service to gain his points",
        res
      );
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const destroy = async (req, res, next) => {
  try {
    const bill = await removeBill(req?.body?.billNumber);
    if (bill) successWithMessage(bill.message, res);
    else failedWithMessage("Bill not found", res);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
module.exports = {
  store,
  destroy,
};
