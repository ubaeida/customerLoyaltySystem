const {
  failedWithMessage,
  successWithMessage,
} = require("../responser/responses");
const { generalLoginService } = require("../services/loginService");

const generalLogin = async (req, res, next) => {
  try {
    const user = await generalLoginService(req.body.email, req.body.password);
    return successWithMessage("logged in successfully", res, user);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

module.exports = {
  generalLogin,
};
