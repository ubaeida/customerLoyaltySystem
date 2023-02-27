const { pointsProcessor, calculatePoints } = require("../utils/pointsUtile");
const { getRelationByUserId } = require("./memberrelationServices");
const {getMembershipByUserId,getMembershipById,} = require("./membershipServices");
const { setPointsAndTiersToMember } = require("./pointsTiersServices");
const { getRules } = require("./ruleServices");
const { getUserByPhoneNumber } = require("./userServices");

// This funcation is the controller of the operations
const mainProcedure = async (bill, phone, type) => {
  try {
    const user = await getUserByPhoneNumber(phone);
    if (!user)
      throw new Error("This phone number does not have account in loyalty application");
    const membership = await getMembershipByUserId(user.id, bill.companyId);
    let oldStandardPoints = membership.dataValues.standardPoints
    let userInfo = membership.User.dataValues;
    if (!membership)
      throw new Error(
        "This phone number does not have a membership in your company, You can add it from add members"
      );
    const rules = await getRules(bill.companyId);
    const points = calculatePoints(rules, bill.amount);
    const relation = await getRelationByUserId(membership.id);      // add company Id 
    if (relation) {
      const relationPoints = Math.ceil(points / 2);
      const firstMember = await getMembershipById(
        relation.dataValues.firstMemberId
      );
      userInfo = firstMember.User.dataValues;
      if (firstMember) {
        oldStandardPoints = firstMember.dataValues.standardPoints
        const { standardPoints, tiersPoints } = pointsProcessor(
          type,
          firstMember.dataValues.standardPoints,
          firstMember.dataValues.tiersPoints,
          relationPoints
        );
        const updatedMember = await setPointsAndTiersToMember(
          firstMember,
          standardPoints,
          tiersPoints,
          bill.id,
          relationPoints,
          bill.companyId,
          userInfo,
          oldStandardPoints,
          type
        );
        if (!updatedMember)
          throw new Error(
            '"The member relation have a problem please let the member chech the member relation he/she has or contact the call service"'
          );
      } else
        throw new Error(
          "The member relation have a problem please let the member chech the member relation he/she has or contact the call service"
        );
      const secondMember = await getMembershipById(
        relation.dataValues.secondMemberId
      );
      userInfo = secondMember.User.dataValues;
      if (secondMember) {
        oldStandardPoints = secondMember.dataValues.standardPoints

        const { standardPoints, tiersPoints } = pointsProcessor(
          type,
          secondMember.dataValues.standardPoints,
          secondMember.dataValues.tiersPoints,
          relationPoints
        );
        const updatedMember = await setPointsAndTiersToMember(
          secondMember,
          standardPoints,
          tiersPoints,
          bill.id,
          relationPoints,
          bill.companyId,
          userInfo,
          oldStandardPoints,
          type
        );
        if (!updatedMember)
          throw new Error("The member relation have a problem please let the member chech the member relation he/she has or contact the call service");
      } else
        throw new Error("The member relation have a problem please let the member chech the member relation he/she has or contact the call service");
      return membership;
    } else {
      const { standardPoints, tiersPoints } = pointsProcessor(
        type,
        membership.dataValues.standardPoints,
        membership.dataValues.tiersPoints,
        points
      );
      const updatedMember = await setPointsAndTiersToMember(
        membership,
        standardPoints,
        tiersPoints,
        bill.id,
        points,
        bill.companyId,
        userInfo,
        oldStandardPoints,
        type
      );
      if (!updatedMember)
        throw new Error("The bill added successfull, however, the points did not added to the member please let him/her contact the call service");
      return membership;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  mainProcedure,
};
