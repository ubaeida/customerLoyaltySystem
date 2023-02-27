const models = require("../models");

const store = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const memberInfo = await models.MembersInfo.create({
    membershipNumber: req.body.membershipNumber,
    currentStandardPoints: req.body.points,
    currentMembershipTier: req.body.currentMembershipTier,
    phone: req.body.phone,
    companyName: req.body.companyName
  });
  if (!memberInfo) {
    (httpResponse.success = false),
      httpResponse.messages.push(
        "Something went wrong with the payment system and the record did not save "
      );
  } else {
    httpResponse.data = memberInfo;
    httpResponse.messages.push("The changes saved successfully");
  }
  return httpResponse;
};

const index = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const company = await models.Company.findByPk(req.user.id)
  if (!company) {
    httpResponse.success = false
    httpResponse.messages.push('You are not authorized')
    return res.send(httpResponse)
  }
  const membersInfo= await models.MembersInfo.findAll( { 
    where:{ companyName: req.user.name }
  })
  if(!membersInfo) { 
    httpResponse.success = false
    httpResponse.messages.push('there is no members information yet')
    return res.send(httpResponse)
  }
  httpResponse.success = true
  httpResponse.data = membersInfo
  httpResponse.messages.push('These are all your members informations')
  return res.send(httpResponse)

};
module.exports = {
  store,
  index,
};
