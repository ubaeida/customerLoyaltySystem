const { Op } = require("sequelize");
const models = require("../models");
const {
  ruleTransformer,
  rulesTransformer,
} = require("../transformer/ruleTransformer");
const { getInstanceById } = require("./modelService");

const addRule = async (id, condition, points) => {
  try {
    const [rule, created] = await models.Rule.findOrCreate({
      where: {[Op.and]: [{[Op.or]: [{ condition }, { earnedPoints: points }]  , companyId:id}]},
      defaults: { companyId: id, condition: condition, earnedPoints: points },
    });
    if (created) return ruleTransformer(rule);
    else
      throw new Error(
        "You have other rule or points for this amount, Please enter another amount"
      );
  } catch (err) {
    throw new Error(err.message);
  }
};
const getRules = async (companyId) => {
  try {
    const rules = await models.Rule.findAll({ where: { companyId } });
    if (rules.length > 0) return rulesTransformer(rules);
    else return[];
  } catch (err) {
    throw new Error(err.message);
  }
};

const getRule = async (id, companyId) => {
  try {
    const rule = await models.Rule.findOne({
      where: { [Op.and]: [{ id: id }, { companyId: companyId }] },
    });
    if (rule) return ruleTransformer(rule);
    else throw new Error("Rule not found");
  } catch (err) {
    throw new Error(err.message);
  }
};
const updateRule = async (id, companyId, condition, points) => {
  try {
    const rule = await getInstanceById(id, "Rule");
    if (rule) {
      if (rule.dataValues.companyId == companyId) {
        const rules = await getRules(companyId);
        if (rules.length > 0) {
          rules.map((rule) => {
            if (rule.condition == condition || rule.points == points)
              throw new Error(
                "You have other rule or points for this amount, Please delete the rule and create a new one"
              );
          });
        }
        await rule.update({ condition, earnedPoints:points });
        return ruleTransformer(rule);
      } else throw new Error("You have no access to update this rule");
    } else throw new Error("the Rule not found");
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteRule = async (id, companyId) => {
  try {
    const rule = await getInstanceById(id, "Rule");
    if (rule) {
      if (rule.dataValues.companyId == companyId) {
        await rule.destroy();
        return ruleTransformer(rule);
      } else throw new Error("You have no access to delete this rule");
    } else throw new Error("The rule not found");
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = {
  addRule,
  getRules,
  getRule,
  updateRule,
  deleteRule,
};
