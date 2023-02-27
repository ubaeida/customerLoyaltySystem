const jwt = require("jsonwebtoken");

const getAccessToken = (data) => {
  return jwt.sign(
    {
      ...data,
    },
    process.env.accessTokenKey,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

const verifyAccessToken = (token) => {
  let result = null;
  try {
    const payload = jwt.verify(token, process.env.accessTokenKey);
    if (payload) {
      result = payload;
    }
  } catch (e) {
    result = e
  }
  return result;
};

module.exports = {
  getAccessToken,
  verifyAccessToken
};
