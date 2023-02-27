const {
  adminTransformer,
  adminsTransformer,
} = require("../transformer/adminTransformer");
const { hashPassword, verifyPassword } = require("../utils/passwordUtile");
const models = require("../models");
const { getInstanceById } = require("./modelService");
const { BillHook } = require("../utils/billHook");
const { addBill } = require("./billServices");

const addAdmin = async (params) => {
  params.password = hashPassword(params.password);
  try {
    const [admin, created] = await models.Admin.findOrCreate({
      where: { email: params.email },
      defaults: {
        ...params,
      },
    });
    if (created) {
      return adminTransformer(admin);
    }
    return null;
  } catch (err) {
    throw new Error(err.parent.sqlMessage);
  }
};

const adminLoginService = async (email, password) => {
  try {
    var admin = await models.Admin.findOne({
      where: {
        email,
      },
    });
    if (admin) {
      if (verifyPassword(password, admin.password)) {
        return adminTransformer(admin);
      } else {
        throw new Error("Invalid admin password!");
      }
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};
const updateAdmin = async (id, params) => {
  if (params?.password == "") {
    delete params.password;
  } else {
    params.password = hashPassword(params.password);
  }
  try {
    const admin = await getInstanceById(id, "Admin");
    if (admin) {
      await admin.update({
        ...params,
      });
      return adminTransformer(admin);
    }
    throw new Error("Admin not found");
  } catch (err) {
    console.log(err)
    throw new Error(err.message);
  }
};

const getAdmin = async (id) => {
  try {
    const admin = await getInstanceById(id, "Admin");
    if (admin) return adminTransformer(admin);
    else throw new Error(admin);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteAdmin = async (id) => {
  const admin = await getInstanceById(id, "Admin");

  try {
    if (admin) {
      const removedAdmin = await admin.destroy();
      if (removedAdmin) return removedAdmin;
    }
  } catch (err) {
    throw new Error(err);
  }
};
const getAllAdmins = async (page) => {
  let limit = 10;
  try {
    if (!page) throw new Error("Page should be a number");
    const admins = await models.Admin.findAndCountAll({
      limit,
      offset: limit * (page - 1),
      order: [["createdAt", "DESC"]],
    });
    if (admins.count > 0)
      return {
        admins: adminsTransformer(admins.rows),
        count: admins.count,
        pageCount: Math.ceil(admins.count / limit),
      };
    throw new Error("No admins Found");
  } catch (err) {
    throw new Error(err.message);
  }
};
const AddBillService = async (
  billNumber,
  billReference,
  companyName,
  phone
) => {
  try {
    var bill = await BillHook(billNumber, billReference, companyName, phone);
    if ((await bill?.data) != null) {
      const compnay = await models.Company.findOne({
        where: { name: companyName },
      });
      if (compnay) {
        const newBill = await addBill(compnay.dataValues.id, {
          companyId: compnay.dataValues.id,
          billNumber: bill.data.billNumber,
          billReference: bill.data.billReference,
          phoneNumber: phone,
          amount: bill.data.amount,
        });

        if (newBill) return newBill;
        else throw new Error(newBill.message);
      } else throw new Error("Company not found");
    } else throw new Error(bill?.messages);
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = {
  addAdmin,
  adminLoginService,
  updateAdmin,
  getAdmin,
  deleteAdmin,
  getAllAdmins,
  AddBillService,
};
