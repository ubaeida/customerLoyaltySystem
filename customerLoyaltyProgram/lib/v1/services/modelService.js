const models = require("../models");

const getInstanceById = async (id, modelName) => {
  if (models[modelName]) {
    const _id = +id;
    if (typeof _id === "number" && _id > 0) {
      const instance = await models[modelName].findByPk(_id);
      if (instance) {
        return instance;
      } else {
        throw new Error(`${modelName}  not found`);
      }
    } else {
      throw new Error(`Please provide a valid id`);
    }
  } else {
    throw new Error("Model not found");
  }
};

module.exports = {
  getInstanceById,
};
