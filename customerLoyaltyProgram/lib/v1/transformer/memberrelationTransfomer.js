const memberRelationTransformer = (memberRelation) => {
    delete memberRelation?.dataValues?.deletedAt;
    return memberRelation;
  };
  
  const memberRelationsTransformer = (memberRelations) => {
    return memberRelations.map((memberRelation) => memberRelationTransformer(memberRelation));
  };
  
  module.exports = {
    memberRelationTransformer,
    memberRelationsTransformer
  };
  