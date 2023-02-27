const {
  successWithMessage,
  failedWithMessage,
} = require("../responser/responses");
const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserMembershipsService,
  getUserMemberRelatiosService,
  sharePointsService,
} = require("../services/userServices");

const store = async (req, res, next) => {
  try {
    const newUser = await addUser({ ...req.body, avatar: req.file.filename });
    if (!newUser) {
      return failedWithMessage(
        "You are already registerd! Please check your email or phone number",
        res
      );
    }
    return successWithMessage("User created successfully", res, newUser);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const show = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    if (user) return successWithMessage("User found", res, user);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, {
      ...req.body,
      avatar: req.file?.filename,
    });
    return successWithMessage("User updated successfully", res, user);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const destroy = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    if (user) return successWithMessage("User deleted successfully", res);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const index = async (req, res, next) => {
  try {
    const users = await getAllUsers(+req.query.page);
    return successWithMessage("Users found", res, users);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};

const getUserMemberships = async (req, res, next) => {
  try {
    const userMemberships = await getUserMembershipsService(req.tokenHolder.id);
    return successWithMessage("All your memberships", res, userMemberships);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const getUserMemberRelatios = async (req, res, next) => {
  try {
    const userMemberRelations = await getUserMemberRelatiosService(
      req.tokenHolder.id,
      +req.query.page
    );
    return successWithMessage("All your relations", res, userMemberRelations);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
const sharePoints = async (req, res, next) => {
  try {
    const user = await sharePointsService(req.body, req.tokenHolder.id);
    return successWithMessage("The points sent successfully", res, user);
  } catch (err) {
    return failedWithMessage(err.message, res);
  }
};
module.exports = {
  store,
  show,
  update,
  destroy,
  index,
  getUserMemberships,
  getUserMemberRelatios,
  sharePoints,
};
