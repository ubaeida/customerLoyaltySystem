const {
  failedWithMessage,
  successWithMessage,
} = require("../responser/responses");
const {
  addRelation,
  getAllRelations,
  getRelation,
  deleteRelation,
  getUserRelationService,
} = require("../services/memberrelationServices");

const store = async (req, res, next) => {
  try {
    const relation = await addRelation(
      req.tokenHolder.id,
      req.body.phone,
      req.body.companyName,
      req.body.type
    );
    if (relation)
      return successWithMessage(
        "Now you have a new member relation",
        res,
        relation
      );
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const index = async (req, res, next) => {
  try {
    const relations = await getAllRelations(
      req.tokenHolder.id,
      req.tokenHolder.type,
      +req.query.page
    );
    return successWithMessage(
      "All the members relations that have been found",
      res,
      relations
    );
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const show = async (req, res, next) => {
  try {
    const relation = await getRelation(
      req.params.id,
      req.tokenHolder.id,
      req.tokenHolder.type,
      req.query.companyId
    );
    if (relation)
      return successWithMessage(
        "A member relation have been found",
        res,
        relation
      );
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const destroy = async (req, res, next) => {
  try {
    const relation = await deleteRelation(req.params.id, req.tokenHolder.id);
    if (relation)
      return successWithMessage(
        "A member relation have been deleted",
        res,
        relation
      );
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const getUserRelation = async (req, res, next) => {
  try {
    const relation = await getUserRelationService(req.tokenHolder.id, req.query.companyId)
    if(relation) return successWithMessage('Member relation has found', res, relation)
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
module.exports = {
  store,
  show,
  index,
  destroy,
  getUserRelation
};
