const {
  companyTransformer,
  companiesTransformer,
  companiesImageTransformer,
} = require("../transformer/companyTransformer");
const { hashPassword, verifyPassword } = require("../utils/passwordUtile");
const models = require("../models");
const { getInstanceById } = require("./modelService");
const {
  membershipTransformer,
  membershipsTransformer,
} = require("../transformer/membershipTransformer");
const { userTransformer } = require("../transformer/userTransformer");
const { getUserByPhoneNumber } = require("./userServices");
const { getMembershipByUserId } = require("./membershipServices");
const { tierService } = require("./tierService");
const { addActivity } = require("./activityServices");

const addCompany = async (params) => {
  params.password = hashPassword(params.password);
  try {
    const [company, created] = await models.Company.findOrCreate({
      where: { email: params.email, phone: params.phone },
      defaults: {
        ...params,
      },
    });
    if (created) {
      const config = await models.Configuration.create({
        companyId: company.id,
        key: "Bronze",
        value: 0,
      });
      return companyTransformer(company);
    }
    return null;
  } catch (err) {
    throw new Error(err.message);
  }
};

const companyLoginService = async (email, password) => {
  try {
    var company = await models.Company.findOne({
      where: {
        email,
      },
    });
    if (company) {
      if (verifyPassword(password, company.password)) {
        return companyTransformer(company);
      } else {
        throw new Error("Invalid company password!");
      }
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const getCompany = async (id) => {
  try {
    const company = await getInstanceById(id, "Company");
    if (company) return companyTransformer(company);
    else throw new Error(company);
  } catch (err) {
    throw new Error(err);
  }
};

const updateCompany = async (id, params) => {
  if (params.password == "") {
    delete params.password;
  } else {
    params.password = hashPassword(params.password);
  }
  try {
    const company = await getInstanceById(id, "Company");
    if (company) {
      await company.update({
        ...params,
      });
      return companyTransformer(company);
    }
    throw new Error("company not found");
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteCompany = async (id) => {
  try {
    const company = await getInstanceById(id, "Company");
    if (company) {
      const removedCompany = await company.destroy();
      if (removedCompany) return removedCompany;
    }
  } catch (err) {
    throw new Error(err);
  }
};
const getAllCompanies = async (page) => {
  let limit = 8;
  try {
    if (!page) throw new Error("Page should be a number");
    const companies = await models.Company.findAndCountAll({
      limit: limit,
      offset: limit * (page - 1),
      order: [["createdAt", "DESC"]],
      paranoid: false,
    });
    if (companies.count > 0) {
      companies.pageCount = Math.ceil(companies.count / limit);
      companies.rows = companiesImageTransformer(companies.rows);
      return companies;
    }
    throw new Error("No companies Found");
  } catch (err) {
    throw new Error(err);
  }
};
const getCompanyMembersService = async (id, page) => {
  let limit = 5;
  try {
    if (!page) throw new Error("Page should be a number");
    const companyMembers = await models.Membership.findAndCountAll({
      where: { companyId: id },
      include: {
        model: models.User,
        attributes: [
          "name",
          "surname",
          "email",
          "phone",
          "gender",
          "title",
          "avatar",
        ],
      },
      limit,
      offset: limit * (page - 1),
      order: [["createdAt", "DESC"]],
    });
    if (companyMembers.count > 0) {
      companyMembers.rows.map((membership) => {
        membershipParser = userTransformer(membership.dataValues.User);
        delete membership.dataValues.User;
        membership.dataValues.User = membershipParser;
      });
      return {
        members: membershipsTransformer(companyMembers.rows),
        pageCount: Math.ceil(companyMembers.count / limit),
        count: companyMembers.count,
      };
    } else return [];
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
const getCompanyMembersRelationsService = async (companyId, page) => {
  let limit = 5;
  try {
    if (!page) throw new Error("Page should be a number");
    const companyMembersRelations = await models.MemberRelation.findAndCountAll(
      {
        where: { companyId: companyId },
        include: [
          { model: models.Membership, as: `firstMember`, include: models.User },
          {
            model: models.Membership,
            as: `secondMember`,
            include: models.User,
          },
          { model: models.Company },
        ],
        limit,
        offset: limit * (page - 1),
        order: [["createdAt", "DESC"]],
      }
    );
    if (companyMembersRelations.count > 0) {
      companyMembersRelations.rows.map((membership) => {
        firstMembershipParser = userTransformer(
          membership.dataValues.firstMember.User
        );
        secondMembershipParser = userTransformer(
          membership.dataValues.secondMember.User
        );
        delete membership.dataValues.firstMember.User;
        membership.dataValues.firstMember.User = firstMembershipParser;
        delete membership.dataValues.secondMember.User;
        membership.dataValues.secondMember.User = secondMembershipParser;
      });
      return {
        relations: membershipsTransformer(companyMembersRelations.rows),
        count: companyMembersRelations.count,
        pageCount: Math.ceil(companyMembersRelations.count / limit),
      };
    } else return [];
  } catch (err) {
    throw new Error(err);
  }
};

const exchangePointsService = async (phone, companyId) => {
  try {
    const user = await models.User.findOne({
      where: { phone },
    });
    if (!user)
      throw new Error(
        "The member did not found, Please check the phone number again "
      );
    const membership = await models.Membership.findOne({
      where: { userId: user.id, companyId },
    });
    if (!membership)
      throw new Error(
        "The member did not found, Please check the phone number again"
      );
    const config = await models.Configuration.findOne({
      where: {
        companyId,
        key: "Minimum exchange points",
      },
    });
    if (config.value < membership.standardPoints) {
      await membership.update({
        standardPoints: membership.standardPoints - config.value,
      });
      return membershipTransformer(membership);
    } else throw new Error("The member does not have enough points");
  } catch (err) {
    throw new Error(err.message);
  }
};
const companyGiftServices = async (params, companyId) => {
  try {
    params.points = parseInt(params.points);
    const user = await getUserByPhoneNumber(params.phone);
    if (!user)
      throw new Error("There is no user registerd with this phone number");
    const member = await getMembershipByUserId(user.id, companyId);
    if (!member)
      throw new Error("This phone number is not a member in your company");
    let oldStandardPoints = member.standardPoints;
    let updatedMember;
    if (params.tier == "Standard points") {
      updatedMember = await member.update({
        standardPoints: member.standardPoints + params.points,
      });
      if (!updatedMember)
        throw new Error("Something went wrong, Please try again later");
      updatedMember = await tierService(
        companyId,
        updatedMember,
        user,
        oldStandardPoints,
        (type = null)
      );
      const activity = await addActivity({
        memberId: updatedMember.id,
        type: `${params.tier} sent form company as gift`,
        standardPoints: params.points,
        tiersPoints: 0,
        billId: null,
      });
      if (!activity)
        throw new Error(
          "The operation did not save in the activity, but the points has been added successfully"
        );
    }
    if (params.tier == "Tiers points") {
      updatedMember = await member.update({
        tiersPoints: member.tiersPoints + params.points,
      });
      if (!updatedMember)
        throw new Error("Something went wrong, Please try again later");
      updatedMember = await tierService(
        companyId,
        updatedMember,
        user,
        oldStandardPoints,
        (type = `${params.tier} as company gift`)
      );
      const activity = await addActivity({
        memberId: updatedMember.id,
        type: `${params.tier} sent from company as gift`,
        standardPoints: 0,
        tiersPoints: params.points,
        billId: null,
      });
      if (!activity)
        throw new Error(
          "The operation did not save in the activity, but the points has been added successfully"
        );
    }
    updatedMember.user = userTransformer(updatedMember.User);
    delete updatedMember.User;
    if (updatedMember) return membershipTransformer(updatedMember);
    else throw new Error("Points did not added, Please try again later");
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = {
  addCompany,
  companyLoginService,
  getCompany,
  updateCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyMembersService,
  getCompanyMembersRelationsService,
  exchangePointsService,
  companyGiftServices,
};
