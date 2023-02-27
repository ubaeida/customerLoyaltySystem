const jwt = require("jsonwebtoken");

const getToken = (data) => {
  return jwt.sign(
    {
      ...data,
    },
    process.env.secretkey,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

const verifyToken = (token) => {
  let result = null;
  try {
    const payload = jwt.verify(token, process.env.secretkey);
    if (payload) {
      result = payload;
    }
  } catch (e) {
    result = e
  }
  return result;
};

module.exports = {
  getToken,
  verifyToken,
};
