const request = require("request");
var rp = require("request-promise");

var options = {
  method: "POST",
  uri: "http://localhost:3000/api/v1/companies/login",
  body: JSON.stringify({
    email: "loyalty@loyalty.com",
    password: "Ab123456!",
  }),
  headers: {
    "content-type": "application/json",
  },
};

const login = async () => {
  return rp(options)
    .then((body) => {
      return body;
    })
    .catch((err) => {
      throw new Error("Could not connect to the payment system");
    });
};
const BillHook = async (billNumber, billReference, companyName) => {
  const body = await login(options);
  return rp({
    method: "POST",
    uri: "http://localhost:3000/api/v1/bills/findbill",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${JSON.parse(body).token}`,
    },
    body: JSON.stringify({
      billNumber,
      billReference,
      companyName,
    }),
  })
    .then((res) => {
      return JSON.parse(res);
    })
    .catch((err) => {
      throw new Error("Could not connect to the payment system");
    });
};

module.exports = {
  BillHook,
};
