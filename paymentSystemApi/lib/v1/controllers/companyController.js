const models = require("../models");
const { hashPassword, verifyPassword } = require("../services/passwordService");
const { getToken } = require("../services/tokenServices");
const { companyTransformer } = require("../transformer/companyTransformer");

const store = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const [company, created] = await models.Company.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      name: req.body.name,
      password: hashPassword(req.body.password),
      phone: req.body.phone,
    },
  });
  if (created) {
    res.status(201);
    httpResponse.messages.push("Company account created successfully");
  } else {
    res.status(200);
    httpResponse.success = false;
    httpResponse.messages.push("This email already has an account");
  }
  return res.send(httpResponse);
};
const login = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const { email = "", password = "" } = req.body;
  const company = await models.Company.findOne({ where: { email } });
  if (company) {
    if (verifyPassword(password, company.password)) {
      httpResponse.data = companyTransformer(company);
      httpResponse.messages.push("Logged in successfully");
      httpResponse.token = getToken({
        id: company.id,
        type : "company",
        name: company.name
      });
    } else {
      httpResponse.success = false;
      httpResponse.messages.push("Invalid password!");
      res.status(401);
    }
  } else {
    httpResponse.success = false;
    httpResponse.messages.push("Account not found you should register first!");
    res.status(401);
  }
  return res.send(httpResponse);
};

module.exports = {
  store,
  login,
};
