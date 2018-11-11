const arrayToggle = (array, item) => {
  const clone = [...array];
  const index = clone.indexOf(item);

  if (index === -1) {
    clone.push(item);
  } else {
    clone.splice(index, 1);
  }

  return clone;
};

export default arrayToggle;
