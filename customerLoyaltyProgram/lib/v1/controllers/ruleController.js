const {
  failedWithMessage,
  successWithMessage,
} = require("../responser/responses");
const {
  addRule,
  getRules,
  getRule,
  updateRule,
  deleteRule,
} = require("../services/ruleServices");

const store = async (req, res, next) => {
  const condition = +req.body.condition;
  const points = +req.body.points;
  try {
    const rule = await addRule(req.tokenHolder.id, condition, points);
    if (rule)
      return successWithMessage("A new rule added successfully", res, rule);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const index = async (req, res, next) => {
  try {
    const rules = await getRules(req.tokenHolder.id);
      return successWithMessage("These are your rules", res, rules);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const show = async (req, res, next) => {
  try {
    const rule = await getRule(req.params.id, req.tokenHolder.id);
    if (rule) return successWithMessage("Rule found", res, rule);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const update = async (req, res, next) => {
  const condition = +req.body.condition;
  const points = +req.body.points;
  try {
    const rule = await updateRule(
      req.params.id,
      req.tokenHolder.id,
      condition,
      points
    );
    if (rule)
      return successWithMessage("The rule has been updated successfully",res,rule);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const destroy = async (req, res, next) => {
  try {
    const rule = await deleteRule(req.params.id, req.tokenHolder.id);
    if (rule)
      return successWithMessage("The rule deleted successfully", res, rule);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
