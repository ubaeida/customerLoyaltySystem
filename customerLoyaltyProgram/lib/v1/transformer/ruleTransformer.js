const ruleTransformer = (rule) => {
    delete rule?.dataValues?.deletedAt;
    return rule;
  };
  
  const rulesTransformer = (rules) => {
    return rules.map((rule) => ruleTransformer(rule));
  };
  
  module.exports = {
    ruleTransformer,
    rulesTransformer
  };
  