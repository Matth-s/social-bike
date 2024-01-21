const transformGroupResponse = (group) => {
  const transformedGroup = group.toObject();
  delete transformedGroup.__v;
  transformedGroup.id = transformedGroup._id;
  delete transformedGroup._id;
  return transformedGroup;
};

module.exports = transformGroupResponse;
