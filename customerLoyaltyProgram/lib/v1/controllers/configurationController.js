const {
  failedWithMessage,
  successWithMessage,
} = require("../responser/responses");
const {
  addConfiguration,
  getConfigurations,
  getConfiguration,
  updateConfiguration,
  deleteConfiguration,
} = require("../services/configurationService");

const store = async (req, res, next) => {
  const key = req.body.key;
  const value = +req.body.value;
  try {
    const configuration = await addConfiguration(req.tokenHolder.id, key, value);
    if (configuration)
      return successWithMessage("A new rule added successfully", res, configuration);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }

};

const index = async (req, res, next) => {
  try {
    const configurations = await getConfigurations(req.tokenHolder.id);
      return successWithMessage("These are your configurations", res, configurations);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const show = async (req, res, next) => {
  try {
    const configuration = await getConfiguration(req.params.id, req.tokenHolder.id);
    if (configuration) return successWithMessage("Configuration found", res, configuration);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const update = async (req, res, next) => {
  const value = +req.body.value;
  try {
    const configuration = await updateConfiguration(
      req.params.id,
      req.tokenHolder.id,
      req.body.key,
      value
    );
    if (configuration)
      return successWithMessage("The configuration has been updated successfully",res,configuration);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const destroy = async (req, res, next) => {
  try {
    const configuration = await deleteConfiguration(req.params.id, req.tokenHolder.id);
    if (configuration)
      return successWithMessage("The configuration deleted successfully", res, configuration);
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
