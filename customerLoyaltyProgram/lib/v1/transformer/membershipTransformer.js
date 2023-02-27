const membershipTransformer = (membership) => {
  delete membership?.dataValues?.deletedAt;
  return membership;
};

const membershipsTransformer = (memberships) => {
  return memberships.map((membership) => membershipTransformer(membership));
};

module.exports = {
  membershipTransformer,
  membershipsTransformer,
};
