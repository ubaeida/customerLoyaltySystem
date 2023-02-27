const companyTransformer = (company) => {
    delete company.dataValues.deletedAt;
  
    if (company?.dataValues?.password) {
      delete company.dataValues.password;
    }
    if (company?.logo) {
      company.logo = process.env.serverUrl + "/uploads/" + company.logo;
    }
  
    return company;
  };
  
  const companiesTransformer = (companies) => {
    return companies.map((company) => companyTransformer(company));
  };
  const companyImageTransformer = (company) => {
  
    if (company?.dataValues?.password) {
      delete company.dataValues.password;
    }
    if (company?.logo) {
      company.logo = process.env.serverUrl + "/uploads/" + company.logo;
    }
  
    return company;
  };
  
  const companiesImageTransformer = (companies) => {
    return companies.map((company) => companyImageTransformer(company));
  };
  module.exports = {
    companyTransformer,
    companiesTransformer,
    companyImageTransformer,
    companiesImageTransformer
  };
  