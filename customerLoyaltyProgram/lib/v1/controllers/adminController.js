const { query } = require("express");
const {
  failedWithMessage,
  successWithMessage,
} = require("../responser/responses");
const {
  addAdmin,
  updateAdmin,
  getAdmin,
  deleteAdmin,
  getAllAdmins,
  AddBillService,
} = require("../services/adminServices");

const store = async (req, res, next) => {
  try {
    const newAdmin = await addAdmin({ ...req.body });
    if (!newAdmin) {
      return failedWithMessage("This email already exist!", res);
    }
    return successWithMessage("Admin created successfully", res, newAdmin);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const update = async (req, res, next) => {
  try {
    const admin = await updateAdmin(req.params.id, { ...req.body });
    return successWithMessage("Admin updated successfully", res, admin);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const show = async (req, res, next) => {
  try {
    const user = await getAdmin(req.params.id);
    if (user) return successWithMessage("Admin found", res, user);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const destroy = async (req, res, next) => {
  try {
    const admin = await deleteAdmin(req.params.id);
    if (admin) return successWithMessage("admin deleted successfully", res);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const index = async (req, res, next) => {
  try {
    const admin = await getAllAdmins(+req.query.page);
    return successWithMessage("Admins found", res, admin);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const addBill = async (req, res, next) => {
  try {
    const bill = await AddBillService(
      req.body.billNumber,
      req.body.billReference,
      req.body.companyName,
      req.body.phone
    );
    return successWithMessage('Bill added successfully and the points added to the member', res, bill)
  } catch (err) {
    failedWithMessage(err.message, res);
  }
};

module.exports = {
  store,
  update,
  show,
  destroy,
  index,
  addBill,
};
