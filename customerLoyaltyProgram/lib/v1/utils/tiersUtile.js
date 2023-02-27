const { getGiftMail } = require("./emailsUtile");
const { sendEmail } = require("./emailUtile");
const { webHook } = require("./webHook");

// This funcation chech the changed of the member tier and if the member reach the minimum exchange points.
const checkTiersAndExchangePoints = async (
  configurations,
  standardPoints,
  tiersPoints,
  user,
  oldStandardPoints,
  member
) => {
  let tierValue = 0;
  let tier;
  function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j + 1].dataValues.value > arr[j].dataValues.value) {
          [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        }
      }
    }
    return arr;
  }

  const sortedConfigurations = bubbleSort(configurations);
  sortedConfigurations.map(async (config) => {
    if (
      config.dataValues.key == "Minimum exchange points" &&
      config.dataValues.value <= standardPoints &&
      oldStandardPoints < config.dataValues.value
    ) {
      const email = getGiftMail(config.dataValues.Company.name, {
        title: user.title,
        name: user.name,
        surname: user.surname,
      });
      await webHook(
        member.membershipNumber,
        standardPoints,
        member.membershipTier,
        user.phone,
        config.dataValues.Company.name
      );
      sendEmail(user.email, email);
    }
    if (
      config.dataValues.value <= tiersPoints &&
      config.dataValues.key != "Minimum exchange points" &&
      config.dataValues.value >= tierValue
    ) {
      tierValue = config.dataValues.value;
      tier = config.dataValues.key;
    }
  });
  return tier;
};

module.exports = {
  checkTiersAndExchangePoints,
};
