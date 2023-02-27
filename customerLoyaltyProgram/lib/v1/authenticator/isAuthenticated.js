const { unauthenticated } = require("../responser/responses");
const { verifyAccessToken } = require("../tokenManager/accessToken");
const { verifyToken } = require("../tokenManager/token");

const isAuthenticated = (req, res, next) => {
  const auth = req?.headers?.authorization;

  if (!auth) {
    return unauthenticated(res);
  }
  const token = auth.split(" ");
  var tokenHolder = verifyToken(token[token.length - 1]);
  if (tokenHolder.message == "invalid signature") {
    tokenHolder = verifyAccessToken(token[token.length - 1]);
    if (tokenHolder) {
      req.tokenHolder = tokenHolder;
      return next();
    }
  } else {
    req.tokenHolder = tokenHolder;
    return next();
  }

  return unauthenticated(res);
};

module.exports = isAuthenticated;
