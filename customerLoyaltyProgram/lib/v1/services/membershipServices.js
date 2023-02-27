const { v4 } = require("uuid");
const models = require("../models");
const { companyTransformer } = require("../transformer/companyTransformer");
const { userTransformer } = require("../transformer/userTransformer");

const {
  membershipsTransformer,
  membershipTransformer,
} = require("../transformer/membershipTransformer");
const { getInstanceById } = require("./modelService");

const addMember = async (phone, id) => {
  const membershipNumber = v4();
  try {
    const user = await models.User.findOne({ where: { phone } });
    const company = await getInstanceById(id, "Company");
    if (!user)
      throw new Error(
        "This phone owner does not have an account in the application"
      );
    if (!company)
      throw new Error(
        "This company does not have an account in the application Or you sholud login again"
      );
    const [membership, created] = await models.Membership.findOrCreate({
      where: {
        userId: user.id,
        companyId: company.id,
      },
      defaults: { membershipNumber: membershipNumber },
    });
    if (created) {
      const newMember = await models.Membership.findByPk(membership.id, { include: models.User})
      newMember.user = userTransformer( newMember.User)
      delete newMember.user
      return newMember;
    } else
      throw new Error(
        "This phone number already has a membership in your company"
      );
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMemberships = async (page) => {
  let limit = 5;
  try {
    if (!page) throw new Error("Page should be a number");
    const memberships = await models.Membership.findAndCountAll({
      include: [{ model: models.User, paranoid: false }, { model: models.Company, paranoid: false }],
      limit,
      offset: limit * (page - 1),
      order: [["createdAt", "DESC"]],
      paranoid: false
    });

    if (memberships.count > 0) {
      memberships.rows.map((membership) => {
        membership.user = userTransformer(membership.User);
        delete membership.User;
        membership.company = companyTransformer(membership.Company);
        delete membership.Company;
      });

      return {
        members: memberships.rows,
        pageCount: Math.ceil(memberships.count / limit),
        count: memberships.count,
       
      };
    } else throw new Error("No memberships found");
  } catch (err) {
    throw new Error(err.message);
  }
};
const getMembership = async (id, requesterId, requesterType) => {
  try {
    var membership;
    // if the user type admin or superAdmin
    if (requesterType == "superadmin" || requesterType == "admin") {
      membership = await models.Membership.findOne({
        where: { id },
        include: [
          {
            model: models.Company,
            attributes: [
              "name",
              "email",
              "phone",
              "address",
              "logo",
              "website",
            ],
          },
          {
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
        ],
      });
      if (membership) {
        membershipParser = companyTransformer(membership.dataValues.Company);
        delete membership.dataValues.Company;
        membership.dataValues.company = membershipParser;
        membershipParser = userTransformer(membership.dataValues.User);
        delete membership.dataValues.User;
        membership.dataValues.user = membershipParser;
        return membershipTransformer(membership);
      }
    }
    // if the user type User
    if (requesterType == "user") {
      membership = await models.Membership.findOne({
        where: { id, userId: requesterId },
        include: {
          model: models.Company,
          attributes: ["name", "email", "phone", "address", "logo", "website"],
        },
      });
      if (membership) {
        membershipParser = companyTransformer(membership.dataValues.Company);
        delete membership.dataValues.Company;
        membership.dataValues.company = membershipParser;
        return membershipTransformer(membership);
      }
    }
    // if the user type Company
    if (requesterType == "company") {
      membership = await models.Membership.findOne({
        where: { id, companyId: requesterId },
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
      });
      if (membership) {
        membershipParser = userTransformer(membership.dataValues.User);
        delete membership.dataValues.User;
        membership.dataValues.user = membershipParser;
        return membershipTransformer(membership);
      }
    }
    if (membership) {
      return membershipTransformer(membership);
    } else throw new Error("No membership found");
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteMembership = async (membershipId, userId) => {
  try {
    const membership = await models.Membership.findOne({
      where: { id: membershipId, userId },
    });
    if (membership) {
      membership.destroy();
      return membershipTransformer(membership);
    } else throw new Error("Membership not found");
  } catch (err) {
    throw new Error(err.message);
  }
};
const getMembershipByUserId = async (userId, companyId) => {
  try {
    const membership = await models.Membership.findOne({
      where: { userId, companyId },
      include: models.User,
    });
    if (membership) return membership;
    else return null;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMembershipPoints = async (member, standardPoints, tiersPoints) => {
  try {
    const membership = await member.update({
      standardPoints,
      tiersPoints,
    });
    if (membership) return membership;
    else return null;
  } catch (err) {
    throw new Error(err.message);
  }
};
const getMembershipById = async (id) => {
  try {
    const membership = await models.Membership.findByPk(id, {
      include: models.User,
    });
    if (membership) return membership;
    else throw new Error("Membership not found");
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = {
  addMember,
  getMemberships,
  getMembership,
  deleteMembership,
  getMembershipByUserId,
  updateMembershipPoints,
  getMembershipById,
};
