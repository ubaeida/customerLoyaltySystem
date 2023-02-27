const models = require("../models");
const request = require("request");

const store = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const amount = +req.body.amount;
  const accessToken = req.headers.accesstoken;
  if (amount <= 0) {
    res.status(407);
    httpResponse.success = false;
    httpResponse.messages.push("Amount should be more than 0");
    return res.send(httpResponse);
  }
  var d = new Date();
  var t = new Date().getTime();
  var randomnum = Math.floor(Math.random() * (1000 - 500000)) + 1000;
  randomnum = d.getFullYear() + d.getMonth() + 1 + d.getDate() + randomnum;
  billReference = `${randomnum + t} - ${-1 * (randomnum + d.getMonth() + 1)}`;
  // added the iniate at date of the token to the random number we are already created
  billNumber = randomnum + req.user.iat;
  const bill = await models.Bill.create({
    companyId: req.user.id,
    billNumber,
    billReference,
    amount,
  });
  if (bill) {
    request(
      {
        method: "POST",
        uri: "http://localhost:3002/api/v1/bills",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          billNumber,
          billReference,
          phoneNumber: req.body.phoneNumber,
          amount,
        }),
      },
      // call back function for the request
      async (error, response, body) => {
        if (error) {
          httpResponse.success = false;
          httpResponse.messages.push(
            "The loyalty system is not working now! Please let the customer call the loyalty application call service to gain his points"
          );
          return res.send(httpResponse);
        } else if (response.statusCode == 201) {
          const result = JSON.parse(response.body);
          httpResponse.messages.push(
            `A new bill has been added successfully in the payment system, and
${result.messages}
            `
          );
          res.status(201);
          return res.send(httpResponse);
        } else {
          const result = JSON.parse(response.body);
          httpResponse.success = false;
          httpResponse.messages.push(result.messages);
          return res.send(httpResponse);
        }
      }
    );
  } else {
    httpResponse.success = false;
    httpResponse.messages.push("The payment system is not working!");
    res.status(407);
    return res.send(httpResponse);
  }
};

const remove = async (req, res) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const billNumber = req.query.billNumber;
  const accessToken = req.headers.accesstoken;
  if (!billNumber) {
    httpResponse.success = false;
    httpResponse.messages.push("Please provid the bill number");
    return res.send(httpResponse);
  }
  const bill = await models.Bill.findOne({
    where: {
      billNumber,
      companyId: req.user.id,
    },
  });
  if (!bill) {
    httpResponse.success = false;
    httpResponse.messages.push("This bill is not exist");
    return res.send(httpResponse);
  } else {
    bill.destroy();
    request(
      {
        method: "DELETE",
        uri: "http://localhost:3002/api/v1/bills",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          billNumber,
        }),
      },
      // call back function for the request
      async (error, response, body) => {
        if (error) {
          httpResponse.success = false;
          httpResponse.messages.push(
            "Loyalty application does not working. The bill has been deleted form payment system. Please make your company call the loyalty application call services"
          );
          return res.send(httpResponse);
        } else if (response.statusCode == 200) {
          const result = JSON.parse(response.body);
          httpResponse.messages.push(
            `the bill has been deleted successfully in the payment system, and 
${result.messages}`
          );
          return res.send(httpResponse);
        } else {
          const result = JSON.parse(response.body);
          httpResponse.success = false;
          httpResponse.messages.push(
            "There is a server error in the loyalty application. The bill has been deleted form payment system. Please make your company call the loyalty application call services "
          );
          return res.send(httpResponse);
        }
      }
    );
  }
};

const findBill = async (req, res, next) => {
  const httpResponse = {
    success: false,
    data: null,
    messages: [],
  };
  const company = await models.Company.findOne({
    where: {
      name: req.body.companyName,
    },
  });
  if (company) {
    const bill = await models.Bill.findOne({
      where: {
        billNumber: req.body.billNumber,
        billReference: req.body.billReference,
        companyId: company.dataValues.id,
      },
    });
    if(bill) {
    httpResponse.success = true
    httpResponse.data = bill.dataValues
    httpResponse.messages= 'Bill founded'
    return res.send(httpResponse)
    }else { 
      httpResponse.messages = 'Bill not found'
      return res.send(httpResponse)
    }
  } else{
    httpResponse.messages = 'Company not found'
   return res.send(httpResponse)};
};
module.exports = {
  store,
  remove,
  findBill,
};
