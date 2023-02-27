const models = require("../models");
const { getInstanceById } = require("./modelService");
const { mainProcedure } = require("./procedureServices");


const addBill = async (id, params) => {
  params.companyId = id;
  try {
    const company = await getInstanceById(id, "Company");
    if (company) {
      const [bill, created] = await models.Bill.findOrCreate({
        where: { billReference: params.billReference },
        defaults: {
          ...params,
        },
      });
      if (created) {
        if (params.phoneNumber != "") {
          try {
            const result = await mainProcedure(
              bill.dataValues,
              params.phoneNumber,
              (type = "Purchase points")
            );
            if (result) {
              bill.message = 'The points added to the member successfully in the loyalty system'

            }
          } catch (err) {
            console.log(err)
            bill.message = err.message;
          }
        }
        return bill;
      } else {
        throw new Error("Bill already exist!");
      }
    } else return null;
  } catch (err) {
    console.log(err)
    throw new Error(
      err.message
    );
  }
};
const removeBill = async (billNumber) => {
  const findBill = await models.Bill.findOne({
    where: {
      billNumber: billNumber,
    },
  });
  try {
    if (findBill) {
      const bill = await findBill.destroy();
      if (bill) {
        const member = await models.Activity.findOne({
          where: { billId: bill.id },
          include: {model : models.Membership, include: models.User}
        });
        const phone = member.dataValues.Membership.User.phone
        try {
          const result = await mainProcedure(
            bill.dataValues,
            phone,
            (type = "Lost points")
          );
          if (result) {
            bill.message = 'The points removed from the member successfully in the loyalty system'
          }
          else throw new Error(`The bill added successfull, however, the points did not added to the member please let 
          him/her contact the call service`)
        } catch (err) {
          bill.message = err.message;
        }
        return bill;
      } else return null;
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  addBill,
  removeBill,
};