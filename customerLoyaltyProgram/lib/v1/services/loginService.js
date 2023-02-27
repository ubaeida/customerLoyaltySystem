const models = require("../models");
const { getToken } = require("../tokenManager/token");
const { adminLoginService } = require("./adminServices");
const { companyLoginService } = require("./companyServices");
const { userLoginService } = require("./userServices");

const generalLoginService = async (email, password) => {
  try {
    const user = await userLoginService(email, password);
    if (user) {
      const token = getToken({
        id: user.id,
        type: "user",
      });
      return { user, token };
    } else {
      const company = await companyLoginService(email, password);
      if (company) {
        const token = getToken({
          id: company.id,
          type: "company",
        });
        return { company, token };
      } else {
        let token;
        const admin = await adminLoginService(email, password);
        if (admin) {
          if (admin.email == "superadmin@gmail.com") {
            token = getToken({
              id: admin.id,
              type: "superadmin",
            });
          } else {
            token = getToken({
              id: admin.id,
              type: "admin",
            });
          }
          return { admin, token };
        } else
          throw new Error(
            "Account not found, Please make sure your email is correct or you can register first!"
          );
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  generalLoginService,
};
