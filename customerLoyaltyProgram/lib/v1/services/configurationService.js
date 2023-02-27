const {
  configurationTransformer,
  configurationsTransformer,
} = require("../transformer/configurationTransformer");
const { Op } = require("sequelize");
const models = require("../models");
const { getInstanceById } = require("./modelService");

const addConfiguration = async (id, key, value) => {
  try {
    if (key == "Bronze")
      throw new Error(
        "The Bronze membership tier will be given automatically when membership is started"
      );
    const [configuration, created] = await models.Configuration.findOrCreate({
      where: {[Op.and]: {[Op.or]: [{ key }, { value }] , companyId:id}},
      defaults: { companyId: id, key, value },
    });
    if (created) return configurationTransformer(configuration);
    else
      throw new Error(
        "You already have set points for this configuration or you chosed this points number before, Please enter another configuration"
      );
  } catch (err) {
    throw new Error(err.message);
  }
};
const getConfigurations = async (companyId) => {
  try {
    const configurations = await models.Configuration.findAll({
      where: { companyId },
      include : models.Company
    });
    if (configurations.length > 0)
      return configurationsTransformer(configurations);
    else throw new Error("You have no configurations yet...");
  } catch (err) {
    throw new Error(err.message);
  }

  
};
const getConfiguration = async (id, companyId) => {
  try {
    const configuration = await models.Configuration.findOne({
      where: { [Op.and]: [{ id: id }, { companyId: companyId }] },
    });
    if (configuration) return configurationTransformer(configuration);
    else throw new Error("Configuration not found");
  } catch (err) {
    throw new Error(err.message);
  }
};
const updateConfiguration = async (id, companyId, key, value) => {
  const tiers = ["Silver", "Gold", "Platinum"];
  try {

    const configuration = await getInstanceById(id, "Configuration");
    if (configuration.key == "Bronze")
    throw new Error(
      "The Bronze membership tier will be given automatically when membership is started and you can not change its points"
    );
    if (configuration) {
      if (configuration.dataValues.companyId == companyId) {
        const configurations = await getConfigurations(companyId);
        if (configurations.length > 0) {
          configurations.map((configuration) => {
            if (
              tiers.includes(configuration.key) &&
              configuration.value == value
            )
              throw new Error(
                "You have same points number for this configuration, Please enter another points number"
              );
          });
        }
        await configuration.update({ value });
        return configurationTransformer(configuration);
      } else throw new Error("You have no access to update this configuration");
    } else throw new Error("The configuration not found");
  } catch (err) {
    throw new Error(err.message);
  }
};
const deleteConfiguration = async (id, companyId) => {
  try {
    const configuration = await getInstanceById(id, "Configuration");
    if (configuration.key == "Bronze")
    throw new Error(
      "The Bronze membership tier will be given automatically when membership is started and it can not be deleted"
    );
    if (configuration) {
      if (configuration.dataValues.companyId == companyId) {
        await configuration.destroy({
          where: { [Op.and]: [{ id: id }, { companyId: companyId }] },
        });
        return configurationTransformer(configuration);
      } else throw new Error("You have no access to update this configuration");
    } else throw new Error("the configuration not found");
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addConfiguration,
  getConfigurations,
  getConfiguration,
  updateConfiguration,
  deleteConfiguration,
};
