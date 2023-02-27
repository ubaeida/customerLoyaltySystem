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
const webHook = async (
  membershipNumber,
  points,
  currentMembershipTier,
  phone, 
  companyName
) => {
  rp(options)
    .then((body) => {
      request(
        {
          method: "POST",
          uri: "http://localhost:3000/api/v1/membersinfo",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${JSON.parse(body).token}`,
          },
          body: JSON.stringify({
            membershipNumber,
            points,
            currentMembershipTier,
            phone,
            companyName
          }),
        },
        async (error, response, body) => {
          if (error) console.log(error);
          else console.log(body);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  webHook,
};
