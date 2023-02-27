const companyTransformer = (company) => {
  if (company?.dataValues?.password) {
    delete company.dataValues.password;
  }
};

module.exports = {
  companyTransformer,
};
