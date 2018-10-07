const normalizeArray = array => {
  const obj = {};

  array.forEach(element => {
    obj[element.id] = element;
  });

  return obj;
};

const uniqueArray = array =>
  array.filter((value, index, self) => self.indexOf(value) === index);

const normalize = ({ iterationResponse, membershipsResponse }) => {
  const currentIteration = iterationResponse[0];

  const { stories, ...iteration } = currentIteration;

  const people = normalizeArray(membershipsResponse.map(item => item.person));

  const uniqueOwnerIds = uniqueArray(
    [].concat.apply([], currentIteration.stories.map(story => story.owner_ids))
  );

  return {
    iteration,
    stories,
    people,
    uniqueOwnerIds
  };
};

export default normalize;
