const models = require("../models");
const membership = require("../models/membership");

const getAllActivities = async (requesterId, requesterType, page = 1) => {
  let limit = 12;
  try {
    if (!page) throw new Error("Page should be a number");
    if (requesterType == "admin" || requesterType == "superadmin") {
      const activities = await models.Activity.findAndCountAll({
        include: [{ model: models.Membership, include: models.Company}],
        limit: limit,
        offset: limit * (page - 1),
        order: [["createdAt", "DESC"]],
      });
      if (activities.count > 0) {
        activities.pageCount = Math.ceil(activities.count / limit);
        return activities;
      } else throw new Error("No activies found");
    }
    if (requesterType == "user") {
      const activities = await models.Activity.findAndCountAll({
        include: [
          { model: models.Bill },
          {
            model: models.Membership,
            where: { userId: requesterId },
            attributes: ["id", "companyId", "membershipNumber"],
            include: models.Company,
          },
        ],
        limit: limit,
        offset: limit * (page - 1),
        order: [["createdAt", "DESC"]],
      });
      if (activities.count > 0) {
        activities.pageCount = Math.ceil(activities.count / limit);
        return activities;
      } else throw new Error("You have no activites");
    }
    if (requesterType == "company") {
      const activities = await models.Activity.findAndCountAll({
        include: [
          {
            model: models.Membership,
            where: { companyId: requesterId },
            attributes: ["id", "membershipNumber"],
          },
          { model: models.Bill, attributes: ["billNumber"] },
        ],
        limit: limit,
        offset: limit * (page - 1),
        order: [["createdAt", "DESC"]],
      });
      if (activities.count > 0) {
        activities.pageCount = Math.ceil(activities.count / limit);
        return activities;
      } else return [];
    } else throw new Error("You have no memberships");
  } catch (err) {
    throw new Error(err.message);
  }
};
const getActivity = async (id, requesterId, requesterType) => {
  try {
    const activity = await models.Activity.findByPk(id, {
      include: [models.Bill],
    });
    if (activity) {
      if (requesterType == "admin" || requesterType == "superadmin") {
        return activity;
      }
      if (requesterType == "user") {
        const membership = await models.Membership.findOne({
          where: { userId: requesterId },
        });
        if (membership && activity.memberId == membership.id) {
          return activity;
        }
        throw new Error("You have no access to this activity");
      }
      if (
        requesterType == "company" &&
        activity.Bill.companyId == requesterId
      ) {
        return activity;
      } else
        throw new Error("Your company does not have access to this activity");
    } else throw new Error("Activity not found");
  } catch (err) {
    throw new Error(err.message);
  }
};
const addActivity = async (params) => {
  try {
    const activity = await models.Activity.create({
      ...params,
    });
    if (activity) return activity;
    else return null;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getActivityByCompanyId = async (companyId, userId) => {
  let limit = 10;
  try {
    if (!companyId) throw new Error("Company id should be a number");
    const membership = await models.Membership.findOne({
      where: { companyId: companyId, userId: userId },
    });
    if (membership) {
      const activities = await models.Activity.findAndCountAll({
        where: {
          memberId: membership.id,
        },
        limit: limit,
        order: [["createdAt", "DESC"]],
      });
      if (activities.count > 0) {
        return activities;
      } else throw new Error("You have no activities");
    } else throw new Error("you have no membership in this company");
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllActivities,
  getActivity,
  addActivity,
  getActivityByCompanyId,
};
