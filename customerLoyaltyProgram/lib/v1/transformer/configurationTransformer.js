const configurationTransformer = (configuration) => {
  delete configuration?.dataValues?.deletedAt;
  return configuration;
};

const configurationsTransformer = (configurations) => {
  return configurations.map((configuration) =>  configurationTransformer(configuration));
};

module.exports = {
  configurationTransformer,
  configurationsTransformer,
};
