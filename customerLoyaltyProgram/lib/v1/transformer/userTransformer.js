const userTransformer = (user) => {
  delete user.dataValues?.deletedAt;

  if (user?.dataValues?.password) {
    delete user.dataValues.password;
  }
  if (user?.avatar) {
    user.avatar = process.env.serverUrl + "/uploads/" + user.avatar;
  }

  return user;
};

const usersTransformer = (users) => {
  return users.map((user) => userTransformer(user));
};


const userImageTransformer = (user) => {

  if (user?.dataValues?.password) {
    delete user.dataValues.password;
  }
  if (user?.avatar) {
    user.avatar = process.env.serverUrl + "/uploads/" + user.avatar;
  }

  return user;
};

const usersImageTransformer = (users) => {
  return users.map((user) => userImageTransformer(user));
};
module.exports = {
  userTransformer,
  usersTransformer,
  usersImageTransformer,
  userImageTransformer
};
