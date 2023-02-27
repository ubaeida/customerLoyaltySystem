const { unauthorized } = require("../responser/responses");

const isAuthorized = (req, res, next, roles = {}) => {
  if (roles[req?.tokenHolder?.type]) {
    const shouldMatch = roles[req.tokenHolder.type]?.matchId;
    if (!shouldMatch ||(shouldMatch && req?.tokenHolder?.id == req?.params?.id)
    ) {
      return next();
    } else return unauthorized(res);
  }
  return unauthorized(res);
};
module.exports = isAuthorized;
