const { getTierMail } = require("../utils/emailsUtile");
const { sendEmail } = require("../utils/emailUtile");
const { checkTiersAndExchangePoints } = require("../utils/tiersUtile");
const { webHook } = require("../utils/webHook");
const { addActivity } = require("./activityServices");
const { getConfigurations } = require("./configurationService");
const { updateMembershipPoints } = require("./membershipServices");

const setPointsAndTiersToMember = async (
  member,
  standardPoints,
  tiersPoints,
  billId,
  points,
  companyId,
  user,
  oldStandardPoints,
  type
) => {
  let updatedMember = await updateMembershipPoints(
    member,
    standardPoints,
    tiersPoints
  );

  if (!updatedMember)
    throw new Error(
      "The points did not added, please let the member contact the call service"
    );

  const activity = await addActivity({
    memberId: updatedMember.id,
    type,
    standardPoints: points,
    tiersPoints: points,
    billId: billId,
  });

  if (!activity)
    throw new Error(
      "The operation did not save in the activity, but the points has been added successfully"
    );

  const configurations = await getConfigurations(companyId);
  const companyName = configurations[0].dataValues.Company.name;
  const newTier = await checkTiersAndExchangePoints(
    configurations,
    updatedMember.standardPoints,
    updatedMember.tiersPoints,
    user,
    oldStandardPoints,
    updatedMember
  );

  const updateTier = async (newTier, oldTier, type, companyName ,member) => {
    if (newTier != null && newTier != oldTier) {
      const updatedMember = await member.update({
        membershipTier: newTier,
      });
      if (updatedMember && type == "Purchase points") {
        let email = getTierMail(
          companyName,
          { title: user.title, name: user.name, surname: user.surname },
          newTier
        );
        sendEmail(user.email, email);
        await webHook(
          updatedMember.membershipNumber,
          updatedMember.standardPoints,
          updatedMember.membershipTier,
          user.phone,
          companyName
        );
      }
    }
    return updatedMember;
  };
  let updatedMembership = await updateTier(
    newTier,
    updatedMember.membershipTier,
    type,
    companyName,
    updatedMember
  );
  return updatedMembership;
};
module.exports = {
  setPointsAndTiersToMember,
};
