// This funcation calualte the pinst by comparing the bill amount and the company rules
const calculatePoints = (rules, amount) => {
  let points = 0;
  rules.map((rule) => {
    if (rule.dataValues.condition <= amount) {
      points = rule.dataValues.earnedPoints;
    }
  });
  return points;
};

// this function will add or remove pints from member depands on the type of the bill
const pointsProcessor = (type, standardPoints, tiersPoints, points) => {
  if (type == "Purchase points") {
    (standardPoints = standardPoints + points),
      (tiersPoints = tiersPoints + points);
    return { standardPoints, tiersPoints };
  }
  if (type == "Lost points") {
    (standardPoints = standardPoints - points),
      (tiersPoints = tiersPoints - points);
      if (standardPoints <= 0) standardPoints = 0
    return { standardPoints, tiersPoints };
  }
};

module.exports = { calculatePoints, pointsProcessor };
