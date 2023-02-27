const {
  failedWithMessage,
  createdWithMessage,
  successWithMessage,
} = require("../responser/responses");
const { addMember, getMemberships, getMembership, deleteMembership } = require("../services/membershipServices");

const store = async (req, res, next) => {
  try {
    const membership = await addMember(req.body.phone, req.tokenHolder.id);
    if (membership)
      return createdWithMessage(
        "A new membership created successfully!",
        res,
        membership
      );
    else
      return failedWithMessage(
        "This phone number has a membership in your compnay",
        res
      );
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const index = async (req, res, next) => {
  try {
    const memberships = await getMemberships(+req.query.page);
    if(memberships) successWithMessage('These all memberships', res, memberships)
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const show = async (req, res, next) => { 
  try {
    const membership = await getMembership(req.params.id, req.tokenHolder.id, req.tokenHolder.type);
    if(membership) successWithMessage('Membership found', res, membership)
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
} 

const destroy = async(req, res, next) => { 
  try {
    const membership = await deleteMembership(req.params.id, req.tokenHolder.id);
    if(membership) successWithMessage('Membership deleted successfully', res, membership)
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
}

module.exports = {
  store,
  index,
  show,
  destroy,
};
