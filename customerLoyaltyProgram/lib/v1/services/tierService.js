const { getTierMail } = require("../utils/emailsUtile");
const { sendEmail } = require("../utils/emailUtile");
const { checkTiersAndExchangePoints } = require("../utils/tiersUtile");
const { webHook } = require("../utils/webHook");
const { getConfigurations } = require("./configurationService");

const tierService = async (
  companyId,
  member,
  user,
  oldStandardPoints,
  type
) => {
  const configurations = await getConfigurations(companyId);
  const companyName = configurations[0].dataValues.Company.name;
  const newTier = await checkTiersAndExchangePoints(
    configurations,
    member.standardPoints,
    member.tiersPoints,
    user,
    oldStandardPoints,
    member
  );
  const updateTier = async (
    newTier,
    oldTier,
    type,
    companyName,
    user,
    member
  ) => {
    if (newTier != null && newTier != oldTier) {
      member = await member.update({
        membershipTier: newTier,
      });
      if (member && type) {
        let email = getTierMail(
          companyName,
          { title: user.title, name: user.name, surname: user.surname },
          newTier
        );
        await webHook(
          member.membershipNumber,
          member.standardPoints,
          member.membershipTier,
          user.phone,
          companyName
        );
        sendEmail(user.email, email);
      }
    }
    return member;
  };
  member = await updateTier(
    newTier,
    member.membershipTier,
    type,
    companyName,
    user,
    member
  );
  return member;
};

module.exports = {
  tierService,
};
