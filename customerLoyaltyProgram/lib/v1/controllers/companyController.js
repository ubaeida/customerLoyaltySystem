const {
  failedWithMessage,
  successWithMessage,
} = require("../responser/responses");
const {
  addCompany,
  getCompany,
  updateCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyMembersService,
  getCompanyMembersRelationsService,
  exchangePointsService,
  companyGiftServices,
} = require("../services/companyServices");
const { generalLoginService } = require("../services/loginService");
const { getAccessToken } = require("../tokenManager/accessToken");

const store = async (req, res, next) => {
  try {
    const company = await addCompany({ ...req.body, logo: req.file.filename });
    if (!company) {
      return failedWithMessage("This email already exist", res);
    }
    return successWithMessage("Company created successfully", res, company);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};



const show = async (req, res, next) => {
  try {
    const company = await getCompany(req.params.id);
    if (company) return successWithMessage("Company found", res, company);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const update = async (req, res, next) => {
  try {
    const company = await updateCompany(req.params.id, {
      ...req.body,
      logo: req.file?.filename,
    });
    return successWithMessage("Company updated successfully", res, company);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const destroy = async (req, res, next) => {
  try {
    const company = await deleteCompany(req.params.id);
    if (company) return successWithMessage("Company deleted successfully", res);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const index = async (req, res, next) => {
  try {
    const companies = await getAllCompanies(+req.query.page);
    if (companies) return successWithMessage("Companies found", res, companies);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const paymentLogin = async (req, res, next) => {
  try {
    const company = await generalLoginService(req.body.email, req.body.password);
    if (company) {
      const token = getAccessToken({
        id: company.id,
        name: company.name,
        type: "company",
      });
      return successWithMessage("Logged in successfully", res, {
        token: token,
      });
    }
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const getCompanyMembers = async (req, res, next) => {
  try {
    const companyMembers = await getCompanyMembersService(req.tokenHolder.id, +req.query.page);
      return successWithMessage("Your all members", res, companyMembers);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const getCompanyMembersRelations = async (req, res, next) => {
  try {
    const CompanyMembersRelations = await getCompanyMembersRelationsService(
      req.tokenHolder.id, +req.query.page
    );
    return successWithMessage("Your all members relations", res, CompanyMembersRelations);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const exchangePoints = async (req, res, next) => {
  try {
    const changePoints = await exchangePointsService(
      req.body.phone,
      req.tokenHolder.id
    );
    if (changePoints)
      return successWithMessage(
        "points exchanged successfully",
        res,
        changePoints
      );
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const companyGift = async (req, res, next) => {
  try {
    const gift = await companyGiftServices(req.body, req.tokenHolder.id)
    if(gift) return successWithMessage('Gift gaved to the member successfully', res, gift)
  } catch (err) {return failedWithMessage (err.message, res)}
};

module.exports = {
  store,
  show,
  update,
  destroy,
  index,
  paymentLogin,
  getCompanyMembers,
  getCompanyMembersRelations,
  exchangePoints,
  companyGift,
};
